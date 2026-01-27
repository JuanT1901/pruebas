import React from 'react';
import styles from 'app/styles/asi-lo-vivimos/extra-curriculares/ExtraCurriculares.module.scss';
import { FaPalette, FaFutbol, FaTheaterMasks, FaStar } from 'react-icons/fa';

export default function ExtraCurriculares() {
  return (
    <div className={styles.container}>
      
      <header className={styles.header}>
        <div className={styles.badgeWrapper}>
          <span className={styles.badge}>Tiempo Libre con Sentido</span>
        </div>
        <h1 className={styles.title}>Más allá del aula</h1>
        
        <div className={styles.mainTextWrapper}>
          <p className={styles.mainText}>
            En <strong>Gimnasio Aluna</strong> entendemos el tiempo libre como una oportunidad para crecer, disfrutar y descubrir talentos.
          </p>
          <div className={styles.decorationLine}></div>
          <p className={styles.secondaryText}>
            Nuestras actividades extracurriculares brindan espacios de recreación y aprendizaje donde el arte, la cultura y el deporte se convierten en caminos para fortalecer habilidades, explorar intereses y potenciar el desarrollo integral de cada niño, respetando su ritmo, su esencia y su manera única de expresarse.
          </p>
        </div>
      </header>

      <section className={styles.areasGrid}>
        
        <div className={`${styles.card} ${styles.art}`}>
          <div className={styles.iconBox}>
            <FaPalette />
          </div>
          <h2>Arte y Expresión</h2>
          <p>Espacios para pintar, crear y manifestar la esencia única de cada niño a través del color y la forma.</p>
        </div>

        <div className={`${styles.card} ${styles.culture}`}>
          <div className={styles.iconBox}>
            <FaTheaterMasks />
          </div>
          <h2>Cultura y Talento</h2>
          <p>Música, teatro y danza para explorar intereses, fortalecer la identidad y descubrir nuevas pasiones.</p>
        </div>

        <div className={`${styles.card} ${styles.sport}`}>
          <div className={styles.iconBox}>
            <FaFutbol />
          </div>
          <h2>Deporte y Juego</h2>
          <p>Movimiento, recreación y trabajo en equipo para potenciar el desarrollo físico y social.</p>
        </div>

      </section>

      <div className={styles.footerNote}>
        <FaStar className={styles.starIcon} />
        <p>Un espacio para ser, crear y compartir.</p>
        <FaStar className={styles.starIcon} />
      </div>

    </div>
  );
}