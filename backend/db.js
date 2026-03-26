// =============================================
//  db.js - MySQL Database Connection
// =============================================

const mysql = require('mysql2');

// Create a connection pool for better performance
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'Khushveer#26',    // MySQL root password
    database : 'portfolio_db',
    waitForConnections: true,
    connectionLimit   : 10,
    queueLimit        : 0
});

// Verify connection on startup
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌  MySQL connection failed:', err.message);
        console.error('   Make sure MySQL is running and credentials are correct.');
    } else {
        console.log('✅  Connected to MySQL database: portfolio_db');
        connection.release();
    }
});

// Export as promise-based pool for async/await support
module.exports = pool.promise();
