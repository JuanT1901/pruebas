import React from 'react';
import styles from 'app/styles/ponte-en-contacto/ContactSection.module.scss';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaWhatsapp,
  FaPaperPlane 
} from 'react-icons/fa';

export default function PonteEnContacto() {
  return (
    <div className={styles.container}>
      
      <header className={styles.header}>
        <span className={styles.badge}>Hablemos</span>
        <h1 className={styles.title}>Estamos aquí para ti</h1>
        <p className={styles.subtitle}>
          ¿Tienes dudas sobre el proceso de admisión o nuestro modelo educativo? 
          <br />Escríbenos, llámanos o visítanos. Queremos conocerte.
        </p>
      </header>

      <div className={styles.contentWrapper}>
        
        <div className={styles.infoColumn}>
          
          <div className={styles.infoCard}>
            <div className={`${styles.iconCircle} ${styles.blue}`}>
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3>Nuestra Sede</h3>
              <p>Carrera 11 # 6 - 63</p>
              <span className={styles.smallNote}>Sede Principal</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={`${styles.iconCircle} ${styles.green}`}>
              <FaWhatsapp />
            </div>
            <div>
              <h3>Líneas de Atención</h3>
              <p>+57 314 469 8955</p>
              <span className={styles.smallNote}>Llamadas y WhatsApp</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={`${styles.iconCircle} ${styles.orange}`}>
              <FaEnvelope />
            </div>
            <div>
              <h3>Correo Electrónico</h3>
              <p>clubaventurascreativas@gmail.com</p>
              <span className={styles.smallNote}>Respondemos en 24h hábiles</span>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={`${styles.iconCircle} ${styles.purple}`}>
              <FaClock />
            </div>
            <div>
              <h3>Horario de Atención</h3>
              <p>Lun - Vie: 7:00 AM - 3:30 PM</p>
              <p>Sábados: 8:00 AM - 12:00 PM</p>
            </div>
          </div>

        </div>
{/*
        <div className={styles.formColumn}>
          <form className={styles.contactForm}>
            <h3>Envíanos un mensaje</h3>
            
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nombre Completo</label>
              <input type="text" id="name" placeholder="Ej: Juan Pérez" />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" placeholder="tucorreo@ejemplo.com" />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phone">Teléfono</label>
                <input type="tel" id="phone" placeholder="+57 300..." />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="subject">Asunto</label>
              <select id="subject">
                <option value="">Selecciona una opción</option>
                <option value="admisiones">Información de Admisiones</option>
                <option value="academico">Duda Académica</option>
                <option value="admin">Administrativo / Pagos</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">Mensaje</label>
              <textarea id="message" rows={5} placeholder="Cuéntanos en qué podemos ayudarte..."></textarea>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Enviar Mensaje <FaPaperPlane />
            </button>
          </form>
        </div>
*/}
      </div>
    </div>
  );
}