// const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const mainPage = "https://hidemy.name";
const state = { "https://hidemy.name":false };


(async function MainThread() {
    let links,currentLink;
    do {
        console.log('link-scan...')
        currentLink = linkForScan();
        links = await getLinkFromUrl(currentLink);

        for (let i = 0; i < links.length; i++) {
            if ( state[links[i]] == undefined) {
                state[links[i]] = false;
            }
        }
        state[currentLink] = true;
        await delay(20000);

    } while (linkForScan() != null);
    
    fs.writeFile('result.txt', JSON.stringify(state), function(error){
        if(error) throw error; // ошибка чтения файла, если есть
        console.log('Данные успешно записаны записать файл');
    });
    
    // for(let key in state) {
    //     console.log(`${key}: ${state[key]}`);
    // }
    console.log("LinkScaned...end");
}())

function linkForScan(){
    for(let key in state) {
        if (!state[key]) return key
    }
    return null;
}



async function getLinkFromUrl(url) {
    let res = await axios.get(url).then(response => response.data)
    let dom = new JSDOM(res);
    let items = dom.window.document.querySelectorAll('a');
    let links = [];
    items.forEach(node=>{
        if (node.href[0] == '/') {  //node.href.indexOf(mainPage) != -1
            links.push(mainPage + node.href)
        };
    })
    console.log('links.length=',links.length)
    return links;
}


async function delay(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(() => resolve("result"), ms);
    });
}

// (async function(){
//     console.log('0')
//     await delay(1000);
//     console.log('1')
//     await delay(1000);
//     console.log('2')
//     await delay(3000);
//     console.log('3')
// }())




/*
console.log('test')

async function func(){
    await delay(500);
    return [1,2,3,4];
}

(async function(){
    let result = await func('123');
    console.log(result);
}())
*/