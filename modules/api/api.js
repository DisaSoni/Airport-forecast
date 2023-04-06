const fetch = require("node-fetch");
const convert = require("xml-js");
const fs = require("fs");

async function airport() {

    //api key
    const RAPID_API_KEY = '42e36ff87amsha7faf3aae85c4f1p1867b7jsnf52819078bf6';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'timetable-lookup.p.rapidapi.com'
        }
    };

    let response = await fetch('https://timetable-lookup.p.rapidapi.com/airports/', options);

    let xml_data = await response.text()

    return JSON.parse(convert.xml2json(xml_data));
}

async function weather(lat, lon) {

    //api key
    const API_KEY = '2b23583105a75b47ac4bc572fef9f44e'
    let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    let response = await fetch(URL);
    let data = await response.json()
    console.log(data)

    return data
}

module.exports = {
    airport,
    weather
}