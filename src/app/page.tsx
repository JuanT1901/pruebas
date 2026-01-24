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
              
        <aside className={styles.sidebar}>
          <MainCards />
        </aside>

        <section className={styles.feed}>
          <p className={styles.title}>Nuestras historias</p>
          <InstagramPost url="https://www.instagram.com/reel/DCvCdZWh2S9/"/>
          <InstagramPost url="https://www.instagram.com/reel/DCpq1_tMu6Q/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="/>
        </section>

      </div>
    </div>
  );
}