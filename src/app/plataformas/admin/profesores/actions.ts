'use server'

import { createClient } from '@supabase/supabase-js'

export async function toggleEstadoProfesor(userId: string, nuevoEstado: boolean) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  try {
    // 1. Bloquear o Desbloquear en la bóveda de Autenticación
    // Si nuevoEstado es false (inactivo), lo baneamos por 100 años (876000h)
    // Si es true (activo), le quitamos el baneo ('none')
    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      { ban_duration: nuevoEstado ? 'none' : '876000h' }
    );

    if (authError) throw new Error(`Error en Auth: ${authError.message}`);

    // 2. Actualizar la etiqueta visual en la tabla Profiles
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ is_active: nuevoEstado })
      .eq('id', userId);

    if (profileError) throw new Error(`Error en Perfil: ${profileError.message}`);

    return { exito: true };
  } catch (error: any) {
    return { exito: false, error: error.message };
  }
}