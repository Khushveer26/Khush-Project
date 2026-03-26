// =============================================
//  server.js - Node.js / Express Backend
// =============================================

const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const path       = require('path');
const db         = require('./db');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── CORS — accept requests from file://, localhost, and GitHub Pages ──
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g. curl, Postman, file://)
        if (!origin) return callback(null, true);
        const allowed = [
            /^http:\/\/localhost/,
            /^http:\/\/127\.0\.0\.1/,
            /^null$/,                         // file:// opens with null origin
            /^https:\/\/.*\.github\.io$/      // GitHub Pages
        ];
        if (allowed.some(r => r.test(origin))) {
            callback(null, true);
        } else {
            callback(null, true);             // allow all for local dev
        }
    },
    methods : ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));

// ── Body Parsers ─────────────────────────────
app.use(bodyParser.json());
app.use(express.json());

// ── Serve Frontend Statically ─────────────────
//    Visit http://localhost:5000  → opens index.html
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));
console.log(`📂  Serving frontend from: ${frontendPath}`);

// ── Root Route (health check) ────────────────
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: '🚀 Portfolio backend is running!' });
});

// ── POST /contact ────────────────────────────
//  Receives: { name, email, message }
//  Inserts into MySQL `contacts` table
//  Returns: { message: "Message sent successfully!" }
// ─────────────────────────────────────────────
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // ── Input Validation (White Box) ──────────
    if (!name || !email || !message) {
        return res.status(400).json({
            error: 'All fields (name, email, message) are required.'
        });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    // Length guards
    if (name.length > 100) {
        return res.status(400).json({ error: 'Name must be 100 characters or fewer.' });
    }
    if (email.length > 150) {
        return res.status(400).json({ error: 'Email must be 150 characters or fewer.' });
    }

    // ── Database Insert ───────────────────────
    try {
        const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
        const [result] = await db.execute(sql, [name, email, message]);

        console.log(`📩  New contact saved | ID: ${result.insertId} | from: ${email}`);

        return res.status(200).json({ message: 'Message sent successfully!' });

    } catch (err) {
        console.error('❌  Database error:', err.message);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// ── GET /contacts  (view all submissions) ────
app.get('/contacts', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM contacts ORDER BY created_at DESC');
        return res.status(200).json(rows);
    } catch (err) {
        console.error('❌  Error fetching contacts:', err.message);
        return res.status(500).json({ error: 'Server error.' });
    }
});

// ── Start Server ──────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀  Portfolio backend running at http://localhost:${PORT}`);
    console.log(`   POST endpoint: http://localhost:${PORT}/contact\n`);
});
