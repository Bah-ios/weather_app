async function getWeather() {
    const city = document.getElementById("userinput").value;
    
    if (!city ){
        alert("Enter a city to search")
        return}
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=607d626a1af861486d45b070d3947bc3&units=metric`)
        const data = await response.json();
        console.log(data);
        
        if(data.cod === "404"){
            document.getElementById("result").innerHTML = "<p>City not found. Try again.</p>"
            return
        }


        document.getElementById("result").innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>🌤️ Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
        `;
        }
    catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerHTML = "<p>Something went wrong. Check your connection.</p>";
  }
    
}

