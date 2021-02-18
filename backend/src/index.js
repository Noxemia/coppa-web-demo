
// need to somehow create module or turn this into a module
///const Policy = require ('./ppclib/types/policy')
// Could probably move requests for each agent to their own module
// This also needs to be typescriptified

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const fs = require('fs');
const { send } = require('process');
const fsp = fs.promises

const app = express();
app.use(cors())
app.use(bodyParser.json())
const port = 4000;


/// Test to see if working
app.get("/", (req, res) => {
    console.log("Request gotten")
    res.send("Mr. Child");
})

/// For child when they want to send their info
/// See if there is a consent available and if there is, send it
app.get('/owebsite/getConsent', (req, res) => {
    fsp.readFile('./src/data/consent.json', 'utf-8')
    .then(data => {
        console.log(data)
        //fsp.unlink('./src/data/consent.json').catch(err => console.log(err))
        data = JSON.parse(data)
        pc = {
            sign: 'website',
            content: data.content
        }
        res.send({
            pc
        })
    })
    .catch(err => {
        res.sendStatus(500)
        console.log(err)
    })
})

/// For the parent to see if they have any requests they want
app.get('/owebsite/availableRequest', (req, res) => {
    fsp.readFile('./src/data/consent_request.json', 'utf-8')
    .then(data => {
        console.log("IParent checked for Available requests")
        //fsp.unlink('./src/data/consent_request.json').catch(err => console.log(err))
        data = JSON.parse(data)
        cp = {
            sign: "website",
            policy: "This is our policy"
        }

        res.send({
            cp
        })
    })
    .catch(err => {
        res.sendStatus(500)
        console.log(err)
    })
});



/// For Child when they want to first send their info but parent needs to know
/// Used when you want to queue a consent request from a child to a parent
app.post('/iwebsite/requestConsent', (req, res) => {
    console.log(req.body)
    
  

    fsp.writeFile('./src/data/consent_request.json', JSON.stringify({data: 'your child really want you to consent :)'}))
    .then(() => {
        console.log("file created")
        res.sendStatus(200)
    })
    .catch(err => console.log("error caught: " + err))
})


/// For a parent to consent to the available consent
app.post('/iwebsite/acceptConsent', (req, res) => {
    console.log(req.body.cc.sign)
    if(req.body.cc.sign != "parent") {
        console.log("sign does not match")
        res.sendStatus(500)
        return
    }

    fsp.writeFile('./src/data/consent.json', JSON.stringify(req.body.cc.content))
    .then(() => {
        console.log("file created")
        res.sendStatus(200)
    })
    .catch(err => console.log("error caught: " + err))
})


app.post('/iwebsite/sendInfo', (req, res) => {
    fsp.writeFile('./src/data/final_info.json', JSON.stringify(req.body))
    .then(() => {
        console.log("file created")
        res.sendStatus(200)
    })
    .catch(err => console.log("error caught: " + err))
})


app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})