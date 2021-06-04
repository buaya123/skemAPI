const express = require('express')
const app = express()
const port = 3000
const api = require('./api.js')

// enabling CORS to accept from all origins
app.all('*', (req, res, next) => {
    console.log(`${new Date()} - request for ${req.path}`);
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.send("Welcome to the skem-api end-point")
})

app.post('/api/createTarget', api.createTarget)

app.get('/api/getAllTargets', api.getAllTargets)

app.post('/api/getOneTarget', api.getOneTarget)

app.post('/api/updateTarget', api.updateTarget)

app.post('/api/deleteTarget', api.deleteTarget)


