import React from 'react';
import styles from 'app/styles/asi-lo-vivimos/nuestro-modelo/NuestroModelo.module.scss';
import { 
  FaShapes, 
  FaUserAstronaut, 
  FaChalkboardTeacher, 
  FaBrain, 
  FaBookReader, 
  FaHands, 
  FaHeart 
} from 'react-icons/fa';

const pillars = [
  {
    title: "Modelo y Enfoque Pedagógico",
    content: "En Gimnasio Aluna creemos que aprender no es repetir, sino construir. Por eso orientamos nuestro quehacer desde el modelo constructivista, entendiendo la educación como un proceso activo, reflexivo y profundamente humano.",
    icon: <FaShapes />,
    color: "#E65100"
  },
  {
    title: "Aprender es Construir",
    content: "El estudiante es el protagonista de su aprendizaje. Aprender implica explorar, arriesgarse, equivocarse y volver a intentar. Cada error es entendido como una oportunidad creativa y un paso necesario para el crecimiento.",
    icon: <FaUserAstronaut />,
    color: "#2E7D32"
  },
  {
    title: "El Rol del Docente",
    content: "Nuestros docentes son guías y acompañantes del proceso. Observan, investigan, reflexionan sobre su práctica y crean ambientes donde la voz del estudiante es escuchada, valorada y respetada.",
    icon: <FaChalkboardTeacher />,
    color: "#0277BD"
  },
  {
    title: "Cómo Entendemos el Aprendizaje",
    content: "Es personal, interno y significativo. Se construye en interacción con otros de manera social y cooperativa. Depende del desarrollo cognitivo, emocional y social. Se fortalece cuando existe diálogo entre lo que se sabe y lo que se está descubriendo.",
    icon: <FaBrain />,
    color: "#7B1FA2"
  },
  {
    title: "Nuestros Referentes",
    content: "Nos nutrimos de Jean Piaget (etapas del desarrollo), David Ausubel (aprendizaje significativo), Lev Vygotsky (interacción social) y principios de María Montessori para enriquecer los ambientes y promover la autonomía.",
    icon: <FaBookReader />,
    color: "#689F38"
  },
  {
    title: "Aprender Haciendo",
    content: "Trabajamos desde una pedagogía activa. El juego, la exploración y la experiencia son ejes fundamentales. No buscamos estandarizar, sino respetar los ritmos e intereses individuales, permitiendo que cada estudiante crezca sin perder su esencia.",
    icon: <FaHands />,
    color: "#F57C00"
  },
  {
    title: "Nuestra Intención",
    content: "Formar personas felices, éticas y conscientes, capaces de adaptarse a un mundo cambiante, de aprender durante toda la vida y de construir su propio camino con sentido, equilibrio y humanidad.",
    icon: <FaHeart />,
    color: "#1B5E20"
  }
];

export default function NuestroModelo() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.badge}>Constructivismo y Humanidad</span>
        <h1 className={styles.title}>Nuestra Esencia Pedagógica</h1>
        <p className={styles.subtitle}>
          Siete pilares que sostienen nuestra forma de ver la educación y el mundo.
        </p>
      </header>

      <div className={styles.grid}>
        {pillars.map((pillar, index) => (
          <article 
            key={index} 
            className={styles.card}
            style={{ '--card-color': pillar.color } as React.CSSProperties}
          >
            <div className={styles.iconCircle}>
              {pillar.icon}
            </div>
            <h2 className={styles.cardTitle}>{pillar.title}</h2>
            <div className={styles.divider}></div>
            <p className={styles.cardContent}>{pillar.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}