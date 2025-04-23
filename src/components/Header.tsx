'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <nav className="navbar">
        {/* <div className="navbar-container">
          <Link href="/" className="navbar-logo">
            Colegio Ejemplar
          </Link>
          <ul className="navbar-links">
            <li>
              <Link href="#nosotros">Nosotros</Link>
            </li>
            <li>
              <Link href="#propuesta">Propuesta Educativa</Link>
            </li>
            <li>
              <Link href="#contacto">Contacto</Link>
            </li>
            <li>
              <Link href="/login" className="login-button">
                Plataforma
              </Link>
            </li>
          </ul>
        </div> */}
      </nav>
    </header>
  );
}
