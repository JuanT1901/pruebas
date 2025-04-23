import styles from 'app/styles/components/Footer.module.scss'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo del colegio" />
        </div>
        <div className={styles.links}>
          <a href="#quieroserpartedeludoclub">Quiero se parte de Ludo Club</a>
          <a href="#asilovivimos">Así lo vivimos</a>
          <a href="#contacto">Ponte en contacto</a>
          <a href="#plataformas">Plataformas</a>
        </div>
        <div className={styles.social}>
          <a href="https://www.facebook.com/ludoclubaventurascreativas" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.instagram.com/colegio_ludoclubzipaquira/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://wa.me/573144698955" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        </div>
        <div className={styles.copy}>
          <p>&copy; {new Date().getFullYear()} Colegio Ludo Club. Todos los derechos reservados.
          Desarrollador por <a href="https://portfolio-juan-dev.netlify.app/" target='_blank'>Juan Diego Torres</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
