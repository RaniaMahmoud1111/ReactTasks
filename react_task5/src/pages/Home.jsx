import { Link } from 'react-router-dom'
import MainButton from '../components/StyledComponents/MainButton'
import '../components/css/Pages.css'

const features = [
  { icon: '🔀', title: 'React Router v6',    desc: 'Nested + dynamic routing, Navigate, useNavigate' },
  { icon: '⚡', title: 'Axios + JSON Server', desc: 'Full CRUD: GET, POST, PUT, DELETE' },
  { icon: '🔍', title: 'Smart Search',        desc: 'Search by id (number), name, or price' },
  { icon: '🧩', title: 'Reusable Components', desc: 'SharedLayout, MainButton, MainLayout, CSS files' },
]

export default function Home() {
  return (
    <div className="page-container">

      <div className="hero">
        <span className="hero-badge">Lecture 5 — React Router + Axios</span>

        <h1 className="hero-title">
          Product<br />
          <span className="accent">Manager</span>
        </h1>

        <p className="hero-desc">
          A full-featured demo app covering routing, nested layouts,
          dynamic routes, API calls with Axios, and JSON Server.
        </p>

        <div className="hero-actions">
          <Link to="/products">
            <MainButton variant="primary">View Products →</MainButton>
          </Link>
          <Link to="/products/new">
            <MainButton variant="outline">Add Product</MainButton>
          </Link>
        </div>
      </div>

      <div className="features-grid">
        {features.map(f => (
          <div key={f.title} className="feature-card">
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}