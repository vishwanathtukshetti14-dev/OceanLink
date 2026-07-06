const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// SQLite Database Connection
// ===============================
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ SQLite Connected");

    db.run(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS shipments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shipmentId TEXT NOT NULL,
    containerNo TEXT NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    status TEXT NOT NULL,
    expectedDelivery TEXT NOT NULL
  )
`);
  }
});

// ===============================
// Hero Message API
// ===============================
app.get("/api/message", (req, res) => {
  res.json({
    message: "Safe, Reliable & Efficient Cargo Transportation Across The Globe."
  });
});

// ===============================
// Save Contact Form
// ===============================
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Please fill all fields."
    });
  }

  db.run(
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Failed to save message."
        });
      }

      res.json({
        message: "✅ Message sent successfully!"
      });
    }
  );
});

// ===============================
// Get All Contacts
// ===============================
app.get("/api/contacts", (req, res) => {
  db.all(
    "SELECT * FROM contacts ORDER BY id DESC",
    [],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Failed to fetch contacts."
        });
      }

      res.json(rows);
    }
  );
});

// ===============================
// Delete Contact
// ===============================
app.delete("/api/contact/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM contacts WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Delete failed."
        });
      }

      res.json({
        message: "✅ Contact deleted successfully!"
      });
    }
  );
});

// ===============================
// Save Shipment
// ===============================
app.post("/api/shipment", (req, res) => {
  const {
    shipmentId,
    containerNo,
    origin,
    destination,
    status,
    expectedDelivery,
  } = req.body;

  if (
    !shipmentId ||
    !containerNo ||
    !origin ||
    !destination ||
    !status ||
    !expectedDelivery
  ) {
    return res.status(400).json({
      message: "Please fill all shipment fields.",
    });
  }

  db.run(
    `INSERT INTO shipments
    (shipmentId, containerNo, origin, destination, status, expectedDelivery)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      shipmentId,
      containerNo,
      origin,
      destination,
      status,
      expectedDelivery,
    ],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Failed to save shipment.",
        });
      }

      res.json({
        message: "✅ Shipment added successfully!",
      });
    }
  );
});

// ===============================
// Delete Shipment
// ===============================
app.delete("/api/shipment/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM shipments WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Delete failed.",
        });
      }

      res.json({
        message: "✅ Shipment deleted successfully!",
      });
    }
  );
});

// ===============================
// Track Shipment
// ===============================
app.get("/api/track/:shipmentId", (req, res) => {
  const { shipmentId } = req.params;

  db.get(
    "SELECT * FROM shipments WHERE shipmentId = ?",
    [shipmentId],
    (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Server Error",
        });
      }

      if (!row) {
        return res.status(404).json({
          message: "Shipment Not Found",
        });
      }

      res.json(row);
    }
  );
});

// ===============================
// Get All Shipments
// ===============================
app.get("/api/shipments", (req, res) => {
  db.all(
    "SELECT * FROM shipments ORDER BY id DESC",
    [],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Failed to fetch shipments.",
        });
      }

      res.json(rows);
    }
  );
});

// ===============================
// Track Shipment
// ===============================

app.get("/api/shipment/:shipmentId", (req, res) => {

  const shipmentId = req.params.shipmentId;

  db.get(
    "SELECT * FROM shipments WHERE shipmentId = ?",
    [shipmentId],
    (err, row) => {

      if (err) {
        return res.status(500).json({
          message: "Database Error"
        });
      }

      if (!row) {
        return res.status(404).json({
          message: "Shipment Not Found"
        });
      }

      res.json(row);

    }
  );

});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 OceanLink Backend Running on Port ${PORT}`);
});