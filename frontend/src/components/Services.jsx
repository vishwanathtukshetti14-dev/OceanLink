import {
  FaShip,
  FaGlobe,
  FaAnchor,
  FaBoxOpen,
  FaClipboardCheck,
  FaHeadset,
} from "react-icons/fa";

function Services() {
  return (
   <section className="services" id="services">

      <h2>Our Services</h2>

      <div className="service-cards">

        <div className="card">
          <FaShip className="icon" />
          <h3>Cargo Transport</h3>
          <p>
            Safe and reliable cargo transportation across international
            shipping routes.
          </p>
        </div>

        <div className="card">
          <FaGlobe className="icon" />
          <h3>Global Shipping</h3>
          <p>
            Worldwide shipping services connecting more than 100 countries.
          </p>
        </div>

        <div className="card">
          <FaAnchor className="icon" />
          <h3>Port Operations</h3>
          <p>
            Efficient loading, unloading and port logistics handled by experts.
          </p>
        </div>

        <div className="card">
          <FaBoxOpen className="icon" />
          <h3>Container Logistics</h3>
          <p>
            Secure container management with real-time shipment handling.
          </p>
        </div>

        <div className="card">
          <FaClipboardCheck className="icon" />
          <h3>Customs Clearance</h3>
          <p>
            Smooth customs documentation and clearance for international trade.
          </p>
        </div>

        <div className="card">
          <FaHeadset className="icon" />
          <h3>24/7 Support</h3>
          <p>
            Dedicated customer support available anytime for your shipments.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Services;