require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookies = require('cookie-parser');

require('./db');

const router = require('./router.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookies());

if(process.env.NODE_ENV=="production"){
  app.use(express.static("client_/build"))
}

app.use('/',router);

app.listen(PORT, () => console.log(`Server Running on Port : ${PORT}...`))