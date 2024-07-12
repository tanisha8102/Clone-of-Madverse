const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/madverse', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = mongoose.model("users", Loginschema);

module.exports = collection;