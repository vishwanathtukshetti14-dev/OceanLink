import { useState } from "react";
import "../styles/tracking.css";

function Tracking() {

  const [shipmentId, setShipmentId] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {

    setError("");
    setShipment(null);

    try {

      const response = await fetch(
        `https://oceanlink-backend.onrender.com/api/shipment/${shipmentId}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setShipment(data);

    } catch (err) {
      setError("Server Error");
    }

  };

  return (

   <div className="tracking-container">

  <div className="tracking-card">

    <h1 className="tracking-title">
      🚢 Track Shipment
    </h1>
        <input
          type="text"
          placeholder="Enter Shipment ID"
          value={shipmentId}
          onChange={(e) => setShipmentId(e.target.value)}
          className="search-box"
        />

        <br /><br />

        <button
          className="login-button"
          onClick={handleTrack}
        >
          Track Shipment
        </button>

        <br /><br />

        {error && (
          <h3 style={{ color: "red" }}>
            {error}
          </h3>
        )}

        {shipment && (

          <div className="shipment-card">

            <h2>Shipment Details</h2>

            <p><b>Shipment ID:</b> {shipment.shipmentId}</p>

            <p><b>Container:</b> {shipment.containerNo}</p>

            <p><b>Origin:</b> {shipment.origin}</p>

            <p><b>Destination:</b> {shipment.destination}</p>

            <p>
  <b>Status:</b>

  <span
    className={
      shipment.status === "Delivered"
        ? "status-badge status-delivered"
        : shipment.status === "Pending"
        ? "status-badge status-pending"
        : "status-badge status-transit"
    }
  >
    {shipment.status}
  </span>
</p>

            <p>
  <b>Expected Delivery:</b>{" "}
  {new Date(shipment.expectedDelivery).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}
</p>

          </div>

        )}

      </div>

    </div>

  );

}

export default Tracking;