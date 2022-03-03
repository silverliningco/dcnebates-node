//run locally -> npm run start:dev

const express = require('express');
const cors = require('cors');


const app = express();

// configure CORS
app.use( cors() );

// routes
app.use('/', require('./rebate.js'));

 
  
const port = 3000;


app.listen(port, () => {
    console.log("App is running on port " + port);
});