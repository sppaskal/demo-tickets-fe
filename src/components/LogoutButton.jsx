import '../styles/LogoutButton.css'

export default function LogoutButton () {
  return (
    <button
      type='button'
      className='logout-button'
      onClick={() => {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }}
    >
      Logout
    </button>
  )
}