const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Port Number
const port = 3300;

const app = express();


// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/login', function(req, res) {
    console.log(req.body);
    res.send(req.body);
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+ port);
});