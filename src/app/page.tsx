import Carousel from "app/components/Carousel";
import InstagramPost from "app/components/InstagramPost";
import MainCards from "app/components/MainCards";
import SplashScreen from "app/components/SplashScreen";
import styles from "app/styles/components/Page.module.scss"

export default function Home() {
  return (
    <div>
      <SplashScreen />
      <Carousel />
      
      <div className={styles.layoutGrid}>
        
        <MainCards /> 

        <section className={styles.feed}>
          <p className={styles.title}>Testimonios</p>

          <p className={styles.description}>
            En el Gimnasio Aluna, son las familias y los propios estudiantes quienes mejor cuentan nuestra historia. A través de sus experiencias y testimonios, nos invitan a creer en un modelo pedagógico que pone a la persona en el centro, que acompaña con sentido y que transforma la manera de aprender y vivir la educación. Sus voces reflejan por qué Aluna es una elección consciente y una experiencia educativa que deja huella.
          </p>
          
          <div className={styles.videoGrid}>
            <InstagramPost url="https://www.instagram.com/reel/DCksaTEM6ck/"/>
            <InstagramPost url="https://www.instagram.com/reel/DCpq1_tMu6Q/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="/>
            <InstagramPost url="https://www.instagram.com/reel/DCvCdZWh2S9/"/> 
          </div>

        </section>

      </div>
    </div>
  );
}