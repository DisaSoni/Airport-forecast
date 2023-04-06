window.onload = getSetDisplay

function getSetDisplay() {
    if (location.pathname === "/mirage"){

        navActive("mirage");
    }
    let buttons = document.getElementsByClassName("fetch-data")
    for (const button of buttons) {
        button.addEventListener("click", async function (event) {
            let custom = event.target.className.split(' ').slice(-1)
            if (custom !== "collapsed") {
                let response = await fetch(`/mirage?IATA=${custom}&custom=${1}`);
                let data = await response.json();
                let image = document.getElementById(`img-${custom}`);
                let temp = document.getElementById(`temp-${custom}`);
                let hum = document.getElementById(`hum-${custom}`);
                let wind = document.getElementById(`wind-${custom}`);
                image.src = data.icon_src;
                temp.innerText = "Temperature: " + data.temp;
                hum.innerText = "Humidity: " + data.humidity;
                wind.innerText = "Wind Speed " + data.wind_speed;

            }

        })
    }
}

