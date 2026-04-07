'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { FaSpinner } from 'react-icons/fa'
import PlanillaPreescolar from './PlanillaPreescolar'

// Arrays de clasificación
const CURSOS_PREESCOLAR = ['Aventureros', 'Creativos', 'Expertos']
const CURSOS_NIVEL_2 = ['Emprendedores', 'Ingeniosos', 'Transformadores']

function CalificacionesRouter() {
  const searchParams = useSearchParams()
  const curso = searchParams.get('curso')

  if (!curso) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Cargando datos de la clase...</div>
  }

  // 🚦 LÓGICA DE ENRUTAMIENTO
  if (CURSOS_PREESCOLAR.includes(curso)) {
    return <PlanillaPreescolar />
  } 
  else if (CURSOS_NIVEL_2.includes(curso)) {
    // Cuando creemos esta planilla, la importaremos y la pondremos aquí
    return <div style={{ padding: '50px', textAlign: 'center' }}>🚧 Planilla para {curso} en construcción...</div>
  } 
  else {
    // Para todos los demás cursos (Estándar)
    return <div style={{ padding: '50px', textAlign: 'center' }}>🚧 Planilla Estándar en construcción...</div>
  }
}

export default function CalificacionesPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', marginTop: '50px' }}><FaSpinner className="fa-spin" size={40} /></div>}>
      <CalificacionesRouter />
    </Suspense>
  )
}