const { Router} = require('express');
const router = Router();

const axios = require('axios');

const service = 'http://devapi.coolcalc.com';

const detail = service + 'view-result';
   
//basic authentication 
const verify = function(){
    let ClientId = '';
    let APIKey = '';
    let encoded = Buffer.from(ClientId + ':' + APIKey).toString('base64');
    return encoded;
}

// routes

// step 1 to find a combination
router.get('/product-lines', async(req, res) => { 

    let myUrl = req.originalUrl;

     try {
        let response = await axios.get(service + myUrl,  {
            headers:{
                Authorization: `Basic ${verify()}`
            }
        });
        res.json({
            ok: true,
            msg: 'estamos en product lines',
            body: response.data

        });        
    } catch (err) {
        res.json({
            error: err
        }); 
    }

})

// step 2 to find a combination
router.get('/search-equipment', async(req, res) => {

    let myUrl = req.originalUrl;

     try {
        let response = await axios.get(service + myUrl ,  {
            headers:{
                Authorization: `Basic ${verify()}`
            }
        });
        res.json({
            ok: true,
            msg: 'estamos en result',
            body: response.data
        });       
    } catch (err) {
        res.json({
            error: err
        }); 
    }

});


// step 3 to find a combination
router.get('/view-detail', async(req, res) => { 

    let myUrl = req.originalUrl;

     try {
        let response = await axios.get(service + myUrl,  {
            headers:{
                Authorization: `Basic ${verify()}`
            }
        });
        res.json({
            ok: true,
            msg: 'estamos en detail',
            body: response.data

        });        
    } catch (err) {
        res.json({
            error: err
        }); 
    }

})


module.exports = router;
