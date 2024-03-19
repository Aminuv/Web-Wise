const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}