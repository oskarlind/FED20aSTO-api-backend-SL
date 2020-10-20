const fetch = require('node-fetch');
const express = require('express')
const app = express()
var cors = require('cors')
const port = 4001

// SL platsuppslag
const key_platsuppslag = "fb21608c34b848aa9e80a4c78c731f83";
const fetchStations = (search_string) => {
    return fetch("https://api.sl.se/api2/typeahead.json?key=" + key_platsuppslag + "&searchstring="+search_string+"&stationsonly=true&maxresults=10")
    .then((res) => res.json())
}

// SL Realtidsinformation
const key_realtidsinfo = "3e6ae6e795494894861f2bde834c7ba0";
const fetchDepartures = (siteId) => {
    return fetch("https://api.sl.se/api2/realtimedeparturesV4.json?key="+key_realtidsinfo+"&siteid="+siteId+"&timewindow=20")
    .then((res) => res.json())
}
app.use(cors())
app.get('/stations/:search_string', async (req, res) => {
    let data = await fetchStations(req.params.search_string)
    res.send(data);
})

app.get('/departures/:station_id', async (req, res) => {
    let data = await fetchDepartures(req.params.station_id)
    res.send(data);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})