const { Router} = require('express');
const router = Router();

const axios = require('axios');

//const service = 'http://devapi.coolcalc.com/';

const result = 'http://devapi.coolcalc.com/search-equipment';
const detail = 'http://devapi.coolcalc.com/view-result';
   
//basic authentication 
const verify = function(){
    let ClientId = '';
    let APIKey = '';
    let encoded = Buffer.from(ClientId + ':' + APIKey).toString('base64');
    return encoded;
}

// routes
router.get('/result/:params', async(req, res) => {

    const myUrl = req.originalUrl;
    const newParams = myUrl.replace('/result/', '?params=' );

    console.log(newParams);

     try {
        let response = await axios.get(result,  {
            params: {
                params: {newParams}
            },
            headers:{
                Authorization: `Basic ${verify()}`
            }
        });
        res.json({
            ok: true,
            msg: 'estamos en result',
            body: response.data
            //auth: `Basic ${verify()}`
        });       
    } catch (err) {
        res.json({
            url1: result,
            url2: newParams,
            error: err
            //auth: `Basic ${verify()}`
        }); 
    }

});



router.get('/detail/:cod', async(req, res) => { 

    const myUrl = req.originalUrl;
    const newParams = myUrl.replace('/detail/', '?ahri_refs=' );

     try {
        let response = await axios.get(detail,  {
            params: {
                params: newParams
            },
            headers:{
                Authorization: `Basic ${verify()}`
            }
        });
        res.json({
            ok: true,
            msg: 'estamos en detail',
            body: response.data
            //auth: `Basic ${verify()}`

        });        
    } catch (err) {
        res.json({
            url1: detail,
            url2: newParams,
            error: err
            //auth: `Basic ${verify()}`
        }); 
    }

})


module.exports = router;
