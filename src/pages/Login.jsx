import { useState } from 'react'
import '../styles/Login.css'

export default function Login () {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })

    const data = await res.json()
    if (data.token) {
      localStorage.setItem('auth_token', data.token)
      console.log('Login successful!')
    } else {
      console.log('Login failed')
    }
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <form className='login-form' onSubmit={handleSubmit}>
          <input
            className='login-input'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
          <button className='login-button' type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
