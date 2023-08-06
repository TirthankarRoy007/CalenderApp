const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    startTime: { 
        type: Date,
        required: true
    },
    endTime: { 
        type: Date,
        required: true
    },
    emailAddress: { 
        type: String,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
