'use server'

import { createClient } from 'app/utils/supabase/server'

export async function cambiarContrasena(contrasenaActual: string, contrasenaNueva: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { exito: false, error: 'No autenticado' }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: contrasenaActual,
  })

  if (signInError) {
    return { exito: false, error: 'La contraseña actual es incorrecta' }
  }

  const { error } = await supabase.auth.updateUser({
    password: contrasenaNueva,
  })

  if (error) return { exito: false, error: error.message }
  return { exito: true }
}

export async function actualizarDatosRectora(datos: { full_name: string; doc_number: string; doc_type: string }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { exito: false, error: 'No autenticado' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') return { exito: false, error: 'No autorizado' }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: datos.full_name,
      doc_number: datos.doc_number,
      doc_type: datos.doc_type,
    })
    .eq('id', user.id)

  if (error) return { exito: false, error: error.message }
  return { exito: true }
}
