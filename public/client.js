// console.log('client.js')
// start worck
let state = {}
document.getElementById('grabProxy').addEventListener('click', ()=>{
    toggleLoad()
    fetch('/api/startProxy', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({urlList: document.getElementById('inputList').value})
    })
    .then(data => data.json())
    .then((data)=>{
        document.getElementById('resultList').value = data.join("\n")
        toggleLoad()
    })
})

document.getElementById('validateProxy').addEventListener('click', ()=>{
    toggleLoad()
    fetch('/api/validateProxy', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({data: document.getElementById('resultList').value})
    })
    .then(data => data.json())
    .then((data)=>{
        document.getElementById('resultList').value = data.join("\n")
        toggleLoad()
    })
})

function toggleLoad(){
    let list = document.querySelectorAll('aside div')
    list.forEach(elem => elem.classList.toggle('hide'))
}