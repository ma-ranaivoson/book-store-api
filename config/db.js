const mongoose = require('mongoose');

const connectDb = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
    });

    console.log(`MongoDB connected on: ${conn.connection.host}`.blue.bold);
};

module.exports = connectDb;
