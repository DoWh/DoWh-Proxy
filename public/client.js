// console.log('client.js')
// start worck
let state = {}
document.getElementById('grabProxy').addEventListener('click', ()=>{
    document.querySelector('.load').style.display = 'flex';
    document.querySelector('#grabProxy').style.display = 'none';
    fetch('/api/startProxy', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({urlList: document.getElementById('inputList').value})
    })
    .then(data => data.json())
    .then((data)=>{
        document.getElementById('resultList').value = data.join("\n")
        document.querySelector('.load').style.display = 'none';
        document.querySelector('#grabProxy').style.display = 'flex';
    })
})