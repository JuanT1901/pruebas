'use server'

import { createClient } from '@supabase/supabase-js'

export async function importarProfesoresMasivo(profesores: any[]) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  let procesados = 0; 
  let asignaciones = 0; 
  let errores = [];

  // 🛡️ FUNCIÓN SANITIZADORA
  const limpiarDato = (valor: any) => {
    if (valor === undefined || valor === null || String(valor).trim() === '') {
      return null;
    }
    return String(valor).trim();
  };

  for (const filaOriginal of profesores) {
    try {
      // 🌟 NORMALIZADOR DE ENCABEZADOS (La magia antibugs)
      // Convierte "Correo electrónico " en "correo electronico"
      const fila: any = {};
      for (const key in filaOriginal) {
        const llaveLimpia = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
        fila[llaveLimpia] = filaOriginal[key];
      }

      let userId = null;
      
      // Ahora buscamos en la 'fila' limpia sin tildes ni mayúsculas
      const docString = limpiarDato(fila['documento']);
      const nombre = limpiarDato(fila['nombre completo']) || limpiarDato(fila['nombre']);
      
      if (!docString || !nombre) {
        throw new Error("El documento y el nombre son absolutamente obligatorios.");
      }

      const usuarioAuth = limpiarDato(fila['usuario'])?.toLowerCase() || '';
      
      // 1. Armamos los datos de RRHH buscando las llaves seguras
      const datosRRHH = {
        email: limpiarDato(fila['correo electronico']) || limpiarDato(fila['correo']),
        birth_date: limpiarDato(fila['fecha de nacimiento']) || limpiarDato(fila['fecha nacimiento']), 
        address: limpiarDato(fila['direccion']),
        phone_number: limpiarDato(fila['numero de celular']) || limpiarDato(fila['celular']),
        compensation_fund: limpiarDato(fila['caja de compensacion']) || limpiarDato(fila['caja compensacion']),
        eps: limpiarDato(fila['eps']),
        arl: limpiarDato(fila['arl']),
        pension_fund: limpiarDato(fila['fondo de pensiones']) || limpiarDato(fila['fondo pensiones']),
        full_name: nombre,
        doc_number: docString,
        doc_type: 'CC',
        role: 'teacher'
      };

      // 2. Buscamos si el profesor YA existe
      const { data: perfilExistente } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('doc_number', docString)
        .maybeSingle();

      if (perfilExistente) {
        userId = perfilExistente.id;
        
        // Si ya existe, actualizamos sus datos (Así se llenarán los de la profe que ya creaste)
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update(datosRRHH)
          .eq('id', userId);

        if (updateError) throw new Error(`Error actualizando perfil: ${updateError.message}`);
      } else {
        // 3. Si no existe, creamos su cuenta
        let emailAuth = usuarioAuth;
        if (!emailAuth.includes('@')) emailAuth = `${emailAuth}@aluna.edu.co`;
        
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: emailAuth,
          password: docString,
          email_confirm: true 
        });

        if (authError) throw new Error(`Credenciales: ${authError.message}`);
        userId = authData.user.id;

        // 4. Actualizamos el Perfil recién creado por el Trigger con la info de RRHH
        const { error: profileError } = await supabaseAdmin.from('profiles').upsert({
          id: userId,
          ...datosRRHH
        });

        if (profileError) {
          await supabaseAdmin.auth.admin.deleteUser(userId);
          throw new Error(`Perfil BD: ${profileError.message}`);
        }
        procesados++; 
      }

      // 5. Conectando Curso y Materia Oficial
      const curso = limpiarDato(fila['curso']);
      const materia = limpiarDato(fila['materia']);

      if (curso && materia) {
        const { data: cursoEncontrado } = await supabaseAdmin
          .from('grades') 
          .select('id')
          .ilike('name', curso)
          .maybeSingle();

        if (!cursoEncontrado) throw new Error(`El curso "${curso}" no existe.`);
        const gradeIdOficial = cursoEncontrado.id;

        const { data: materiaEncontrada } = await supabaseAdmin
          .from('subjects')
          .select('id')
          .eq('grade_id', gradeIdOficial)
          .ilike('name', materia)
          .maybeSingle();

        if (!materiaEncontrada) throw new Error(`La materia "${materia}" no existe en la malla de "${curso}".`);
        const subjectIdOficial = materiaEncontrada.id;

        const { data: asigExistente } = await supabaseAdmin
          .from('teacher_assignments')
          .select('id')
          .eq('teacher_id', userId)
          .eq('subject_id', subjectIdOficial)
          .maybeSingle();

        if (!asigExistente) {
          const { error: insertError } = await supabaseAdmin.from('teacher_assignments').insert({
            teacher_id: userId,
            grade_id: gradeIdOficial,
            subject_id: subjectIdOficial,
            course_name: curso, 
            subject_name: materia 
          });

          if (insertError) throw new Error(`Fallo en asignación: ${insertError.message}`);
          asignaciones++; 
        }
      }

    } catch (error: any) {
      console.log(`🚨 ERROR CON ${filaOriginal['Nombre Completo'] || 'Desconocido'}: ${error.message}`);
      errores.push(`Error con ${filaOriginal['Nombre Completo'] || 'Desconocido'}: ${error.message}`);
    }
  }

  return { exito: true, procesados, asignaciones, errores };
}