const delay = require('delay');
const grab = require('../unit/grab');
const validate = require('../unit/validate');
const parse = require('../unit/parse');

module.exports = async function(req,res){
    // res.send('grabProxyFromLinksController') // TEST CONTROLLER
    
    // console.log(req.body.urlList)
    let urls = req.body.urlList.split("\n");

    //get proxy from pages!
    let Prom = []
    for (let i = 0; i < urls.length; i++) {
        console.log(`start grab ${urls[i]}`)
        Prom.push(grab.proxiesPage(urls[i]))
        await delay(1000);
    }
    //wait for all links parsed!
    let proxylist = await Promise.all(Prom)
    proxylist = proxylist.flat()
    //conver proxy format 123.123.123.123:123 to {ip:'123.123.123.123', port:123}
    proxylist = parse.formatToObj(proxylist)
    //tring to connect to all protocol with that proxy
    proxylist = await validate.testAll(proxylist);
    //delete proxy with no answer!
    proxylist = validate.connected(proxylist)
    
    res.send(proxylist)

}   