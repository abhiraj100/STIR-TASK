const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Database connection established')
    } catch (err) {
        console.error("Failed To Connnect ",err.message)
    }
}
module.exports = dbConnection