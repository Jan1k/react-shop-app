// require('dotenv').config()
module.exports = {
    Port: process.env.port || 5000,
    mongoURI: process.env.mongoURI || "mongodb://localhost:27017/mobileShop",
    secretOrKey: process.env.secretOrKey || "secret"
};