const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/login-jwt-project';
const DB_PROD = 'mongodb+srv://draconetics:draconetics@cluster0-74ml0.mongodb.net/test?retryWrites=true&w=majority'
const DB_TESTING = 'mongodb://localhost:27017/01testing';
    
function connect() {
    return new Promise((resolve, reject) => 
        {
            // if (process.env.NODE_ENV === 'test') 
            // {
            //     connectToDataBase(resolve, reject, DB_TESTING);                
            // } 
            // if (process.env.NODE_ENV === 'production') 
            // {
            //     connectToDataBase(resolve, reject, DB_PROD);                
            // }
            
            //developer mode
            connectToDataBase(resolve, reject, DB_URI);                
        }
    );//end promise
}

function connectToDataBase(resolve, reject, url)
{
    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true })
        .then(()=> resolve())
        .catch(err => reject(err));
}
    
function close() {
    return mongoose.disconnect();
}


module.exports = { connect, close };