const express = require('express');
const passport = require('passport');
const routes = require('./routes/api')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { Port, mongoURI } = require("./config/keys");
const configPassport = require("./config/passport")

const app = express();

mongoose.Promise = Promise;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
})

const db = mongoose.connection;

db.on('error', (error) => {
  console.log('Database connection error:', error);
})

db.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());

app.use(passport.initialize());

configPassport(passport);

app.use('/', routes);

app.listen(Port, (err) => {
  if (err) {
    return console.log('Something bad happened', err)
  }
  console.log("Server is running on Port: " + Port);
});