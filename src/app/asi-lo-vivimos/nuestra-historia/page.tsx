import React from 'react';
import styles from 'app/styles/asi-lo-vivimos/nuestra-historia/NuestraHistoria.module.scss';
import { FaFlag, FaChild, FaSeedling, FaSchool, FaMountain, FaRocket } from 'react-icons/fa';

const historyEvents = [
  {
    year: "2016",
    title: "El inicio de la aventura",
    subtitle: "Nace Ludo Club Aventuras Creativas",
    content: "Fundado por Ángela Yohanna Castañeda. Comenzamos con 9 niños y una convicción clara: aprender puede ser una experiencia feliz, lúdica y respetuosa de cada ritmo.",
    icon: <FaFlag />,
    color: "#43A047"
  },
  {
    year: "2017",
    title: "Aprender Jugando",
    subtitle: "Educación preescolar centrada en el niño",
    content: "Iniciamos un proyecto donde el juego, la exploración y la individualidad son el centro. Cada día, el aprendizaje se vive como una aventura significativa.",
    icon: <FaChild />,
    color: "#FBC02D"
  },
  {
    year: "2018",
    title: "Sembrando Ideas",
    subtitle: "Inicia nuestro programa de emprendimiento",
    content: "Los primeros productos eran 'de mentiritas' (galletas de plastilina), permitiendo imaginar y jugar. Hito importante: Obtenemos la Resolución para Preescolar.",
    icon: <FaSeedling />,
    color: "#E65100"
  },
  {
    year: "2020",
    title: "De la idea a la realidad",
    subtitle: "Resolución para Primaria",
    content: "Nos consolidamos como un colegio significativo donde los niños y jóvenes viven el aprendizaje de manera auténtica y con propósito.",
    icon: <FaSchool />,
    color: "#3CA0E8"
  },
  {
    year: "2024",
    title: "Renacer: Gimnasio Aluna",
    subtitle: "Una transformación profunda",
    content: "Adoptamos un nuevo nombre inspirados en la cosmovisión del pueblo Kogui. Asumimos la educación como pensamiento, memoria y equilibrio entre lo material y lo espiritual.",
    icon: <FaMountain />,
    color: "#5E35B1"
  },
  {
    year: "2025",
    title: "El camino que crece",
    subtitle: "Semillas 360: Emprendimiento real",
    content: "El programa evoluciona con la creación de productos reales. Desde grado primero, los estudiantes idean, crean, planean y venden, fortaleciendo su autonomía y creatividad.",
    icon: <FaRocket />,
    color: "#D81B60"
  }
];

export default function NuestraHistoria() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.badge}>Nuestra Trayectoria</span>
        <h1 className={styles.mainTitle}>Historia de una Pasión Educativa</h1>
        <p className={styles.intro}>
          Cada año ha sido un escalón para construir el sueño que hoy es el Gimnasio Aluna.
        </p>
      </header>

      <div className={styles.timeline}>
        <div className={styles.line}></div>

        {historyEvents.map((item, index) => (
          <div key={index} className={styles.eventRow}>
            
            <div className={styles.marker} style={{ backgroundColor: item.color }}>
              <span className={styles.year}>{item.year}</span>
            </div>

            <div className={styles.content} style={{ borderTopColor: item.color }}>
              <div className={styles.iconWrapper} style={{ color: item.color }}>
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <h4>{item.subtitle}</h4>
              <p>{item.content}</p>
            </div>
            
            <div className={styles.spacer}></div>
          </div>
        ))}
      </div>
    </div>
  );
}