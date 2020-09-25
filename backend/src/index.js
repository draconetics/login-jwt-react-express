const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',function(req,res){	
    let element = 'This is the main page';
    res.send(element);
  });
  
//routes
const userRouter = require('./user/user.route')
app.use('/', userRouter);

const portConfig = require('./config/port.config');
//database
const db = require('./database/db.js');
db.connect()
  .then(() => {
    console.log('database connected..')
    app.listen(portConfig.PORT, () => {
      console.log('Listening on port: ' + portConfig.PORT);
    });
  });