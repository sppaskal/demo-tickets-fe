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
          <img src='https://source.unsplash.com/featured/?concert' alt='Concert' />
          <img src='https://source.unsplash.com/featured/?sports' alt='Sports' />
          <img src='https://source.unsplash.com/featured/?theater' alt='Theater' />
        </section>
      </main>
    </>
  )
}
