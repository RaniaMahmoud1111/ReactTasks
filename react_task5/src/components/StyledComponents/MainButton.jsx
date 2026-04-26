import  mainbutton from   '../css/Mainbutton.css'

/**
 * MainButton — reusable button component
 * variant: 'primary' | 'danger' | 'success' | 'ghost' | 'outline'
 */
export default function MainButton({
  children,
  onClick,
  variant = 'style.primary',
  type = 'button',
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  )
}