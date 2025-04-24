'use client';

import React, { useState } from "react";
import styles from "app/styles/components/Navbar.module.scss";
import Image from "next/image";
import Link from "next/link"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/">
          <Image
            className={styles.imageContainer}
            src="/logo.png"
            width={90}
            height={50}
            alt="logo ludo club"
          />
        </Link>
        
        <button className={styles.toggle} onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`${styles.menu} ${isOpen ? styles.active : styles.closed}`}>
          <li><a href="quiero-ser-parte">Quiero ser parte de Ludo Club</a></li>
          <li><a href="asi-lo-vivimos">Así lo vivimos</a></li>
          <li><a href="ponte-en-contacto">Ponte en contacto</a></li>
          <li><a href="plataformas">Plataformas</a></li>
          <li><a href="https://www.psepagos.co/PSEHostingUI/ShowTicketOffice.aspx?ID=8608">Pagos</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
