const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'motorswap_demo',
});

// Test Connection
app.get('/api/test', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: '✅ Database connected!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Vehicles
app.get('/api/vehicles', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT v.*, u.name as seller_name, u.email as seller_email 
      FROM vehicles v 
      LEFT JOIN users u ON v.seller_id = u.id 
      WHERE v.status = 'Available'
      ORDER BY v.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Vehicle
app.get('/api/vehicles/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT v.*, u.name as seller_name, u.phone as seller_phone 
      FROM vehicles v 
      LEFT JOIN users u ON v.seller_id = u.id 
      WHERE v.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Vehicle (No auth check - for demo)
app.post('/api/vehicles', async (req, res) => {
  try {
    const { title, price, location, condition, transmission, description, mileage, year, image_url, seller_email } = req.body;
    
    // Find or create user
    let [users] = await db.query('SELECT id FROM users WHERE email = ?', [seller_email || 'demo@motorswap.ke']);
    let seller_id;
    
    if (users.length === 0) {
      const [result] = await db.query('INSERT INTO users (email, name, location) VALUES (?, ?, ?)', [
        seller_email || 'demo@motorswap.ke', 
        'Demo User', 
        'Nairobi'
      ]);
      seller_id = result.insertId;
    } else {
      seller_id = users[0].id;
    }
    
    // Create vehicle
    const [result] = await db.query(`
      INSERT INTO vehicles (seller_id, title, price, location, condition, transmission, description, mileage, year, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [seller_id, title, price, location, condition, transmission, description, mileage, year, image_url]);
    
    res.status(201).json({ message: '✅ Vehicle created!', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Vehicle
app.delete('/api/vehicles/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM vehicles WHERE id = ?', [req.params.id]);
    res.json({ message: '✅ Vehicle deleted!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Profile (simple)
app.put('/api/profile/:email', async (req, res) => {
  try {
    const { name, phone, location } = req.body;
    await db.query('UPDATE users SET name = ?, phone = ?, location = ? WHERE email = ?', [
      name, phone, location, req.params.email
    ]);
    res.json({ message: '✅ Profile updated!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
});