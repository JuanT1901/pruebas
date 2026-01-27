import React from 'react';
import styles from 'app/styles/asi-lo-vivimos/nuestra-filosofia/NuestraFilosofia.module.scss';
import { FaCompass, FaBinoculars, FaHandsHelping, FaLightbulb, FaSmileBeam, FaDove } from 'react-icons/fa';

export default function NuestraFilosofia() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.badge}>Horizonte Institucional</span>
        <h1 className={styles.title}>Nuestra Brújula y Destino</h1>
        <p className={styles.subtitle}>
          Principios que guían nuestro caminar y el sueño que construimos día a día para nuestros niños.
        </p>
      </header>

      <section className={styles.horizonSection}>
        
        <div className={`${styles.card} ${styles.mission}`}>
          <div className={styles.iconWrapper}>
            <FaCompass />
          </div>
          <div className={styles.cardContent}>
            <h2>Misión</h2>
            <p>
              El <strong>Gimnasio Aluna</strong> es una institución de educación no tradicional orientada por principios católicos para el desarrollo integral de los niños y niñas desde los 3 años de edad.
              <br /><br />
              A través de su <strong>modelo constructivista</strong> y la adquisición de saberes mediante el juego, garantizamos una educación renovada capaz de generar en sus estudiantes el deseo y el gusto por aprender de manera feliz, agradable y con mayor significado. Sobre la base de estas consideraciones, educamos a niños y niñas para que sean seres creativos, que experimenten y descubran su mundo actuando de manera justa, culta y solidaria.
            </p>
          </div>
        </div>

        <div className={`${styles.card} ${styles.vision}`}>
          <div className={styles.iconWrapper}>
            <FaBinoculars />
          </div>
          <div className={styles.cardContent}>
            <h2>Visión 2028</h2>
            <p>
              Hacia el año <strong>2028</strong>, el <strong>Gimnasio Aluna</strong> se consolidará como referente de calidad y renovación educativa.
              <br /><br />
              Nuestros niños y niñas egresados se caracterizarán por sus valores católicos, humanos y sociales, así como por la capacidad para investigar, crear, proponer y transformar su entorno próximo con alegría y amor.
            </p>
          </div>
        </div>

      </section>

      <section className={styles.valuesSection}>
        <h3 className={styles.valuesTitle}>Valores que nos definen</h3>
        <div className={styles.valuesGrid}>
          
          <div className={styles.valueItem}>
            <FaLightbulb className={styles.valIcon} style={{color: '#FBC02D'}} />
            <h4>Creatividad</h4>
            <p>Capacidad para crear, proponer y transformar el entorno.</p>
          </div>

          <div className={styles.valueItem}>
            <FaHandsHelping className={styles.valIcon} style={{color: '#43A047'}} />
            <h4>Solidaridad</h4>
            <p>Actuar de manera justa, culta y solidaria con el otro.</p>
          </div>

          <div className={styles.valueItem}>
            <FaSmileBeam className={styles.valIcon} style={{color: '#E65100'}} />
            <h4>Felicidad</h4>
            <p>El aprendizaje debe vivirse de manera feliz y agradable.</p>
          </div>

          <div className={styles.valueItem}>
            <FaDove className={styles.valIcon} style={{color: '#3CA0E8'}} />
            <h4>Fe y Humanidad</h4>
            <p>Formación orientada por principios católicos y humanos.</p>
          </div>

        </div>
      </section>
    </div>
  );
}