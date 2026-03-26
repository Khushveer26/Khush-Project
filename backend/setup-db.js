const mysql = require('mysql2/promise');

async function setupDatabase() {
    try {
        console.log('⏳ Connecting to MySQL Server...');
        // Connect without a specific database to create it first
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Khushveer#26' // The password from db.js
        });
        
        console.log('✅ Connected to MySQL Server!');

        console.log('⏳ Creating database portfolio_db if it does not exist...');
        await connection.query('CREATE DATABASE IF NOT EXISTS portfolio_db;');
        console.log('✅ Database portfolio_db ensured.');

        console.log('⏳ Switching to portfolio_db...');
        await connection.query('USE portfolio_db;');

        console.log('⏳ Creating contacts table if it does not exist...');
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS contacts (
                id      INT          AUTO_INCREMENT PRIMARY KEY,
                name    VARCHAR(100) NOT NULL,
                email   VARCHAR(150) NOT NULL,
                message TEXT         NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await connection.query(createTableQuery);
        console.log('✅ Contacts table ensured.');

        console.log('🎉 Database setup completed successfully!');
        await connection.end();

    } catch (err) {
        console.error('❌ Error setting up database:');
        console.error(err.message);
        console.error('\n💡 Troubleshooting:');
        console.error('1. Make sure MySQL Server (or XAMPP/WAMP MySQL) is installed AND currently running.');
        console.error('2. Ensure root password is correct ("Khushveer#26"). If no password, change it to blank temporarily in backend/db.js and in this script.');
    }
}

setupDatabase();
