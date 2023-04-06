const Express = require("express");
const path = require("path");
const {airport, weather} = require("./modules/api/api");

const app = Express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(Express.static(path.join(__dirname, 'public')));

app.use(Express.urlencoded({extended: true}));
app.use(Express.json());

app.get("/", (request, response) => {
    response.render('index', {title: "Airport Mirage Home"});
});

app.get("/mirage", async (request, response) => {
    const airports = await airport();
    let data = airports.elements[0].elements

    let page = parseInt(request.query.page);
    let IATA = request.query.IATA
    let custom = request.query.custom

    if (!isNaN(page)) {
        let pageSlice = 100;
        let total = Math.ceil(data.length * 1.0 / pageSlice);
        data = data.slice(pageSlice * (page - 1), pageSlice * page);

        response.render('pretty-data', {
            title: "Airport Mirage",
            data: data,
            total: total,
            curr: page,
            till: page + 10,
            prev: page === 1 ? "disabled" : "",
            next: page === total ? "disabled" : "",
            prevNum: page - 1,
            nextNum: page + 1
        });
    } else if (IATA) {
        IATA = IATA.toUpperCase();
        for (let info in data) {
            info = data[info]
            if (IATA === info.attributes.IATACode) {
                let data_weather = await weather(info.attributes.Latitude, info.attributes.Longitude);
                let temp = data_weather.main.temp;
                let humidity = data_weather.main.humidity;
                let wind_speed = data_weather.wind.speed
                let icon = data_weather.weather[0].icon

                let icon_URL = `https://openweathermap.org/img/wn/${icon}@4x.png`;
                if (custom === "1") {
                    return response.json({
                        temp: temp,
                        humidity: humidity,
                        wind_speed: wind_speed,
                        icon_src: icon_URL
                    })
                }
                return response.render("pretty-search", {
                    temp: temp,
                    humidity: humidity,
                    wind_speed: wind_speed,
                    icon_src: icon_URL,
                    airport: info,
                    title: "Airport Mirage",
                })
            }
        }
        return response.render("pretty-error", {
            error: ">.< Invalid IATA Code"
        })
    }
});

app.get("/*", (request, response) => {
    return response.render("pretty-error", {
        error: 'ERROR 404 PAGE NOT FOUND >.<'
    })
});


const PORT = 8888;

app.listen(PORT, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Successfully Connected on Port ${PORT} ...`);
        console.log(`http://localhost:${PORT}`);
    }
})