export default function Home () {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Home Page 🎉</h1>
      <p style={styles.text}>You're successfully logged in.</p>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif'
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem'
  },
  text: {
    fontSize: '1.25rem',
    color: '#555'
  }
}
