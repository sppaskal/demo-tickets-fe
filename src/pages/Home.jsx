import Navbar from '../components/Navbar.jsx'
import '../styles/Home.css'

export default function Home () {
  return (
    <>
      <Navbar />

      <main className='home-content'>
        <section className='hero-section'>
          <h1>Experience Events Like Never Before</h1>
          <p>Browse events, pick your seat, and get your ticket instantly.</p>
        </section>

        <section className='events-gallery'>
          <img src='https://i.imgur.com/45rqlqE.jpg' alt='Concert' />
          <img src='https://i.imgur.com/5cT9h9V.jpg' alt='Sports' />
          <img src='https://i.imgur.com/wXiUln5.jpg' alt='Theater' />
        </section>
      </main>
    </>
  )
}
