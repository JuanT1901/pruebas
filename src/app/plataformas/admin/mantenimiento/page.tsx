'use client'

import { useState } from 'react'
import { FaWrench, FaSpinner, FaCheckCircle } from 'react-icons/fa'
import { arreglarContrasenasProfesores } from './actions'

export default function MantenimientoPage() {
  const [cargando, setCargando] = useState(false)
  const [resultado, setResultado] = useState<{ arreglados?: number, errores?: number } | null>(null)

  const ejecutarLimpieza = async () => {
    setCargando(true)
    const res = await arreglarContrasenasProfesores()
    if (res.exito) {
      setResultado({ arreglados: res.arreglados, errores: res.errores })
    }
    setCargando(false)
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <FaWrench size={50} color="#64748b" style={{ marginBottom: '20px' }} />
      <h1 style={{ color: '#334155' }}>Herramienta de Mantenimiento</h1>
      <p style={{ color: '#64748b', marginBottom: '30px' }}>
        Este proceso buscará a todos los profesores, eliminará los puntos de sus números de documento y reseteará sus contraseñas al número limpio.
      </p>

      <button 
        onClick={ejecutarLimpieza}
        disabled={cargando}
        style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: cargando ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%' }}
      >
        {cargando ? <FaSpinner className="fa-spin" /> : <FaWrench />}
        {cargando ? 'Reparando contraseñas...' : 'Ejecutar Limpieza de Contraseñas'}
      </button>

      {resultado && (
        <div style={{ marginTop: '30px', backgroundColor: '#dcfce7', padding: '20px', borderRadius: '8px', border: '1px solid #10b981', color: '#166534' }}>
          <FaCheckCircle size={30} style={{ marginBottom: '10px' }} />
          <h3>¡Proceso Completado!</h3>
          <p><strong>{resultado.arreglados}</strong> contraseñas actualizadas correctamente.</p>
          {resultado.errores ? <p style={{ color: '#dc2626' }}>Hubo {resultado.errores} errores.</p> : null}
        </div>
      )}
    </div>
  )
}