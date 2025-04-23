'use client'

import styles from 'app/styles/components/WhatsappButton.module.scss'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/573144698955"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
    >
      <FaWhatsapp className={styles.icon} />
    </a>
  )
}
