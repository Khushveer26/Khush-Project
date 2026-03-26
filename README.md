# 🚀 Full-Stack Portfolio Website

A complete portfolio website built with **HTML / CSS / JavaScript** on the frontend and **Node.js + Express + MySQL** on the backend.

---

## 📁 Project Structure

```
portfolio-project/
│
├── frontend/
│   ├── index.html      ← Main page (all sections)
│   ├── style.css       ← Modern dark-theme styles
│   └── script.js       ← Form logic + Fetch API
│
├── backend/
│   ├── server.js       ← Express server (port 5000)
│   ├── db.js           ← MySQL connection pool
│   └── package.json    ← npm dependencies
│
├── database.sql        ← DB + table setup script
└── README.md           ← This file
```

---

## ⚙️ Setup Instructions

### Step 1 — Set Up MySQL Database

Open your MySQL client and run:

```bash
mysql -u root -p < database.sql
```

Or paste this manually in MySQL Workbench / CLI:

```sql
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;
CREATE TABLE IF NOT EXISTS contacts (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    message    TEXT         NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Step 2 — Configure Database Password

Open `backend/db.js` and replace `YOUR_PASSWORD` with your MySQL root password:

```js
password : 'YOUR_PASSWORD',   // ← change this
```

---

### Step 3 — Install Backend Dependencies

```bash
cd backend
npm install
```

Dependencies installed:
- `express` — web framework
- `mysql2`  — MySQL driver
- `cors`    — cross-origin requests
- `body-parser` — JSON parsing

---

### Step 4 — Start the Backend Server

```bash
node server.js
```

You should see:
```
✅  Connected to MySQL database: portfolio_db
🚀  Portfolio backend running at http://localhost:5000
   POST endpoint: http://localhost:5000/contact
```

---

### Step 5 — Open the Frontend

Simply open `frontend/index.html` in your browser:
- Double-click the file, OR
- For GitHub Pages: push the `frontend/` folder and enable Pages

---

## 🔗 API Reference

| Method | Endpoint   | Description              |
|--------|------------|--------------------------|
| GET    | `/`        | Health check             |
| POST   | `/contact` | Submit contact form data |
| GET    | `/contacts`| View all submissions     |

### POST `/contact` — Request Body

```json
{
  "name":    "Kushal Choudhary",
  "email":   "kushal@example.com",
  "message": "Hello! I'd love to connect."
}
```

### Success Response

```json
{ "message": "Message sent successfully!" }
```

---

## 🔄 Data Flow

```
User fills form
      ↓
JavaScript validates input (client-side)
      ↓
fetch() → POST http://localhost:5000/contact
      ↓
Express receives JSON body
      ↓
Validates fields (server-side)
      ↓
MySQL INSERT INTO contacts (name, email, message)
      ↓
Returns { message: "Message sent successfully!" }
      ↓
JavaScript displays success message on UI
```

---

## 🧪 Testing Coverage

| Test Type        | What is tested                                  |
|------------------|-------------------------------------------------|
| Unit             | `validateName`, `validateEmail`, `validateMessage` functions |
| Integration      | Frontend ↔ Backend fetch communication          |
| Functional       | Full form submission end-to-end                 |
| Black Box        | Input/output without knowing internals          |
| White Box        | Backend SQL logic + server-side validation      |

Test validators manually in browser DevTools console:
```js
validateName('')          // { valid: false, msg: 'Name is required.' }
validateEmail('bad')      // { valid: false, msg: 'Please enter a valid email...' }
validateMessage('hi')     // { valid: false, msg: 'Message must be at least 10 chars.' }
validateName('Kushal')    // { valid: true,  msg: '✓ Looks good!' }
```

---

## 🌐 Hosting Guide

| Part     | Option         | Notes                              |
|----------|----------------|------------------------------------|
| Frontend | GitHub Pages   | Push `frontend/` folder            |
| Backend  | Localhost:5000 | `node server.js` on your machine   |
| Backend  | Render / Railway | Free Node.js hosting alternatives |

---

## 🛠 Tech Stack

- **Frontend** — HTML5, CSS3, Vanilla JavaScript
- **Backend**  — Node.js, Express.js
- **Database** — MySQL (via mysql2 driver)
- **Fonts**    — Inter + Fira Code (Google Fonts)

---

## 👤 Author

**Kushal Choudhary** — BCA Student & Developer
