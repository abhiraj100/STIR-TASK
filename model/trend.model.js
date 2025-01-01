const mongoose = require('mongoose')


const trendSchema = new mongoose.Schema({
    nameoftrend1: {
        type: String,

    },
    nameoftrend2: {
        type: String,

    },
    nameoftrend3: {
        type: String,

    },
    nameoftrend4: {
        type: String,

    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('trend', trendSchema)