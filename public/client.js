// console.log('client.js')
// start worck
document.getElementById('grabProxy').addEventListener('click', ()=>{
    fetch('/api/startProxy', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({urlList: document.getElementById('inputList').value})
    })
    .then(data => data.json())
    .then(data => console.log(data))
    .then((data)=>{
        document.getElementById('resultList').value = data.code
    })
})