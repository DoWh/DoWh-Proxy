const parse = require('./parse');

module.exports = new class {
    async codePage(url){
        // console.log('codePage')
        let response = await fetch(url);
        if (response.ok) return response.text();
    }
    linksPage(){
        console.log('linksPage')
    }
    async proxiesPage(url){
        // console.log('proxiesPage')
        let page = await this.codePage(url);
        let proxyList = parse.proxies(page);
        return proxyList;
    }
    linksDomain(){
        console.log('linksDomain')
    } 
    proxiesDomain(){
        console.log('proxiesDomain')
    }
}