import { useState } from "react";

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className="page inner-page contact-page">
      <div className="section-heading">
        <span className="eyebrow">CONTACT</span>
        <h1>Let's connect & <span className="gradient-text">build</span>.</h1>
        <p>Have a project idea, feedback or just want to say hello? Send me a message.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="glass-card contact-card">
            <span className="card-number">01</span>
            <h2>Find me online</h2>
            <a href="mailto:selvarasuyuvaraj057@gmail.com" className="contact-link">
              <span>✉</span><div><small>EMAIL</small><strong>selvarasuyuvaraj057@gmail.com</strong></div>
            </a>
            <a href="https://github.com/yuvaraj057" target="_blank" rel="noreferrer" className="contact-link">
              <span>◉</span><div><small>GITHUB</small><strong>github.com/yuvaraj057</strong></div>
            </a>
            <a href="https://www.linkedin.com/in/yuvaraj-selvarasu-a9b228386" target="_blank" rel="noreferrer" className="contact-link">
              <span>in</span><div><small>LINKEDIN</small><strong>Yuvaraj Selvarasu</strong></div>
            </a>
          </div>
        </div>

        <div className="form-panel">
          <span className="card-number">02</span>
          <h2>Send a message</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" required />
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="6" placeholder="Tell me about your idea..." required />
            <button className="primary-btn form-button" type="submit">Send Message <span>→</span></button>
            {sent && <p className="success-message">Thanks! Your message is ready to be connected to a backend/email service.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
