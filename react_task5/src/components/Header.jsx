import { Link, useLocation } from 'react-router-dom'
import  styles from './css/Header.css'
export default function Header() {
  const { pathname } = useLocation()

  const navLinks = [
    { to: '/',        label: 'Home' },
    { to: '/products', label: 'Products' },
  ]
  return (
    <header className={styles.header}>
      <div className={styles['header-inner']}>

        <Link to="/" className={styles.logo}>
          <span className={styles['logo-bracket']}>[</span>
          STORE
          <span className={styles['logo-bracket']}>]</span>
        </Link>

        <nav className={styles['nav']}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${pathname === to ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
          <Link to="/products/new" className={styles['nav-cta']}>
            + New Product
          </Link>
        </nav>

      </div>
    </header>
  )
}