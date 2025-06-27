import Navbar from '../components/Navbar.jsx';
import '../styles/Contact.css';

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className='contact-content'>
        <section className='contact-header'>
          <h1>Contact</h1>
          <p>Reach out for questions, feedback, or collaboration.</p>
        </section>
        <section className='contact-details'>
          <div className='contact-card'>
            <h2>Contact Information</h2>
            <p>
              <strong>Email:</strong>{' '}
              <a href='mailto:paskalevslavi@gmail.com'>paskalevslavi@gmail.com</a>
            </p>
            <p>
              <strong>GitHub:</strong>{' '}
              <a href='https://github.com/sppaskal' target='_blank' rel='noopener noreferrer'>
                github.com/sppaskal
              </a>
            </p>
            <p>
              <strong>LinkedIn:</strong>{' '}
              <a
                href='https://www.linkedin.com/in/slavi-paskalev-a00b4b100/'
                target='_blank'
                rel='noopener noreferrer'
              >
                linkedin.com/in/slavi-paskalev-a00b4b100/
              </a>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}