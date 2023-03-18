const axios = require('axios');

const express = require('express');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const delay = require('delay');


module.exports = async function(req,res){
    console.log('get proxy start...')
    let links = req.body.urlList.split("\n")
    let page,result = [];
    for (let i = 0; i < links.length; i++) {
        console.log('start work with '+ links[i])
        page = await getClearPage(links[i])
        result = result.concat(getProxyFromPage(page))
        await delay(5000);
    }
    
    res.send(result);
    
}

//get page from url
//url - just link
async function getClearPage(url){
   return await axios.get(url).then(response => response.data)
}

//get array of proxy
//page - str (code of full page)
function getProxyFromPage(page){

    //clear page all simbol exept 0-9.<>
    page = page.replace(/[^0-9.<>]/g,'')

    //regular expression for ip adress and port at 1 str
    let regEx = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}[><]*\d{2,4}/g

    //test for wrong site, page or just guard
    if (page.length < 1) return [];
    //get array of prxoxy like ip:port ...
    page = page.match(regEx)
    page = page.map( 
        (value) => value.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/) + ":" + value.match(/\d{2,4}$/)
    );
    return page;

}
