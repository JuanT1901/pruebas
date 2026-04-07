'use client'

import { useEffect, useState } from 'react';
import styles from 'app/styles/components/WhatsappButton.module.scss';
import { FaWhatsapp } from 'react-icons/fa';
import { usePathname } from 'next/navigation'

export default function WhatsappButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const showDelay = setTimeout(() => setShowTooltip(true), 3000); 
    const hideDelay = setTimeout(() => setShowTooltip(false), 7000);

    return () => {
      clearTimeout(showDelay);
      clearTimeout(hideDelay);
    };
  }, []);

  if (pathname && pathname.startsWith('/plataformas')) {
    return null;
  }

  if (pathname.includes('/impresion')) {
    return null
  }

  return (
    <div className={styles.container}>
      {showTooltip && <div className={styles.tooltip}>¡Aquí podemos resolver tus dudas!</div>}
      <a
        href="https://wa.me/573144698955"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappButton}
      >
        <FaWhatsapp className={styles.icon} />
      </a>
    </div>
  );
}
