
import styles from './css/Footer.css';
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Store App — React Router + Axios + JSON Server</p>
    </footer>
  )
}