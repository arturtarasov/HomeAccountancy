const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
var sql = require('mssql'); 

// параметры соединения с бд
var config = {
	user: 'test2',   				// пользователь базы данных
	password: '1234567890', 	 			// пароль пользователя 
	server: 'localhost', 			// хост
	database: 'test2db',    			// имя бд
    port: 1433,
    options: {
        truestedConnection: true,
        instanceName: 'SQLEXPRESS'
   }
}

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
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("SELECT * FROM [User]", function (err, data) {
      if (err) console.log(err)
      res.json(data.recordset);
      sql.close();
    });
  });
});

app.use('/registration', function(req, res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.input('email', req.body.email);
    request.input('password', req.body.password);
    request.input('name', req.body.name);
    request.query("INSERT INTO [User] (email, password, name) values (@email, @password, @name)", function (err, data) {
      if (err) console.log(err)
      res.json({data: {email: req.body.email, password: req.body.password, name: req.body.name}});
      sql.close();
    });
  });
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+ port);
});