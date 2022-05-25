const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const {getLandings, getLandingsMinMass, getLandingsByMass, getLandingsByClass, getLandingsByDate} = require('./controllers/landings')
app.use(express.urlencoded({extended:true}));

app.get("/api/astronomy/landings", getLandings)
app.get("/api/astronomy/landings/:mass", getLandingsMinMass)
app.get("/api/astronomy/landings/mass/:mass", getLandingsByMass)
app.get("/api/astronomy/landings/class/:recclass", getLandingsByClass)


app.listen(port, () =>{
    console.log(`App running`)
})