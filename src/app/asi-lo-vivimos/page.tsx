'use client';

import Link from 'next/link';
import styles from 'app/styles/asi-lo-vivimos/asi-lo-vivimos.module.scss';

const AsiLoVivimos = () => {
  const sections = [
    { title: 'Calendario Escolar', path: '/asi-lo-vivimos/calendario-escolar' },
    { title: 'Extra-Curriculares', path: '/asi-lo-vivimos/extra-curriculares' },
    { title: 'Nuestra Filosofía', path: '/asi-lo-vivimos/nuestra-filosofia' },
    { title: 'Nuestra Historia', path: '/asi-lo-vivimos/nuestra-historia' },
    { title: 'Nuestro Modelo', path: '/asi-lo-vivimos/nuestro-modelo' },
  ];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Así lo vivimos</h1>
      <p className={styles.description}>
        Explora las diferentes formas en que vivimos nuestra filosofía educativa.
      </p>
      <div className={styles.sectionsGrid}>
        {sections.map((section) => (
          <Link href={section.path} key={section.title} className={styles.sectionCard}>
            <div>
              <h2>{section.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default AsiLoVivimos;