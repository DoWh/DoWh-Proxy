const axios = require('axios');
const delay = require('delay');
const {ProxyChecker} = require('proxy-checker');

module.exports = async function(req,res){
    let proxyList = req.body.data.split('\n');

    //format proxyList
    for (let i = 0; i < proxyList.length; i++) {
        [ip, port] = proxyList[i].split(':');
        proxyList[i] = {
            ip: ip,
            port: port
        }
    }

    //start ProxyCheck all proxy
    let protocols = [];
    for (let i = 0; i < proxyList.length; i++) {
        await delay(100) // spam secure delay
        protocols.push( 
            ProxyCheck(proxyList[i].ip, proxyList[i].port) 
        )
    }

    //await for all promise check
    protocols = await Promise.all(protocols)

    //format proxyList (add protocol)
    for (let i = 0; i < proxyList.length; i++) {
        proxyList[i] = Object.assign(proxyList[i], {
            protocol: protocols[i]
        })
    }

    //result
    res.send(proxyList)
}

async function ProxyCheck(ip,port){
    console.log(`start check ip=${ip} port=${port}`)
    let pc = new ProxyChecker(ip, Number(port));
	return await pc.check()
}