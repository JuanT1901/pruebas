import React from 'react';
import styles from 'app/styles/asi-lo-vivimos/preguntas-frecuentes/PreguntasFrecuentes.module.scss';
import InstagramPost from 'app/components/InstagramPost';
import { FaBrain, FaShapes, FaUsers } from 'react-icons/fa';

export default function PreguntasFrecuentes() {
  return (
    <div className={styles.container}>
      
      <header className={styles.header}>
        <span className={styles.badge}>Mitos y Realidades</span>
        <h1 className={styles.title}>Preguntas Frecuentes</h1>
      </header>

      <section className={styles.content}>
        
        <div className={styles.introBox}>
          <div className={styles.iconRow}>
            <FaBrain title="Neuroeducación" />
            <FaShapes title="Juego Intencionado" />
            <FaUsers title="Desarrollo Social" />
          </div>
          <p className={styles.text}>
            En torno a las metodologías pedagógicas activas persisten diversos mitos que dificultan la comprensión de su verdadero alcance. 
            <br /><br />
            Nuestro modelo se sustenta en <strong>bases científicas</strong>, aportes de la <strong>neuroeducación</strong> y enfoques contemporáneos del aprendizaje, donde el juego cumple un rol pedagógico intencionado como mediador del desarrollo cognitivo, emocional y social.
            <br /><br />
            En un contexto educativo en constante evolución, aclaramos aquí las preguntas más frecuentes para facilitar una comprensión adecuada de cómo y por qué esta metodología potencia el <strong>aprendizaje significativo</strong>.
          </p>
        </div>

        <div className={styles.videoContainer}>
          <h3 className={styles.videoTitle}>Viviendo la metodología</h3>
          <div className={styles.videoWrapper}>
            <InstagramPost url="https://www.instagram.com/p/DTTogvADzK-/" />
          </div>
        </div>

      </section>
    </div>
  );
}