'use client'

import Link from 'next/link'
import { FaUserGraduate, FaChalkboardTeacher, FaBullhorn } from 'react-icons/fa'
import styles from 'app/styles/pages/Dashboard.module.scss'

export default function AdminDashboardInicio() {
  const cardStyle = { backgroundColor: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', textAlign: 'center' as const, textDecoration: 'none', color: '#334155', transition: 'transform 0.2s, box-shadow 0.2s' }

  return (
    <main className={styles.mainContent}>
      <header className={styles.header}>
        <h1>Bienvenida al Portal Administrativo 👋</h1>
        <p>Centro de control principal del Gimnasio Aluna.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        
        <Link href="/plataformas/admin/estudiantes" style={cardStyle} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ backgroundColor: '#eff6ff', padding: '20px', borderRadius: '50%', marginBottom: '15px', color: '#3b82f6' }}>
            <FaUserGraduate size={40} />
          </div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Estudiantes</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Gestiona matrículas, datos familiares y cursos.</p>
        </Link>

        <Link href="/plataformas/admin/profesores" style={cardStyle} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '50%', marginBottom: '15px', color: '#10b981' }}>
            <FaChalkboardTeacher size={40} />
          </div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Docentes</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Administra el equipo y la carga académica.</p>
        </Link>

        <Link href="/plataformas/admin/circulares" style={cardStyle} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ backgroundColor: '#fefce8', padding: '20px', borderRadius: '50%', marginBottom: '15px', color: '#eab308' }}>
            <FaBullhorn size={40} />
          </div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Circulares</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Comunícate con la comunidad educativa.</p>
        </Link>

      </div>
    </main>
  )
}