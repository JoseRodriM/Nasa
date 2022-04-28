const mongoose = require('mongoose');
const landing = require('../db/mongodb');

const getLandings = async(req,res)=>{
    landing.find({}, (err, docs)=>{
    if(err){
        console.log(err)
    }
    if(docs){
        res.json(docs)
    }
    })
};

const getLandingsMinMass = async(req, res)=>{
    const masa = req.params.mass
    landing.find({mass: {$gte:masa}}, (err, docs)=>{
        if(err){
            console.log(err)
        }
        if(docs.length>0){
            res.send(docs)
        }else{
            res.send('No se han podido encontrar')
        }
    })
}

const getLandingsByMass = async(req, res)=>{
    const masa = req.params.mass
    landing.find({mass: `${masa}`}, (err, docs)=>{
        if(err){
            console.log(err)
        }
        if(docs.length>0){
            res.send(docs)
        }else{
            res.send('No se ha podido encontrar landings con la masa')
        }
    })
}

const getLandingsByClass = async(req, res)=>{
    const clase = req.params.recclass
    landing.find({recclass: `${clase}`}, (err, docs)=>{
        if(err){
            console.log(err)
        }
        if(docs.length>0){
            res.send(docs)
        }else{
            res.send('No se ha podido encontrar landings con la clase introducida')
        }
    })
}

const getLandingsByDate = async(req, res)=>{
    const { from, to } = req.query;
    if (from || to) {
        const results = []
        const landing = await Landing.find({}, {
            name: 1,
            mass: 1,
            year: 1
        }).sort({ year: 1 });
        landing.map(item => {
            if (item.year) {
                let year = item.year.slice(0, 4);
                if (from && !to && from && Number(year) >= Number(from)) {
                    results.push(item)
                }
                if (!from && to && to && Number(year) <= Number(to)) {
                    results.push(item)
                }
                if (from && to && from && to && (Number(year) >= Number(from) && Number(year) <= Number(to))) {
                    results.push(item)
                }
            }
        });

        if (results.length < 1) {
            return res.json({ message: 'No landings with such parameters' });
        }

        res.json({ results })
    }
}


module.exports = {getLandings, getLandingsMinMass, getLandingsByMass, getLandingsByClass, getLandingsByDate};