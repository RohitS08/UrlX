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

app.use('/',router);

if(process.env.NODE_ENV=="production"){
  app.use(express.static("client_/build"));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client_','build','index.html'))
  })
}

app.listen(PORT, () => console.log(`Server Running on Port : ${PORT}...`))