/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import * as XLSX from 'xlsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaUpload, FaFileExcel, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import styles from 'app/styles/pages/Dashboard.module.scss'
import { importarProfesoresMasivo } from './actions'

export default function ImportarProfesoresPage() {
  const router = useRouter()
  const [datosExcel, setDatosExcel] = useState<any[]>([])
  const [nombreArchivo, setNombreArchivo] = useState('')
  const [cargando, setCargando] = useState(false)
  const [resultado, setResultado] = useState<{ procesados: number, asignaciones: number, errores: string[] } | null>(null)

  const manejarSubidaArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setNombreArchivo(file.name)
    setResultado(null)

    const reader = new FileReader()
    reader.onload = (evento) => {
      const bstr = evento.target?.result
      const wb = XLSX.read(bstr, { type: 'binary' })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = XLSX.utils.sheet_to_json(ws)
      setDatosExcel(data)
    }
    reader.readAsBinaryString(file)
  }

  const procesarImportacion = async () => {
    if (datosExcel.length === 0) return
    setCargando(true)

    const primeraFila = datosExcel[0]
    if (!primeraFila['Nombre Completo'] || !primeraFila['Documento'] || !primeraFila['Usuario']) {
      setResultado({ procesados: 0, asignaciones: 0, errores: ['El Excel debe tener al menos las columnas obligatorias: "Nombre Completo", "Documento" y "Usuario"'] })
      setCargando(false)
      return
    }

    const datosLimpios = JSON.parse(JSON.stringify(datosExcel))
    const res = await importarProfesoresMasivo(datosLimpios)
    
    setCargando(false)
    setResultado({ procesados: res.procesados || 0, asignaciones: res.asignaciones || 0, errores: res.errores || [] })

    if (res.errores?.length === 0) {
      setTimeout(() => router.push('/plataformas/admin/profesores'), 4000)
    }
  }

  return (
    <main className={styles.mainContent}>
      <header className={styles.header} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link href="/plataformas/admin/profesores" style={{ color: '#64748b', fontSize: '1.2rem' }}><FaArrowLeft /></Link>
        <div>
          <h1>Matriz Académica de Docentes 👩‍🏫</h1>
          <p>Crea profesores y asígnales su carga académica desde un solo archivo Excel.</p>
        </div>
      </header>

      <div className={styles.card} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        <div style={{ backgroundColor: '#f8fafc', padding: '40px', borderRadius: '12px', border: '2px dashed #cbd5e1', marginBottom: '30px', position: 'relative' }}>
          <FaFileExcel size={50} color="#10b981" style={{ marginBottom: '15px' }} />
          <h3 style={{ color: '#334155', marginBottom: '10px' }}>Sube la Matriz de Profesores</h3>
          <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '0.9rem' }}>
            <strong>Obligatorios:</strong> Nombre Completo, Documento, Usuario.<br/>
            <strong>Opcionales para Carga:</strong> Curso, Materia. <em>(Usa múltiples filas para asignar varias clases al mismo profesor)</em>.
          </p>
          
          <input type="file" accept=".xlsx, .xls" onChange={manejarSubidaArchivo} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
          <button style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', color: '#475569', pointerEvents: 'none' }}>
            {nombreArchivo ? `Archivo cargado: ${nombreArchivo}` : 'Seleccionar Archivo Excel'}
          </button>
        </div>

        {datosExcel.length > 0 && !resultado && (
          <div style={{ marginBottom: '30px', textAlign: 'left', backgroundColor: '#eff6ff', padding: '20px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
            <p style={{ color: '#1e40af', fontWeight: 'bold', margin: '0 0 10px 0' }}>✓ Vista previa correcta</p>
            <p style={{ margin: 0, color: '#1e3a8a' }}>Se procesarán <strong>{datosExcel.length} filas</strong> de asignaciones y registros.</p>
          </div>
        )}

        {resultado && (
          <div style={{ marginBottom: '30px', textAlign: 'left' }}>
            {(resultado.procesados > 0 || resultado.asignaciones > 0) && (
              <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #10b981', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                <FaCheckCircle /> 
                ¡{resultado.procesados} profes nuevos creados y {resultado.asignaciones} clases asignadas!
              </div>
            )}
            {resultado.errores.length > 0 && (
              <div style={{ backgroundColor: '#fef2f2', color: '#991b1b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', marginBottom: '10px' }}><FaExclamationTriangle /> Reporte de inconvenientes:</div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                  {resultado.errores.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        <button onClick={procesarImportacion} disabled={datosExcel.length === 0 || cargando} style={{ width: '100%', backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', cursor: (datosExcel.length === 0 || cargando) ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', opacity: datosExcel.length === 0 ? 0.5 : 1 }}>
          {cargando ? <FaSpinner className="fa-spin" /> : <FaUpload />}
          {cargando ? 'Procesando Matriz...' : 'Ejecutar Matriz Académica'}
        </button>

      </div>
    </main>
  )
}