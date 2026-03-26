// =============================================
//  db.js - MySQL Database Connection
// =============================================

const mysql = require('mysql2');

// Create a connection pool for better performance
const pool = mysql.createPool({
    host     : process.env.DB_HOST || 'localhost',
    port     : process.env.DB_PORT || 3306,
    user     : process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || 'Khushveer#26',
    database : process.env.DB_NAME || 'portfolio_db',
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
