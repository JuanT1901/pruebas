/* src/app/asi-lo-vivimos/page.tsx */
import React from 'react';
import Link from 'next/link';
import styles from 'app/styles/asi-lo-vivimos/asi-lo-vivimos.module.scss';
import { 
  FaHistory, 
  FaLightbulb, 
  FaPuzzlePiece, 
  FaCalendarAlt, 
  FaGuitar, 
  FaRocket 
} from 'react-icons/fa';

const sections = [
  {
    title: "Programa de Emprendimiento",
    description: "Innovación, liderazgo y creación de proyectos desde el aula.",
    icon: <FaRocket />,
    href: "/asi-lo-vivimos/programa-emprendimiento",
    isHighlight: true, // ¡Esta es la clave!
    color: "#E65100"   // Naranja intenso
  },
  {
    title: "Nuestra Historia",
    description: "Conoce el legado y los pasos que nos han traído hasta aquí.",
    icon: <FaHistory />,
    href: "/asi-lo-vivimos/nuestra-historia",
    color: "#3CA0E8"
  },
  {
    title: "Nuestra Filosofía",
    description: "Los valores y principios que guían nuestra educación.",
    icon: <FaLightbulb />,
    href: "/asi-lo-vivimos/nuestra-filosofia",
    color: "#FBC02D"
  },
  {
    title: "Nuestro Modelo",
    description: "Una metodología centrada en el estudiante y su desarrollo integral.",
    icon: <FaPuzzlePiece />,
    href: "/asi-lo-vivimos/nuestro-modelo",
    color: "#43A047"
  },
  {
    title: "Calendario Escolar",
    description: "Fechas importantes, eventos y cronograma del año lectivo.",
    icon: <FaCalendarAlt />,
    href: "/asi-lo-vivimos/calendario-escolar",
    color: "#5E35B1"
  },
  {
    title: "Extra-curriculares",
    description: "Arte, deporte y cultura para complementar la formación.",
    icon: <FaGuitar />,
    href: "/asi-lo-vivimos/extra-curriculares",
    color: "#D81B60"
  }
];

export default function AsiLoVivimos() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Así lo vivimos</h1>
        <p className={styles.subtitle}>
          Explora el día a día, nuestra esencia y los programas que hacen de Ludo Club un lugar único para aprender y crecer.
        </p>
      </header>

      <div className={styles.grid}>
        {sections.map((item, index) => (
          <Link key={index} href={item.href} className={styles.cardLink}>
            <article 
              className={`${styles.card} ${item.isHighlight ? styles.highlight : ''}`}
              style={{ '--card-color': item.color } as React.CSSProperties}
            >
              {item.isHighlight && <span className={styles.badge}>¡Nuevo!</span>}
              
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <div className={styles.content}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span className={styles.cta}>Ver más →</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}