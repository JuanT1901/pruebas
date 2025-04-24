// app/components/SplashScreen.tsx
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from 'app/styles/components/SplashScreen.module.scss';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // se muestra por 3 segundos

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.splash}>
      <Image
        src="/mascota.jpg"
        alt="Mascota del colegio"
        width={250}
        height={380}
        priority
      />
    </div>
  );
};

export default SplashScreen;
