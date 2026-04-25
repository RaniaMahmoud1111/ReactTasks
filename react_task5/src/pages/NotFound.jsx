import { useNavigate } from 'react-router-dom'
import MainButton from '../components/StyledComponents/MainButton'
import '../components/css/Pages.css'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <div className="not-found-code">404</div>
      <h1>Page Not Found</h1>
      <p>The route you're looking for doesn't exist.</p>
      <div className="not-found-actions">
        <MainButton onClick={() => navigate('/')} variant="primary">Go Home</MainButton>
        <MainButton onClick={() => navigate(-1)} variant="ghost">Go Back</MainButton>
      </div>
    </div>
  )
}