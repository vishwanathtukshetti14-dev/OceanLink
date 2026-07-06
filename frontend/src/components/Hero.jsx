import { useNavigate } from "react-router-dom";
import "../App.css";

function Hero({ message }) {

  const navigate = useNavigate();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hero">

      <div className="hero-content">

        <h1>Global Marine Shipping Solutions</h1>

        <p>{message}</p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={scrollToContact}
          >
            Contact Us
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/tracking")}
          >
            Track Shipment
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;