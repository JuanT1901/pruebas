'use client'

import { FaUserGraduate, FaChalkboardTeacher, FaUserTie } from 'react-icons/fa';
import styles from 'app/styles/plataformas/PlatformCards.module.scss';

const platforms = [
  { name: 'Estudiantes', icon: <FaUserGraduate />, color: '#2196F3', url: '/plataformas/estudiantes' },
  { name: 'Profesores', icon: <FaChalkboardTeacher />, color: '#FFC107', url: '/plataformas/profesores' },
  { name: 'Directivos', icon: <FaUserTie />, color: '#FF5722', url: '/plataformas/directivos' },
];

const PlatformCards = () => {
  return (
    <section className={styles.platformSection}>
      <h2>Plataformas Institucionales</h2>
      <p>Aquí encontrarás las distintas plataformas institucionales.</p>
      <div className={styles.platformList}>
        {platforms.map((platform, index) => (
          <a key={index} href={platform.url} className={styles.platformCard}>
            <div className={styles.iconWrapper} style={{ backgroundColor: platform.color }}>
              {platform.icon}
            </div>
            <div className={styles.cardContent}>
              <h3>{platform.name}</h3>
              <span>Ingresar</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PlatformCards;
