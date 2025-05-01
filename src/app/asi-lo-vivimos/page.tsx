'use client'

import Link from 'next/link';
import {
  FaCalendarAlt,
  FaFutbol,
  FaLightbulb,
  FaBookOpen,
  FaProjectDiagram
} from 'react-icons/fa';
import styles from 'app/styles/asi-lo-vivimos/asi-lo-vivimos.module.scss';

const AsiLoVivimos = () => {
  const sections = [
    {
      title: 'Calendario Escolar',
      path: '/asi-lo-vivimos/calendario-escolar',
      icon: <FaCalendarAlt />
    },
    {
      title: 'Extra-Curriculares',
      path: '/asi-lo-vivimos/extra-curriculares',
      icon: <FaFutbol />
    },
    {
      title: 'Nuestra Filosofía',
      path: '/asi-lo-vivimos/nuestra-filosofia',
      icon: <FaLightbulb />
    },
    {
      title: 'Nuestra Historia',
      path: '/asi-lo-vivimos/nuestra-historia',
      icon: <FaBookOpen />
    },
    {
      title: 'Nuestro Modelo',
      path: '/asi-lo-vivimos/nuestro-modelo',
      icon: <FaProjectDiagram />
    }
  ];

  return (
    <main className={styles.container}>
      <h1>Así lo vivimos</h1>
      <p>Explora las diferentes formas en que vivimos nuestra filosofía educativa.</p>
      <div className={styles.sectionsGrid}>
        {sections.map((section) => (
          <Link href={section.path} key={section.title} className={styles.sectionCard}>
            <div className={styles.cardContent}>
              <span className={styles.icon}>{section.icon}</span>
              <h2>{section.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default AsiLoVivimos;
