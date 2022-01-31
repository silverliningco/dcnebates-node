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
router.get('/search-equipment', async(req, res) => {

    const myUrl = req.originalUrl;

     try {
        let response = await axios.get(service+myUrl,  {
            params: {
            },
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



router.get('/view-result', async(req, res) => { 

     try {
        let response = await axios.get(service+myUrl,  {
            params: {
            },
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
