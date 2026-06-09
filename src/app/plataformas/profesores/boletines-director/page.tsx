/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { FaFilePdf, FaSpinner, FaGraduationCap, FaArrowLeft, FaUsers } from 'react-icons/fa'
import stylesDashboard from 'app/styles/pages/Dashboard.module.scss'

const CURSOS_PRIMARIA = ['Emprendedores', 'Ingeniosos', 'Transformadores'];
const CURSOS_PREESCOLAR = ['Aventureros', 'Creativos', 'Expertos'];
const CURSOS_BACHILLERATO = ['Innovadores', 'Conquistadores', 'Gnomos', 'Duendes', 'Elfos'];

export default function BoletinesDirectorPage() {
  const [vistaActual, setVistaActual] = useState<'cursos' | 'estudiantes'>('cursos')
  const [cursoActivo, setCursoActivo] = useState<string | null>(null)

  const [cursosDirector, setCursosDirector] = useState<any[]>([])
  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [periodo, setPeriodo] = useState('1')

  const [cargando, setCargando] = useState(true)

  const [supabase] = useState(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ))

  useEffect(() => {
    const cargarCursos = async () => {
      setCargando(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: cursos } = await supabase
        .from('grades')
        .select('id, name')
        .eq('director_id', user.id)
        .order('name')

      if (cursos) setCursosDirector(cursos)
      setCargando(false)
    }
    cargarCursos()
  }, [supabase])

  useEffect(() => {
    if (vistaActual !== 'estudiantes' || !cursoActivo) return

    const cargarEstudiantes = async () => {
      setCargando(true)
      const { data: estData } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('role', 'student')
        .eq('course_name', cursoActivo)
        .order('full_name')

      if (estData) setEstudiantes(estData)
      setCargando(false)
    }
    cargarEstudiantes()
  }, [vistaActual, cursoActivo, periodo, supabase])

  const obtenerRutaBoletin = (curso: string) => {
    if (CURSOS_PRIMARIA.includes(curso)) return '/impresion/primaria';
    if (CURSOS_PREESCOLAR.includes(curso)) return '/impresion/preescolar';
    if (CURSOS_BACHILLERATO.includes(curso)) return '/impresion/bachillerato';
    return '/404';
  }

  if (cargando) return <div style={{ textAlign: 'center', marginTop: '100px' }}><FaSpinner className="fa-spin" size={40} color="#3b82f6" /></div>

  if (cursosDirector.length === 0) {
    return (
      <main style={{ padding: 'clamp(16px, 4vw, 40px)', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#ef4444' }}>Acceso Denegado</h1>
        <p style={{ color: '#64748b' }}>No eres director de grupo de ningún curso.</p>
      </main>
    )
  }

  return (
    <main style={{ padding: 'clamp(16px, 4vw, 40px)', maxWidth: '1000px', margin: '0 auto' }}>

      {vistaActual === 'cursos' && (
        <>
          <header style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
              <Link href="/plataformas/profesores/dashboard" style={{ color: '#64748b', fontSize: '1.2rem' }}>
                <FaArrowLeft />
              </Link>
              <h1 style={{ margin: 0, color: '#1e293b' }}>Boletines - Director de Curso</h1>
            </div>
            <p style={{ color: '#64748b', marginLeft: '35px' }}>Selecciona un curso para ver los boletines de tus estudiantes.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {cursosDirector.map(curso => (
              <button
                key={curso.id}
                onClick={() => { setCursoActivo(curso.name); setVistaActual('estudiantes'); }}
                style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', textAlign: 'left', transition: 'transform 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ backgroundColor: '#eff6ff', padding: '15px', borderRadius: '10px', color: '#3b82f6' }}>
                  <FaUsers size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0, color: '#334155', fontSize: '1.2rem' }}>{curso.name}</h3>
                  <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Ver boletines</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {vistaActual === 'estudiantes' && cursoActivo && (
        <>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button
                onClick={() => setVistaActual('cursos')}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                <FaArrowLeft />
              </button>
              <h1 style={{ margin: 0, color: '#1e293b' }}>Boletines: {cursoActivo}</h1>
            </div>

            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              style={{ padding: '10px 15px', borderRadius: '8px', border: '2px solid #3b82f6', fontWeight: 'bold', outline: 'none' }}
            >
              <option value="1">1° Periodo</option>
              <option value="2">2° Periodo</option>
              <option value="3">3° Periodo</option>
            </select>
          </header>

          <div className={stylesDashboard.responsiveTableContainer}>
            <table className={stylesDashboard.responsiveTable} style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '15px 20px' }}>Estudiante</th>
                  <th style={{ padding: '15px 20px', textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((est, index) => (
                  <tr key={est.id} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td data-label="Estudiante" style={{ padding: '15px 20px', fontWeight: 'bold', color: '#334155' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaGraduationCap color="#94a3b8" /> {est.full_name}
                      </div>
                    </td>
                    <td data-label="Acciones" style={{ padding: '15px 20px', textAlign: 'center' }}>
                      <button
                        onClick={() => window.open(`${obtenerRutaBoletin(cursoActivo)}?estudiante=${est.id}&periodo=${periodo}`, '_blank')}
                        style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <FaFilePdf /> Ver Boletín
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  )
}
