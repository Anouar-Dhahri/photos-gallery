const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/gallery";

const connection = async (req, res, next) => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> console.log("MongoDB connected"))
        .catch((err)=> res.status(400).send(err))
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = connection;