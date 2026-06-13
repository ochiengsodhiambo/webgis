// Create map

const map = L.map('map').setView(
    [-3.34944, 40.01959], // Watamu
    12
);

// Basemap
L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '© OpenStreetMap'
    }
).addTo(map);


// Fetch weather data
async function getWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`;
    
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(data);
    return data;
}

// Add reverse geocoding (town name)
async function getTownName(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const res = await fetch(url);
    const data = await res.json();

    return data.address?.city ||
           data.address?.town ||
           data.address?.village ||
           data.address?.county ||
           "Unknown location";
}

// Format date + time
function getDateTime() {
    const now = new Date();
    return {
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    };
}

// Track interactive marker globally
let weatherMarker = null;

// Handle map click interaction
map.on('click', async function(e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;

    try {
        // 🌍 Fetch location town name
        const town = await getTownName(lat, lon);

        // 🌡 Fetch weather metrics
        const weather = await getWeather(lat, lon);
        const current = weather.current || {};

        // 🕒 Get timestamp
        const dt = getDateTime();

        const temp = current.temperature_2m ?? "N/A";
        const humidity = current.relative_humidity_2m ?? "N/A";
        const wind = current.wind_speed_10m ?? "N/A";
        const rain = current.precipitation ?? "N/A";

        // Remove old marker if user clicks a new spot
        if (weatherMarker) {
            map.removeLayer(weatherMarker);
        }

        // Build responsive HTML string structure
        const popupContent = `
            <div style="margin: 0; padding: 0;">
                <b style="font-size: 1.15em; color: #0056b3;">📍 ${town}</b>
                <hr style="border:0; border-top: 1px solid #eee; margin: 8px 0;">
                
                <span style="color: #666;">🌐 Coordinates:</span><br>
                ↳ Lat: ${lat.toFixed(5)}<br>
                ↳ Lon: ${lon.toFixed(5)}<br>
                
                <hr style="border:0; border-top: 1px solid #eee; margin: 8px 0;">
                📅 ${dt.date} &nbsp;|&nbsp; 🕒 ${dt.time}<br>
                
                <hr style="border:0; border-top: 1px solid #eee; margin: 8px 0;">
                🌡️ <b>Temperature:</b> ${temp} °C<br>
                💧 <b>Humidity:</b> ${humidity}%<br>
                💨 <b>Wind Speed:</b> ${wind} km/h<br>
                🌧️ <b>Precipitation:</b> ${rain} mm
            </div>
        `;

        // Create marker & assign the customized CSS class
        weatherMarker = L.marker([lat, lon])
            .addTo(map)
            .bindPopup(popupContent, {
                className: 'weather-popup', // Matches your updated CSS
                autoPan: true               // Smoothly shifts the map to fit the huge popup
            })
            .openPopup();

    } catch (err) {
        console.error(err);

        if (weatherMarker) {
            map.removeLayer(weatherMarker);
        }

        weatherMarker = L.marker([lat, lon])
            .addTo(map)
            .bindPopup("⚠️ Error loading data. Please try again.", {
                className: 'weather-popup'
            })
            .openPopup();
    }
});

/*
v2

        if (weatherMarker) {
            map.removeLayer(weatherMarker);
        }

        weatherMarker = L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`
                <b>📍 ${town}</b><br>
                🌐 Coordinates:<br>
                ↳ Lat: ${lat.toFixed(5)}<br>
                ↳ Lon: ${lon.toFixed(5)}<br><br>
                📅 ${dt.date}<br>
                🕒 ${dt.time}<br><br>
                🌡️ Temperature: ${temp} °C<br>
                💧 Humidity: ${humidity}%<br>
                💨 Wind Speed: ${wind} km/h<br>
                🌧️ Precipitation: ${rain} mm
            `,
            {
                className: 'weather-popup',
                maxWidth: 350
            })
            .openPopup();
<b>🌍 ${town}</b><br>
                🌐 Coordinates:<br>
                Lat: ${lat.toFixed(5)}<br>
                Lon: ${lon.toFixed(5)}<br><br>

                🗓 ${dt.date}<br>
                🕒 ${dt.time}<br><br>

                🌡 Temperature: ${temp} °C<br>
                💧 Humidity: ${humidity}%<br>
                🌬 Wind Speed: ${wind} km/h<br>
                ☔ Precipitation: ${rain} mm

//  Declare a variable outside the listener to keep track of the active marker
let currentMarker = null;

map.on('click', async function(e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;

    // Immediately remove the previous marker if it exists
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    try {
        const weather = await getWeather(lat, lon);
        console.log(weather); // DEBUG

        const current = weather.current || {};
        const temp = current.temperature_2m ?? "N/A";
        const humidity = current.relative_humidity_2m ?? "N/A";
        const wind = current.wind_speed_10m ?? "N/A";
        const rain = current.precipitation ?? "N/A";

        // Assign the new marker to the variable, add it, and open the popup
        currentMarker = L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`
                <b>Weather</b><br>
                🌡 Temperature: ${temp} °C<br>
                💧 Humidity: ${humidity}%<br>
                🌬 Wind speed: ${wind} km/h<br>
                ☔ Precipitation: ${rain} mm
            `)
            .openPopup();

    } catch (err) {
        console.error("Error:", err);

        // 4. Do the same for the error marker so it can also be cleared on the next click
        currentMarker = L.marker([lat, lon])
            .addTo(map)
            .bindPopup("Failed to load weather")
            .openPopup();
    }
});

*/


//users can click on the map to get the weather information for any  location. The getWeather function fetches the current temperature from the Open-Meteo API, and the addWeatherMarker function adds a marker to the map with a popup displaying the temperature.

//coordinate show
map.on('mousemove', function(e){

    document.getElementById('coords').innerHTML =
        `Lat: ${e.latlng.lat.toFixed(5)}
         Lon: ${e.latlng.lng.toFixed(5)}`;

});

