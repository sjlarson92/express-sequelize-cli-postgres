const dotenv = require('dotenv');

dotenv.config()

console.log('-------------- In config.js-------------')
console.log('process.env.DB_USER', process.env.DB_USER)
console.log('process.env.DB_NAME', process.env.DB_NAME)

const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres"
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres"
    }
}

module.exports = config;