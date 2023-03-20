// console.log('client.js')
// start worck
let state = {}

document.getElementById('grabFromLinks').addEventListener('click', ()=>{
    toggleLoad()
    fetch('/api/grabProxyFromLinks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({urlList: document.getElementById('inputList').value})
    })
    .then(data => data.json())
    .then((data)=>{
        state.proxyList = data;
        ShowProxy('ALL')
        toggleLoad()
    })
})

function ShowProxy(type){
    let result = '';
    if (state.proxyList === undefined) return null;

    for (let i = 0; i < state.proxyList.length; i++) {
        if (type === 'HTTP' && state.proxyList[i].protocol.http === false) continue;
        if (type === 'HTTPS' && state.proxyList[i].protocol.connect === false) continue;
        if (type === 'SOCKS4' && state.proxyList[i].protocol.socks4 === false) continue;
        if (type === 'SOCKS5' && state.proxyList[i].protocol.socks5 === false) continue;
        result += state.proxyList[i].ip + ':' + state.proxyList[i].port + '\n'
    }
    document.getElementById('resultList').value = result;
}

function toggleLoad(){
    let list = document.querySelectorAll('aside div')
    list.forEach(elem => elem.classList.toggle('hide'))
}

//filter proxy
document.querySelector('.resultFilter').addEventListener('click',(event)=>{
    if (event.target.tagName == 'NAV') return;
    let list = document.querySelectorAll('.resultFilter h2')
    list.forEach(elem => elem.classList.remove('chosen'))
    event.target.classList.add('chosen')
    ShowProxy(event.target.innerHTML);
})
