
// need to somehow create module or turn this into a module
///const Policy = require ('./ppclib/types/policy')
// Could probably move requests for each agent to their own module
// This also needs to be typescriptified

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const fs = require('fs');
const fsp = fs.promises

const app = express();
app.use(cors())
app.use(bodyParser.json())
const port = 4000;


let data = {
    activeRequest: false,
    policy: "This is our comprehensive policy",
    parentalAgree: false
}


/// Test to see if working
app.get("/", (req, res) => {
    data += "xd"
    res.send(data);
})

app.get('/activerequest', (req, res) => {
    res.send(data.activeRequest) 
})

app.post('/setrequest', (req, res) => {
    data.activeRequest = true
    res.sendStatus(200)
})

app.get('/avaliableconsent', (req, res) => {
    res.send(data.parentalAgree)
})

app.get('/pendingrequest', (req, res) => {
    data.activeRequest ? res.send({active: true, policy: data.policy}) : res.send({active: false})
})

app.post('/giveconsent', (req, res) => {
    data.parentalAgree = true
    res.sendStatus(200)
})





app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})