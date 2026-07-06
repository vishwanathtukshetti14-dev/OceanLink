function StatsCards({ totalContacts, totalShipments }) {
  return (
    <div className="dashboard-stats">

      <div className="stat-card">
        <h3>{totalContacts}</h3>
        <p>Total Messages</p>
      </div>

      <div className="stat-card">
        <h3>{totalShipments}</h3>
        <p>Shipments</p>
      </div>

      <div className="stat-card">
        <h3>10K+</h3>
        <p>Deliveries</p>
      </div>

      <div className="stat-card">
        <h3>24/7</h3>
        <p>Support</p>
      </div>

    </div>
  );
}

export default StatsCards;