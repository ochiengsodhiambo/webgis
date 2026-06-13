### WebGIS Real-Time Weather Map

A lightweight interactive WebGIS application built with Leaflet.js that allows users to click anywhere on the map and retrieve real-time weather data, location names, and coordinates.

#### Features
- Interactive Leaflet map (OpenStreetMap base layer)
- Click anywhere to get:
- Real-time weather data
- Temperature
- Humidity
- Wind speed
- Precipitation
- Reverse geocoding (town / village / county name)
- Live date and time display
- Latitude and longitude coordinates
- Responsive popup design (mobile-friendly)
- Custom styled UI with adaptive popup layout

#### Technologies Used
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Leaflet.js
- Open-Meteo API (weather data)
- OpenStreetMap Nominatim (reverse geocoding)

#### Project Structure
webgis/
│
├── index.html        # Main web page
├── style.css         # Styling (map + popup UI)
├── app.js            # Map logic + weather API integration

#### How It Works
The map loads using Leaflet with OpenStreetMap tiles.
When a user clicks on the map:
Coordinates are captured
Reverse geocoding fetches location name
Open-Meteo API fetches real-time weather
A popup displays:
Location name
Coordinates
Date & time
Weather conditions

#### Setup Instructions
1. Clone the repository
git clone https://github.com/ochiengsodhiambo/webgis.git
2. Open project folder
cd webgis
3. Run locally

Open index.html in your browser:

start index.html

Or use VS Code Live Server extension for best experience.

#### APIs Used
- Weather API (Open-Meteo)
No API key required
Provides real-time weather data
Reverse Geocoding (Nominatim)
Converts coordinates → place names
Free and open service (rate-limited)
Responsive Design
Mobile-friendly popups
Adaptive font sizes
Optimized popup width for small screens

#### Example Output

**** When you click on the map: ****

📍 Mombasa
Lat: -4.0435
Lon: 39.6682

📅 13/06/2026
🕒 14:32:10

🌡️ Temperature: 27°C
💧 Humidity: 78%
💨 Wind Speed: 12 km/h
🌧️ Precipitation: 0 mm

#### Future Improvements
- Flood monitoring layer integration
- Fire detection (NASA FIRMS)
- Mangrove NDVI layers (Google Earth Engine)
- IoT sensor integration (real-time feeds)
- Data export (CSV / GeoJSON)
- Dashboard analytics panel

Author

Developed by Ochieng odhiambo

GIS & Remote Sensing | WebGIS Developer | Marine & Coastal Systems

#### License

This project is open-source and free to use for educational and research purposes.