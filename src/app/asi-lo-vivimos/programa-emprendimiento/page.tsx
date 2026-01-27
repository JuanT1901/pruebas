import React from 'react';
import styles from 'app/styles/asi-lo-vivimos/programa-emprendimiento/ProgramaEmprendimiento.module.scss';
import InstagramPost from 'app/components/InstagramPost';
import { FaSeedling, FaRocket, FaLightbulb, FaHandsHelping } from 'react-icons/fa';

export default function ProgramaEmprendimiento() {
  return (
    <div className={styles.container}>
      
      <header className={styles.header}>
        <span className={styles.badge}>Innovación Educativa</span>
        <h1 className={styles.title}>Programa de Emprendimiento</h1>
        <h2 className={styles.brandName}>Semillas 360</h2>
      </header>

      <section className={styles.videoSection}>
        <div className={styles.videosGrid}>
          
          <div className={styles.videoWrapper}>
            <InstagramPost url="https://www.instagram.com/p/DSLDX3Lj38s/" />
          </div>

          <div className={styles.videoWrapper}>
            <InstagramPost url="https://www.instagram.com/p/DTnKuvjjtVo/" /> 
          </div>

        </div>
        
        <p className={styles.videoCaption}>
          Descubre cómo nuestros estudiantes transforman sus ideas en realidad.
        </p>
      </section>

      <section className={styles.contentSection}>
        
        <p className={styles.introText}>
          En Aluna, creemos que cada niño y joven lleva en su interior una semilla: 
          <strong> una idea, un sueño, una chispa capaz de transformar el mundo.</strong>
        </p>

        <div className={styles.highlightBox}>
          <div className={styles.iconBox}>
            <FaSeedling />
          </div>
          <p>
            Por eso nace <strong>Semillas 360</strong>, nuestro programa institucional de emprendimiento que acompaña a los estudiantes desde el primero de primaria hasta el bachillerato, cultivando en ellos la creatividad, la autonomía y la capacidad de convertir sus ideas en acción.
          </p>
        </div>

        <div className={styles.methodology}>
          <div className={styles.methodItem}>
            <FaLightbulb className={styles.icon} />
            <p>A través de experiencias significativas, talleres y proyectos reales.</p>
          </div>
          <div className={styles.methodItem}>
            <FaRocket className={styles.icon} />
            <p>Viviendo el proceso completo de soñar, crear, planear y materializar.</p>
          </div>
          <div className={styles.methodItem}>
            <FaHandsHelping className={styles.icon} />
            <p>Nuestra tradicional <strong>Feria de Emprendimiento Aluna</strong>.</p>
          </div>
        </div>

        <p className={styles.bodyText}>
          Semillas 360 no es solo un programa; es una forma de aprender, de pensar y de vivir. Formamos niños y jóvenes que creen en su potencial, que emprenden con sentido y que entienden que cada acción deja huella en su entorno.
        </p>

        <blockquote className={styles.slogan}>
          "Porque en Aluna, de la idea nace la acción, y de la acción florece el camino."
        </blockquote>

      </section>
    </div>
  );
}