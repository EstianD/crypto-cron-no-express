const mongoose = require('mongoose');
// const Crypto = require('./models/crypto')
// const Exchange = require('./models/exchange')
const config = require('./utils/config')

// IMPORT CRON
const runCron = require('./functions/crypto-cron')

// MAKE CONNECTION
mongoose.connect(config.MONGODB_URI, 
   { useNewUrlParser: true,
   useUnifiedTopology: true }
);
 
// REFERENCE TO DB
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
   console.log("Connection Successful!");
    
   runCron()
    
});