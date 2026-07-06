import { FaPhone } from "react-icons/fa";

function Contact({
  name,
  setName,
  email,
  setEmail,
  userMessage,
  setUserMessage,
  handleSubmit,
}) {
  return (
    <section className="contact" id="contact">
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          rows="5"
          placeholder="Enter Your Message"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        ></textarea>

        <button type="submit">Send Message</button>
      </form>

      <br />

      <p>
        <FaPhone /> +91 8928884701
      </p>

      <p>Email: vishwanathtukshetti14@gmail.com</p>
    </section>
  );
}

export default Contact;