const { Router} = require('express');
const router = Router();
const axios = require('axios');
const service = 'http://localhost:8081';
   
// Basic authentication 
const verify = function(){
    let ClientId = 'silverliningco';
    let APIKey = 'letmeinple@se';
    let encoded = Buffer.from(ClientId + ':' + APIKey).toString('base64');
    return encoded;
}

// Handle function
var handleFunc = function(req, res) {
    let myUrl = req.originalUrl;
    
    axios.get(service + myUrl,  {
        headers:{
            Authorization: `Basic ${verify()}`
        }
    }).then(response => {
        
        res.json(response.data);

    }).catch(error => {
        if (error.response) {
            res.setHeader('Content-Type', error.response.headers['content-type']);
            return res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            res.json({
                error: error.request
            });
        } else {
            console.log('Error', error.message);
        }
    });
};

// Routes

// Get product lines
router.get('/product-lines', async(req, res) => await handleFunc(req, res));

// Get equipment search
router.get('/search-equipment', async(req, res) => await handleFunc(req, res));

// Get detail
router.get('/view-detail', async(req, res) => await handleFunc(req, res));

//get Utilities 
router.get('/load-utilities',async(req, res) => await handleFunc(req, res));

module.exports = router;
