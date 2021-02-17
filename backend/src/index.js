const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
const port = 4000;



app.get("/", (req, res) => {
    console.log("Request gotten")
    res.send("poggers dude!");
})




app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})