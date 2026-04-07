/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState, Fragment } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { FaSpinner, FaPrint, FaSeedling, FaChartLine, FaTrophy } from 'react-icons/fa'

const printStyles = `
  @media print {
    @page { size: A4; margin: 15mm; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: white !important; }
    .no-print { display: none !important; }
    .salto-pagina { page-break-inside: avoid; }
  }
  .a4-container {
    max-width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    background: white;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #1e293b;
  }
  table { width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 0; }
  th, td { border: 1px solid #1e293b; padding: 8px; text-align: left; vertical-align: top; }
  th { 
    font-weight: bold; 
    text-align: center; 
    text-transform: uppercase;
    border-bottom: 2px solid #1e293b; 
  }
`

function ContenidoBoletinPreescolarPDF() {
  const searchParams = useSearchParams()
  const estudianteId = searchParams.get('estudiante')
  const periodo = searchParams.get('periodo')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [cargando, setCargando] = useState(true)
  const [estudiante, setEstudiante] = useState<any>(null)
  const [evaluaciones, setEvaluaciones] = useState<any[]>([])
  const [director, setDirector] = useState<any>(null)

  // 🛡️ EL ÚNICO USE EFFECT DE ESTE ARCHIVO (CON BARRERA DE SEGURIDAD)
  useEffect(() => {
    if (!estudianteId || !periodo) return

    const cargarBoletin = async () => {
      // 1. Barrera de Seguridad Básica (Estar logueado)
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        alert("🔒 Acceso Denegado: No tienes autorización para ver este documento.")
        window.location.href = '/' 
        return
      }

      const { data: perfilUsuario } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (perfilUsuario?.role === 'teacher' || perfilUsuario?.role === 'student') {
        alert("🔒 Acceso Denegado: Los profesores solo pueden acceder a sus propias planillas, no a los boletines consolidados.")
        window.location.href = '/plataformas/profesores/dashboard' 
        return
      }

      // 2. Cargar datos si pasó la seguridad
      const { data: estData } = await supabase.from('profiles').select('*').eq('id', estudianteId).single()
      setEstudiante(estData)

      if (estData) {
        const { data: evalData } = await supabase
          .from('preschool_evaluations')
          .select('*')
          .eq('student_id', estudianteId)
          .eq('period', parseInt(periodo))
        
        if (evalData) setEvaluaciones(evalData)

        const { data: cursoData } = await supabase.from('grades').select('director_id').eq('name', estData.course_name).single()
        if (cursoData?.director_id) {
          const { data: dirData } = await supabase.from('profiles').select('full_name').eq('id', cursoData.director_id).single()
          setDirector(dirData)
        }
      }
      setCargando(false)
    }

    cargarBoletin()
  }, [estudianteId, periodo, supabase])

  const obtenerIconoEscala = (textoEscala: string) => {
    if (textoEscala.includes('iniciado')) return <FaSeedling size={24} color="#b45309" />
    if (textoEscala.includes('proceso')) return <FaChartLine size={24} color="#1d4ed8" />
    if (textoEscala.includes('alcanzado')) return <FaTrophy size={24} color="#15803d" />
    return null
  }

  if (cargando) return <div style={{ textAlign: 'center', marginTop: '100px' }}><FaSpinner className="fa-spin" size={40} color="#3b82f6" /></div>

  return (
    <div style={{ backgroundColor: '#f1f5f9', minHeight: '100vh', padding: '20px 0' }}>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div className="no-print" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={() => window.print()} style={{ backgroundColor: '#3b82f6', color: 'white', padding: '12px 25px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          <FaPrint /> Generar PDF / Imprimir
        </button>
      </div>

      <div className="a4-container">
        {/* ENCABEZADO */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div style={{ width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/logo-ludo.png" 
              alt="Logo Ludo Club" 
              style={{ maxWidth: '100%', maxHeight: '85px', objectFit: 'contain' }} 
            />
          </div>
          
          <div style={{ flex: 1, textAlign: 'center', padding: '0 15px' }}>
            <div style={{ border: '2px solid #1e293b', padding: '10px 30px', display: 'inline-block' }}>
              <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Ludo Club</h1>
              <p style={{ margin: '3px 0 0 0', fontSize: '0.85rem' }}>Resolución 580 del 26 de junio de 2018</p>
            </div>
            <div style={{ marginTop: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '900', textTransform: 'uppercase', color: '#1e293b' }}>Informe individual de desempeño</h2>
              <p style={{ margin: '2px 0 0 0', fontWeight: 'bold', fontSize: '1rem' }}>Periodo {periodo} - Año 2026</p>
            </div>
          </div>

          <div style={{ width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/logo.jpeg" 
              alt="Logo Aluna" 
              style={{ maxWidth: '100%', maxHeight: '85px', objectFit: 'contain' }} 
            />
          </div>
        </header>

        {/* INFO ESTUDIANTE */}
        <div style={{ 
          display: 'flex', 
          border: '1px solid #cbd5e1', 
          borderRadius: '10px',        
          marginBottom: '20px',
          overflow: 'hidden'           
        }}>
          <div style={{ flex: 1, padding: '12px', borderRight: '1px solid #cbd5e1' }}>
            <span style={{ color: '#64748b' }}>ESTUDIANTE:</span> 
            <strong style={{ textTransform: 'uppercase', marginLeft: '8px', color: '#1e293b' }}>
              {estudiante?.full_name}
            </strong>
          </div>
          <div style={{ width: '250px', padding: '12px' }}>
            <span style={{ color: '#64748b' }}>NIVEL:</span> 
            <strong style={{ textTransform: 'uppercase', marginLeft: '8px', color: '#1e293b' }}>
              {estudiante?.course_name}
            </strong>
          </div>
        </div>

        {/* TABLA DE CALIFICACIONES */}
        <table>
          <thead>
            <tr>
              <th style={{ width: '18%' }}>Dimensión</th>
              <th style={{ width: '32%' }}>Competencia</th>
              <th style={{ width: '30%' }}>Desempeño</th>
              <th style={{ width: '20%' }}>Escala Valorativa</th>
            </tr>
          </thead>
          <tbody>
            {evaluaciones.map((evalMateria, idxM) => {
              const comps = evalMateria.competencies_data || []
              return (
                <Fragment key={idxM}>
                  {comps.map((c: any, idxC: number) => (
                    <tr key={idxC} className="salto-pagina">
                      {idxC === 0 && (
                        <td rowSpan={comps.length} style={{ 
                          fontWeight: 'bold', 
                          verticalAlign: 'middle', 
                          textAlign: 'center'
                        }}>
                          {evalMateria.dimension}
                        </td>
                      )}
                      <td>{c.competencia}</td>
                      <td>{c.desempeno}</td>
                      <td style={{ padding: 0 }}>
                        <div style={{ display: 'flex', height: '100%', minHeight: '60px' }}>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #1e293b', padding: '5px' }}>
                            <strong style={{ fontSize: '1.2rem' }}>{c.nota?.toFixed(1)}</strong>
                            <span style={{ fontSize: '0.65rem', textAlign: 'center', lineHeight: '1' }}>{c.escala}</span>
                          </div>
                          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px' }}>
                            {obtenerIconoEscala(c.escala)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* SUGERENCIAS */}
                  <tr className="salto-pagina">
                    <td colSpan={4} style={{ padding: '12px' }}>
                      <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                        <strong style={{ textTransform: 'uppercase', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                          Sugerencias de la dimensión:
                        </strong>
                        <p style={{ margin: 0, fontStyle: 'italic', lineHeight: '1.4' }}>
                          Espacio reservado para las observaciones pedagógicas de la dimensión del periodo.
                        </p>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </table>

        {/* FIRMA DIRECTOR DE GRUPO */}
        <footer style={{ marginTop: '60px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ borderBottom: '1px solid #1e293b', width: '300px', marginBottom: '10px' }}></div>
            <strong style={{ textTransform: 'uppercase', display: 'block' }}>{director?.full_name || 'Profesor(a) Encargado(a)'}</strong>
            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Director(a) de Grupo</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default function BoletinPreescolarPDF() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '100px' }}>Cargando planilla...</div>}>
      <ContenidoBoletinPreescolarPDF />
    </Suspense>
  )
}