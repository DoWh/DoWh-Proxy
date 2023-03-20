module.exports = new class {
    formatToObj(proxyList){
        let ip,port;
        for (let i = 0; i < proxyList.length; i++) {
            [ip, port] = proxyList[i].split(':');
            proxyList[i] = {
                ip: ip,
                port: port
            }
        }
        return proxyList;
    }
    proxyCorrect(proxy){
        let ip,port;
        [ip,port] = proxy.split(':');
        ip = ip.split('.');
        for (let i = 0; i < ip.length; i++) {
            if (Number(ip[i]) > 255) return false;
        }
        return true;
    }
    proxies(page){
        //clear page all simbol exept 0-9.<>
        page = page.replace(/[^0-9.<>:]/g,'')

        //regular expression for ip adress and port at 1 str
        let regEx = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}[:><]*\d{2,4}/g

        //get array of prxoxy like ip:port ...
        page = page.match(regEx)
        //test for wrong site, page or just guard
        if (page === null || page.length < 1) return [];

        let proxList = page.map( 
            (value) => value.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/) + ":" + value.match(/\d{2,4}$/)
        );
        // console.log(proxList)
        return proxList.filter(this.proxyCorrect);
    }
    links(str){
        
    }
    addProtocol(proxyList,protocols){
        for (let i = 0; i < proxyList.length; i++) {
            proxyList[i] = Object.assign(proxyList[i], {
                protocol: protocols[i]
            })
        }
        return proxyList;
    }
}