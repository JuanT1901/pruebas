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
  const [sugerenciasGlobales, setSugerenciasGlobales] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!estudianteId || !periodo) return

    const cargarBoletin = async () => {
      // 1. Barrera de Seguridad
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        alert("🔒 Acceso Denegado: No tienes autorización para ver este documento.")
        window.location.href = '/' 
        return
      }

      const { data: perfilUsuario } = await supabase.from('profiles').select('role').eq('id', user.id).single()

      if (perfilUsuario?.role === 'teacher' || perfilUsuario?.role === 'student') {
        alert("🔒 Acceso Denegado: Solo administradores pueden generar boletines consolidados.")
        window.location.href = '/plataformas/profesores/dashboard' 
        return
      }

      // 2. Cargar datos del estudiante
      const { data: estData } = await supabase.from('profiles').select('*').eq('id', estudianteId).single()
      setEstudiante(estData)

      if (estData) {
        // 🌟 3. Cargar Evaluaciones Académicas
        const { data: evalData } = await supabase
          .from('preschool_evaluations')
          .select('*')
          .eq('student_id', estudianteId)
          .eq('period', parseInt(periodo))
        
        let evaluacionesCompletas = evalData ? [...evalData] : [];

        // 🌟 4. Cargar Comportamiento y convertirlo en "Dimensión socio-afectiva"
        const { data: compData } = await supabase
          .from('behavior_evaluations') 
          .select('*')
          .eq('student_id', estudianteId)
          .eq('period', parseInt(periodo))
          .maybeSingle()

        if (compData) {
          evaluacionesCompletas.push({
            dimension: 'Dimensión socio-afectiva',
            competencies_data: [
              {
                competencia: 'Convivencia escolar y relaciones interpersonales',
                
                desempeno: compData.observations || compData.observacion || compData.observaciones || compData.desempeno || 'No se registraron observaciones de comportamiento para este periodo.',
                
                nota: compData.score || compData.grade || compData.nota || 0,
                
                escala: compData.scale || compData.escala || compData.escala_valorativa || 'Básico'
              }
            ]
          });
        }

        setEvaluaciones(evaluacionesCompletas);

        // 5. Cargar Director
        const { data: cursoData } = await supabase.from('grades').select('director_id').eq('name', estData.course_name).single()
        if (cursoData?.director_id) {
          const { data: dirData } = await supabase.from('profiles').select('full_name').eq('id', cursoData.director_id).single()
          setDirector(dirData)
        }

        // 6. Cargar Sugerencias de la Rectora
        const { data: sugerenciasBd } = await supabase
          .from('preschool_suggestions')
          .select('dimension, suggestion_text')
          .eq('course_name', estData.course_name)
          .eq('period', parseInt(periodo))

        if (sugerenciasBd) {
          const mapaSugerencias: Record<string, string> = {};
          sugerenciasBd.forEach((s) => {
            mapaSugerencias[s.dimension] = s.suggestion_text;
          });
          setSugerenciasGlobales(mapaSugerencias);
        }
      }
      setCargando(false)
    }

    cargarBoletin()
  }, [estudianteId, periodo, supabase])

  const obtenerIconoEscala = (textoEscala: string) => {
    if (!textoEscala) return null;
    const t = textoEscala.toLowerCase();
    if (t.includes('iniciado') || t.includes('bajo')) return <FaSeedling size={24} color="#b45309" />
    if (t.includes('proceso') || t.includes('básico')) return <FaChartLine size={24} color="#1d4ed8" />
    if (t.includes('alcanzado') || t.includes('alto') || t.includes('superior')) return <FaTrophy size={24} color="#15803d" />
    return null
  }

  if (cargando) return <div style={{ textAlign: 'center', marginTop: '100px' }}><FaSpinner className="fa-spin" size={40} color="#3b82f6" /></div>

  // 🌟 AGRUPADOR INTELIGENTE
  const evaluacionesAgrupadas = evaluaciones.reduce((acc: any[], actual: any) => {
    const baseName = actual.dimension.split('(')[0].trim();
    
    let subMateria = "";
    if (actual.dimension.includes('(')) {
      subMateria = actual.dimension.split('(')[1].replace(')', '').trim();
    }

    const dimensionExistente = acc.find(item => item.baseName === baseName);

    if (dimensionExistente) {
      dimensionExistente.competencias.push(...(actual.competencies_data || []));
      if (subMateria && !dimensionExistente.subMaterias.includes(subMateria)) {
        dimensionExistente.subMaterias.push(subMateria);
      }
    } else {
      acc.push({
        baseName: baseName,
        subMaterias: subMateria ? [subMateria] : [],
        competencias: [...(actual.competencies_data || [])]
      });
    }
    return acc;
  }, []);

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
            <img src="/logo-ludo.png" alt="Logo Ludo Club" style={{ maxWidth: '100%', maxHeight: '85px', objectFit: 'contain' }} />
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
            <img src="/logo.jpeg" alt="Logo Aluna" style={{ maxWidth: '100%', maxHeight: '85px', objectFit: 'contain' }} />
          </div>
        </header>

        {/* INFO ESTUDIANTE */}
        <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '10px', marginBottom: '20px', overflow: 'hidden' }}>
          <div style={{ flex: 1, padding: '12px', borderRight: '1px solid #cbd5e1' }}>
            <span style={{ color: '#64748b' }}>ESTUDIANTE:</span> 
            <strong style={{ textTransform: 'uppercase', marginLeft: '8px', color: '#1e293b' }}>{estudiante?.full_name}</strong>
          </div>
          <div style={{ width: '250px', padding: '12px' }}>
            <span style={{ color: '#64748b' }}>NIVEL:</span> 
            <strong style={{ textTransform: 'uppercase', marginLeft: '8px', color: '#1e293b' }}>{estudiante?.course_name}</strong>
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
            {evaluacionesAgrupadas.map((bloque, idxB) => {
              const comps = bloque.competencias;
              const tituloCompleto = bloque.subMaterias.length > 0 
                ? `${bloque.baseName} (${bloque.subMaterias.join(' / ')})` 
                : bloque.baseName;
              
              const esSocioAfectiva = bloque.baseName.toLowerCase().includes('socio-afectiva');

              return (
                <Fragment key={idxB}>
                  {comps.map((c: any, idxC: number) => (
                    <tr key={idxC} className="salto-pagina">
                      {idxC === 0 && (
                        <td rowSpan={comps.length} style={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 'bold', width: '150px' }}>
                          {tituloCompleto}
                        </td>
                      )}
                      
                      <td style={{ fontSize: '0.85rem' }}>{c.competencia}</td>
                      <td style={{ fontSize: '0.8rem' }}>{c.desempeno}</td>
                      
                      <td style={{ padding: 0, height: '1px', width: '100px' }}>
                        <div style={{ display: 'flex', height: '100%' }}>
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #1e293b', padding: '5px' }}>
                            {/* Ocultamos la nota numérica si es Comportamiento */}
                            {!esSocioAfectiva && (
                              <strong style={{ fontSize: '1.2rem' }}>{c.nota?.toFixed(1)}</strong>
                            )}
                            <span style={{ fontSize: esSocioAfectiva ? '0.75rem' : '0.6rem', textAlign: 'center', lineHeight: '1.1', fontWeight: esSocioAfectiva ? 'bold' : 'normal' }}>
                              {c.escala}
                            </span>
                          </div>
                          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px' }}>
                            {obtenerIconoEscala(c.escala)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  <tr className="salto-pagina">
                    <td colSpan={4} style={{ padding: '12px', backgroundColor: '#fdfdfd' }}>
                      <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                        <strong style={{ textTransform: 'uppercase', color: '#1e293b', display: 'block', marginBottom: '4px' }}>
                          Sugerencias Pedagógicas - {bloque.baseName}:
                        </strong>
                        <p style={{ margin: 0, fontStyle: 'italic', lineHeight: '1.4' }}>
                          {sugerenciasGlobales[bloque.baseName] || 'No se han registrado observaciones pedagógicas para esta dimensión en el periodo actual.'}
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