import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

export default function Login () {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // Clear any previous errors

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (res.status === 401) {
        setError('Invalid email. Please try again.')
        return
      }

      if (!res.ok) {
        setError('Something went wrong. Please try again later.')
        return
      }

      const data = await res.json()
      if (data.token) {
        localStorage.setItem('auth_token', data.token)
        navigate('/home') // ✅ Redirect on success
      }
    } catch (err) {
      setError('Network error. Please check your connection.')
      console.error(err)
    }
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <form onSubmit={handleSubmit} className='login-form'>
          <p
            className='login-error'
            style={{ visibility: error ? 'visible' : 'hidden' }}
          >
            {error || 'Invalid email'}
          </p>
          <div className='login-input-group'>
            <input
              className='login-input'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
            <button type='submit' className='login-button'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
