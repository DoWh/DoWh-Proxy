const express = require('express');

const app = express();
const port = 3001;


app.listen(port)


app.get('/', (req,res)=>{
    res.send('hello from express')
})
