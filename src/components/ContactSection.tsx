'use client'

import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import styles from 'app/styles/ponte-en-contacto/ContactSection.module.scss';
import { FaPhone } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.icon}>
        <FaPhone />
      </div>
      <h2>Ponte en contacto</h2>
      <p>Estamos disponibles para resolver tus dudas o brindarte más información. Elige tu canal preferido:</p>

      <div className={styles.contactGrid}>
        <div className={styles.socialLinks}>
          <a href="https://wa.me/573144698955" target="_blank" rel="noopener noreferrer" className={styles.contactCard} style={{ backgroundColor: '#25D366' }}>
            <FaWhatsapp className={styles.icon} />
            <span>Escríbenos por WhatsApp</span>
          </a>
          <a href="https://www.instagram.com/colegio_ludoclubzipaquira/" target="_blank" rel="noopener noreferrer" className={styles.contactCard} style={{ backgroundColor: '#E1306C' }}>
            <FaInstagram className={styles.icon} />
            <span>Síguenos en Instagram</span>
          </a>
          <a href="https://www.facebook.com/ludoclubaventurascreativas" target="_blank" rel="noopener noreferrer" className={styles.contactCard} style={{ backgroundColor: '#3b5998' }}>
            <FaFacebook className={styles.icon} />
            <span>Encuéntranos en Facebook</span>
          </a>
        </div>

        <form className={styles.contactForm}>
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Correo electrónico" required />
          <textarea placeholder="Escribe tu mensaje..." rows={5} required />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
