const {ProxyChecker} = require('proxy-checker');
const parse = require('./parse');
const delay = require('delay');

module.exports = new class {
    async testOne(ip,port){
        console.log(`start check ip=${ip} port=${port}`)
        let pc = new ProxyChecker(ip, port);
        return await pc.check()
    }
    async testAll(proxyList){
        //start testing all proxy
        let protocols = []; //for promises
        for (let i = 0; i < proxyList.length; i++) {
            await delay(100) // spam secure delay
            protocols.push( 
                this.testOne(proxyList[i].ip, proxyList[i].port) 
            )
        }
        //await for all promise check
        protocols = await Promise.all(protocols)
        //format proxyList (add protocol)
        proxyList = parse.addProtocol(proxyList, protocols)

        return proxyList;
    }
    connected(proxyList){
        return proxyList.filter( proxy => {
            if (proxy.protocol.socks5 === true) return true
            if (proxy.protocol.socks4 === true) return true
            if (proxy.protocol.connect === true) return true
            if (proxy.protocol.http === true) return true
            return false
        })
    }
}