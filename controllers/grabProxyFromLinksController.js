const delay = require('delay');
const grab = require('../unit/grab');
const parse = require('../unit/parse'); //

module.exports = async function(req,res){
    // res.send('grabProxyFromLinksController') // TEST CONTROLLER
    
    let urls = req.body.urlList.split("\n");

    let Prom = []
    for (let i = 0; i < urls.length; i++) {
        console.log(`start grab ${urls[i]}`)
        Prom.push(grab.proxiesPage(urls[i]))
        await delay(1000);
    }

    let proxylist = await Promise.all(Prom)

    res.send(proxylist.flat())

    // console.log(parse.proxyCorrect('159.203.61.169:8080'))
    // res.send('end')
}   