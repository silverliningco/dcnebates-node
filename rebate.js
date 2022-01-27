const { Router} = require('express');
const router = Router();

const axios = require('axios');


const service='http://devapi.coolcalc.com/search-equipment';

//basic authentication 
const verify = function(){
    let ClientId = '';
    let APIKey = '';
    let encoded = Buffer.from(ClientId + ':' + APIKey).toString('base64');
    return encoded;
}

// routes
router.get('*', async(req, res) => {

    const myUrl = req.originalUrl;
    const newParams = myUrl.replace('/?params=', '?params=' );
    
    
     /* //send the headers
     res.setHeader('Content-Type', response.headers['content-type']);
     res.setHeader('allow', response.headers['allow']);
     res.setHeader('Access-Control-Expose-Headers', 'Location, Allow');
  */

     try {
        let response = await axios.get(service,  {
            params: {
                params: newParams
            },
            headers:{
                Authorization: `Basic ${verify()}`
            }
        });
        res.json({
            ok: true,
            msg: 'estamos en heroku',
            body: response.data,
            auth: `Basic ${verify()}`

        });        
    } catch (err) {
        res.json({
            url1: service,
            url2: newParams,
            error: err,
            auth: `Basic ${verify()}`
        }); 
    }

})





module.exports = router;
