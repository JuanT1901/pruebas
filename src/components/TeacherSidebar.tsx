'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { FaSignOutAlt, FaHome, FaBookOpen } from 'react-icons/fa'

export default function TeacherSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const cerrarSesion = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // Estilo reutilizable para los botones
  const btnStyle = { width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', color: '#f8fafc', textDecoration: 'none', borderRadius: '8px', transition: 'background 0.2s' }

  return (
    <aside style={{ 
      width: '260px', 
      backgroundColor: '#1e293b', // Un gris/azul más suave para los profes
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      position: 'fixed', 
      left: 0, 
      top: 0,
      boxShadow: '4px 0 15px rgba(0,0,0,0.1)',
      zIndex: 100
    }}>
      
      {/* CABECERA DEL MENÚ */}
      <div style={{ padding: '25px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#10b981' }}>Ludo Club</h2>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', marginTop: '5px' }}>Portal Docente</p>
      </div>

      {/* ZONA DE NAVEGACIÓN */}
      <nav style={{ flex: 1, padding: '20px 15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <Link 
          href="/plataformas/profesores/dashboard" 
          style={{ ...btnStyle, backgroundColor: pathname?.includes('/dashboard') ? 'rgba(16, 185, 129, 0.1)' : 'transparent', color: pathname?.includes('/dashboard') ? '#10b981' : '#f8fafc' }}
        >
          <FaHome /> Inicio / Mis Clases
        </Link>

        {/* Aquí luego agregaremos más opciones como: "Circulares", "Mi Perfil", etc. */}

      </nav>

      {/* BOTÓN DE SALIDA */}
      <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button 
          onClick={cerrarSesion}
          style={{ width: '100%', padding: '12px 15px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1rem', fontWeight: 'bold' }}
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </div>

    </aside>
  )
}