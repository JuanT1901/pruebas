'use client';

import React, { useState } from "react";
import styles from "app/styles/components/Navbar.module.scss";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <a className={styles.imageContainer} href="/">
          <Image
            src="/logo.png"
            width={90}
            height={50}
            alt="logo ludo club"
          />
        </a>
        <button className={styles.toggle} onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`${styles.menu} ${isOpen ? styles.active : styles.closed}`}>
          <li><a href="#inicio">Quiero ser parte de Ludo Club</a></li>
          <li><a href="#nosotros">Así lo vivimos</a></li>
          <li><a href="#oferta">Ponte en contacto</a></li>
          <li><a href="#contacto">Plataformas</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
