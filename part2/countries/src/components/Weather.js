import React from 'react'

const Weather = ({ weather }) => {
    //console.log(weather)
    return (
        <div>

            <p><b> Temperature: </b>{weather.temperature} Celcius</p>
            <img alt="weather icon" src={weather.weather_icons} />
            <p><b>Wind: </b> {weather.wind_speed} mph {weather.wind_dir}</p>
        </div>
    )
}

export default Weather