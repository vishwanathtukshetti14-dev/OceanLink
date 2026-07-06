import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import "../App.css";

function Dashboard() {

  const navigate = useNavigate();

  // ======================
  // User
  // ======================

  const [user, setUser] = useState(null);

  // ======================
  // Contacts
  // ======================

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  // ======================
  // Shipments
  // ======================

  const [shipments, setShipments] = useState([]);

  const [shipmentId, setShipmentId] = useState("");
  const [containerNo, setContainerNo] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("");
  const [expectedDelivery, setExpectedDelivery] = useState("");
    // ======================
  // Fetch Contacts
  // ======================
  const fetchContacts = async () => {
    try {
      const response = await fetch("https://oceanlink-backend.onrender.com/api/contacts");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ======================
  // Fetch Shipments
  // ======================
  const fetchShipments = async () => {
    try {
      const response = await fetch("https://oceanlink-backend.onrender.com/api/shipments");
      const data = await response.json();
      setShipments(data);
    } catch (error) {
      console.error(error);
    }
  };

  // ======================
  // Delete Contact
  // ======================
  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    try {
      await fetch(`https://oceanlink-backend.onrender.com/api/contact/${id}`, {
        method: "DELETE",
      });

      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };

  // ======================
  // Delete Shipment
  // ======================
  const deleteShipment = async (id) => {
    if (!window.confirm("Delete this shipment?")) return;

    try {
      await fetch(`https://oceanlink-backend.onrender.com/api/shipment/${id}`, {
        method: "DELETE",
      });

      fetchShipments();
    } catch (error) {
      console.error(error);
    }
  };

  // ======================
  // Logout
  // ======================
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // ======================
  // Add Shipment
  // ======================
  const handleShipmentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://oceanlink-backend.onrender.com/api/shipment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipmentId,
          containerNo,
          origin,
          destination,
          status,
          expectedDelivery,
        }),
      });

      const data = await response.json();

      alert(data.message);

      setShipmentId("");
      setContainerNo("");
      setOrigin("");
      setDestination("");
      setStatus("");
      setExpectedDelivery("");

      fetchShipments();

    } catch (error) {
      console.error(error);
    }
  };

  // ======================
  // Load Data
  // ======================
  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);

    fetchContacts();
    fetchShipments();

  }, [navigate]);
    return (
    <div className="dashboard">
      <div className="dashboard-card">

        {/* ================= Header ================= */}

        <div className="dashboard-header">

          <img
            src={
              user?.photoURL ||
              "https://ui-avatars.com/api/?name=OceanLink&background=0D8ABC&color=fff"
            }
            alt="Profile"
            className="profile-image"
          />

          <h1>🚢 OceanLink Dashboard</h1>

          <h2>
            Welcome, {user?.displayName || "Admin"} 👋
          </h2>
          <p className="dashboard-subtitle">
    Marine Logistics Management System
</p>

          <p>{user?.email}</p>

        </div>

        {/* ================= Stats ================= */}

        <div className="dashboard-stats">

          <div className="stat-card">
    <h3>📩 {contacts.length}</h3>
    <p>Total Messages</p>
</div>

         <div className="stat-card">
    <h3>🚢 {shipments.length}</h3>
    <p>Total Shipments</p>
</div>

        <div className="stat-card">
    <h3>📦 10K+</h3>
    <p>Deliveries</p>
</div>

          <div className="stat-card">
    <h3>🛟 24/7</h3>
    <p>Support</p>
</div>
        </div>

        {/* ================= Shipment Form ================= */}

        <h2 className="message-title">
          Add Shipment
        </h2>

        <form
          className="shipment-form"
          onSubmit={handleShipmentSubmit}
        >

          <input
            type="text"
            placeholder="Shipment ID"
            value={shipmentId}
            onChange={(e) => setShipmentId(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Container Number"
            value={containerNo}
            onChange={(e) => setContainerNo(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />

          <input
            type="date"
            value={expectedDelivery}
            onChange={(e) => setExpectedDelivery(e.target.value)}
            required
          />

          <button
            className="login-button"
            type="submit"
          >
            Add Shipment
          </button>

        </form>

        {/* ================= Contact Section ================= */}

        <h2 className="message-title">
          Contact Messages
        </h2>

        <input
          type="text"
          placeholder="🔍 Search Name, Email or Message..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
                {/* ================= Contact Table ================= */}

        <table className="contact-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {contacts
              .filter((contact) => {
                return (
                  contact.name.toLowerCase().includes(search.toLowerCase()) ||
                  contact.email.toLowerCase().includes(search.toLowerCase()) ||
                  contact.message.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((contact) => (
                <tr key={contact.id}>

                  <td>{contact.name}</td>

                  <td>{contact.email}</td>

                  <td>{contact.message}</td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() => deleteContact(contact.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

          </tbody>

        </table>

        {/* ================= Shipment Table ================= */}

        <h2 className="message-title">
          Shipment List
        </h2>

        <table className="contact-table">

          <thead>
            <tr>
              <th>Shipment ID</th>
              <th>Container</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Delivery</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {shipments.map((shipment) => (

              <tr key={shipment.id}>

                <td>{shipment.shipmentId}</td>

                <td>{shipment.containerNo}</td>

                <td>{shipment.origin}</td>

                <td>{shipment.destination}</td>

                <td>{shipment.status}</td>

                <td>{shipment.expectedDelivery}</td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() => deleteShipment(shipment.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
        <p style={{
    marginTop:"25px",
    color:"#bbb",
    fontSize:"14px"
}}>
    OceanLink v1.0 © 2026
</p>

      </div>
    </div>
  );
}

export default Dashboard;