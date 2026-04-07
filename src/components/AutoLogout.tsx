'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

export default function AutoLogout() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const TIEMPO_LIMITE = 600000; 

  const cerrarSesion = useCallback(async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }, [router, supabase])

  useEffect(() => {
    let temporizador: NodeJS.Timeout;

    const reiniciarTemporizador = () => {
      clearTimeout(temporizador)
      temporizador = setTimeout(cerrarSesion, TIEMPO_LIMITE)
    }

    const eventos = ['mousemove', 'keydown', 'click', 'scroll']
    
    eventos.forEach(evento => window.addEventListener(evento, reiniciarTemporizador))

    reiniciarTemporizador()

    return () => {
      clearTimeout(temporizador)
      eventos.forEach(evento => window.removeEventListener(evento, reiniciarTemporizador))
    }
  }, [cerrarSesion, TIEMPO_LIMITE])

  useEffect(() => {
    const limpiarSesionAlCerrar = () => {
      localStorage.removeItem('supabase-auth-token')
      sessionStorage.clear()
    }

    window.addEventListener('beforeunload', limpiarSesionAlCerrar)

    return () => {
      window.removeEventListener('beforeunload', limpiarSesionAlCerrar)
    }
  }, [])

  return null 
}