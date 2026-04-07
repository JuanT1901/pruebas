/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaSave, FaSpinner, FaUserGraduate, FaCheckCircle, FaExclamationTriangle, FaAddressCard, FaFemale, FaMale, FaUserShield, FaBus } from 'react-icons/fa'
import styles from 'app/styles/pages/Dashboard.module.scss'
import { crearEstudianteIndividual } from './actions'

export default function CrearEstudiantePage() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [cursos, setCursos] = useState<any[]>([])
  const [cargando, setCargando] = useState(false)
  const [errorMsj, setErrorMsj] = useState<string | null>(null)
  const [exitoMsj, setExitoMsj] = useState(false)

  const [formData, setFormData] = useState({
    username: '', course_name: '', full_name: '', birth_date: '', city: '', neighborhood: '', address: '', 
    doc_type: 'TI', doc_number: '', doc_expedition_city: '', eps: '', blood_type: '', siblings_count: '',
    mother_name: '', mother_doc: '', mother_profession: '', mother_cellphone: '', mother_phone: '', mother_email: '', mother_lives_with_student: '',
    father_name: '', father_doc: '', father_profession: '', father_cellphone: '', father_phone: '', father_email: '', father_lives_with_student: '',
    guardian_name: '', guardian_cellphone: '', reference_name: '', reference_cellphone: '',
    extra_shift: '', school_bus: '', bus_address: '', needs_sweatshirt: '', sweatshirt_size: '', needs_tshirt: '', tshirt_size: ''
  })

  useEffect(() => {
    const cargarCursos = async () => {
      const { data } = await supabase.from('grades').select('*').order('order_index', { ascending: true })
      if (data) setCursos(data)
    }
    cargarCursos()
  }, [supabase])

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)
    setErrorMsj(null)
    setExitoMsj(false)

    const resultado = await crearEstudianteIndividual(formData)

    setCargando(false)

    if (resultado.exito) {
      setExitoMsj(true)
      setTimeout(() => router.push('/plataformas/admin/estudiantes'), 2000)
    } else {
      if (resultado.error?.includes('already registered')) {
        setErrorMsj('El nombre de usuario o correo ya está en uso.')
      } else {
        setErrorMsj(`Error al crear estudiante: ${resultado.error}`)
      }
    }
  }

  const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '0.95rem' }
  const labelStyle = { display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '0.85rem', color: '#475569' }
  const sectionStyle = { backgroundColor: '#f8fafc', padding: '25px', borderRadius: '8px', border: '1px solid #e2e8f0' }
  const titleStyle = { fontSize: '1.2rem', marginBottom: '20px', color: '#334155', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }

  return (
    <main className={styles.mainContent}>
      <header className={styles.header} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link href="/plataformas/admin/estudiantes" style={{ color: '#64748b', fontSize: '1.2rem' }}><FaArrowLeft /></Link>
        <div>
          <h1>Matricular Estudiante 📝</h1>
          <p>Diligencia la ficha completa de matrícula del Gimnasio Aluna.</p>
        </div>
      </header>

      <div className={styles.card} style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {errorMsj && <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ef4444', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><FaExclamationTriangle /> {errorMsj}</div>}
        {exitoMsj && <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #10b981', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}><FaCheckCircle /> ¡Ficha guardada exitosamente! Redirigiendo...</div>}

        <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          <div style={sectionStyle}>
            <h3 style={titleStyle}><FaUserGraduate color="#3b82f6" /> 1. Credenciales de Acceso y Curso</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              <div>
                <label style={labelStyle}>Nombre de Usuario (Login) *</label>
                <input type="text" name="username" value={formData.username} onChange={manejarCambio} placeholder="Ej: anawagner" style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Curso Asignado *</label>
                <select name="course_name" value={formData.course_name} onChange={manejarCambio} style={inputStyle} required>
                  <option value="">-- Seleccionar --</option>
                  {cursos.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={titleStyle}><FaAddressCard color="#10b981" /> 2. Datos Personales del Alumno</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Nombre Completo *</label><input type="text" name="full_name" value={formData.full_name} onChange={manejarCambio} style={inputStyle} required /></div>
              
              <div>
                <label style={labelStyle}>Tipo de Documento *</label>
                <select name="doc_type" value={formData.doc_type} onChange={manejarCambio} style={inputStyle}>
                  <option value="RC">Registro Civil</option><option value="TI">Tarjeta de Identidad</option><option value="CC">Cédula</option><option value="CE">Cédula Extranjería</option><option value="PPT">PPT / PEP</option>
                </select>
              </div>
              <div><label style={labelStyle}>Número de Documento *</label><input type="text" name="doc_number" value={formData.doc_number} onChange={manejarCambio} style={inputStyle} required /></div>
              <div><label style={labelStyle}>Lugar de Expedición</label><input type="text" name="doc_expedition_city" value={formData.doc_expedition_city} onChange={manejarCambio} style={inputStyle} /></div>
              
              <div><label style={labelStyle}>Fecha de Nacimiento</label><input type="date" name="birth_date" value={formData.birth_date} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>RH (Grupo Sanguíneo)</label><input type="text" name="blood_type" value={formData.blood_type} onChange={manejarCambio} placeholder="Ej: O+" style={inputStyle} /></div>
              <div><label style={labelStyle}>E.P.S</label><input type="text" name="eps" value={formData.eps} onChange={manejarCambio} style={inputStyle} /></div>
              
              <div><label style={labelStyle}>Ciudad de Residencia</label><input type="text" name="city" value={formData.city} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Barrio</label><input type="text" name="neighborhood" value={formData.neighborhood} onChange={manejarCambio} style={inputStyle} /></div>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Dirección Exacta</label><input type="text" name="address" value={formData.address} onChange={manejarCambio} style={inputStyle} /></div>
              
              <div><label style={labelStyle}>Número de Hermanos</label><input type="number" name="siblings_count" value={formData.siblings_count} onChange={manejarCambio} style={inputStyle} /></div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={titleStyle}><FaFemale color="#ec4899" /> 3. Información de la Madre</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Nombre de la Madre</label><input type="text" name="mother_name" value={formData.mother_name} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Documento</label><input type="text" name="mother_doc" value={formData.mother_doc} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Profesión</label><input type="text" name="mother_profession" value={formData.mother_profession} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Celular</label><input type="text" name="mother_cellphone" value={formData.mother_cellphone} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Teléfono Fijo</label><input type="text" name="mother_phone" value={formData.mother_phone} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Correo Electrónico</label><input type="email" name="mother_email" value={formData.mother_email} onChange={manejarCambio} style={inputStyle} /></div>
              <div>
                <label style={labelStyle}>¿Vive con el estudiante?</label>
                <select name="mother_lives_with_student" value={formData.mother_lives_with_student} onChange={manejarCambio} style={inputStyle}>
                  <option value="">-- Seleccionar --</option><option value="Sí">Sí</option><option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={titleStyle}><FaMale color="#6366f1" /> 4. Información del Padre</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Nombre del Padre</label><input type="text" name="father_name" value={formData.father_name} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Documento</label><input type="text" name="father_doc" value={formData.father_doc} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Profesión</label><input type="text" name="father_profession" value={formData.father_profession} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Celular</label><input type="text" name="father_cellphone" value={formData.father_cellphone} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Teléfono Fijo</label><input type="text" name="father_phone" value={formData.father_phone} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Correo Electrónico</label><input type="email" name="father_email" value={formData.father_email} onChange={manejarCambio} style={inputStyle} /></div>
              <div>
                <label style={labelStyle}>¿Vive con el estudiante?</label>
                <select name="father_lives_with_student" value={formData.father_lives_with_student} onChange={manejarCambio} style={inputStyle}>
                  <option value="">-- Seleccionar --</option><option value="Sí">Sí</option><option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={titleStyle}><FaUserShield color="#f59e0b" /> 5. Acudiente Legal y Referencia Familiar</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div><label style={labelStyle}>Nombre del Acudiente</label><input type="text" name="guardian_name" value={formData.guardian_name} onChange={manejarCambio} placeholder="Quien firma matrícula" style={inputStyle} /></div>
              <div><label style={labelStyle}>Celular del Acudiente</label><input type="text" name="guardian_cellphone" value={formData.guardian_cellphone} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Referencia Familiar (Emergencia)</label><input type="text" name="reference_name" value={formData.reference_name} onChange={manejarCambio} style={inputStyle} /></div>
              <div><label style={labelStyle}>Celular de Referencia</label><input type="text" name="reference_cellphone" value={formData.reference_cellphone} onChange={manejarCambio} style={inputStyle} /></div>
            </div>
          </div>

          <div style={sectionStyle}>
            <h3 style={titleStyle}><FaBus color="#8b5cf6" /> 6. Información Adicional y Servicios</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div>
                <label style={labelStyle}>Jornada Adicional</label>
                <select name="extra_shift" value={formData.extra_shift} onChange={manejarCambio} style={inputStyle}><option value="">--</option><option value="Sí">Sí</option><option value="No">No</option></select>
              </div>
              <div>
                <label style={labelStyle}>Toma Ruta Escolar</label>
                <select name="school_bus" value={formData.school_bus} onChange={manejarCambio} style={inputStyle}><option value="">--</option><option value="Sí">Sí</option><option value="No">No</option></select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Dirección/Barrio de la Ruta</label><input type="text" name="bus_address" value={formData.bus_address} onChange={manejarCambio} style={inputStyle} /></div>
              
              <div>
                <label style={labelStyle}>¿Requiere Buzo?</label>
                <select name="needs_sweatshirt" value={formData.needs_sweatshirt} onChange={manejarCambio} style={inputStyle}><option value="">--</option><option value="Sí">Sí</option><option value="No">No</option></select>
              </div>
              <div><label style={labelStyle}>Talla Buzo</label><input type="text" name="sweatshirt_size" value={formData.sweatshirt_size} onChange={manejarCambio} style={inputStyle} /></div>
              
              <div>
                <label style={labelStyle}>¿Requiere Camiseta?</label>
                <select name="needs_tshirt" value={formData.needs_tshirt} onChange={manejarCambio} style={inputStyle}><option value="">--</option><option value="Sí">Sí</option><option value="No">No</option></select>
              </div>
              <div><label style={labelStyle}>Talla Camiseta</label><input type="text" name="tshirt_size" value={formData.tshirt_size} onChange={manejarCambio} style={inputStyle} /></div>
            </div>
          </div>

          <button type="submit" disabled={cargando} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', cursor: cargando ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            {cargando ? <FaSpinner className="fa-spin" /> : <FaSave />}
            {cargando ? 'Guardando Ficha...' : 'Guardar Ficha de Matrícula'}
          </button>
        </form>

      </div>
    </main>
  )
}