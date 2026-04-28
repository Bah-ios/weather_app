const history = JSON.parse(localStorage.getItem("town")) || [];

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
            document.getElementById("result").innerHTML = `<p>${data.message} Try again.</p>`
            return
        }
        if(!history.includes(city)){
            history.push(city)
            if(history.length === 6){
                history.shift()
            }
            
        }

        localStorage.setItem("town", JSON.stringify(history));
        const historyList = document.getElementById("historyList");
        historyList.innerHTML = "";
        const stored = JSON.parse(localStorage.getItem("town")) || [];
        
        stored.forEach(element => {
            const list = document.createElement("li");
            list.textContent = element;
            historyList.appendChild(list);
        });
        
        
        
        
        
        

        const condition = data.weather[0].id;
        
        if(condition === 800){
            // document.body.style.backgroundColor = '#3084f1 ';
            document.body.classList.add('sunny-background')
        }
        if(condition >= 801 &&  condition <= 804){
            // document.body.style.backgroundColor = '#53789E '
            document.body.classList.add('cloudy-background') 
        }
        if(condition >= 300 && condition <= 321 || condition >=500 && condition <= 531 ){
            document.body.classList.add('rainy-background')
        }
        const timeCalculated = data.dt;
        const shift = data.timezone;
        const time = new Date((timeCalculated + shift) * 1000)
        
        const hours = time.getUTCHours().toString().padStart(2,"0")
        const minutes = time.getUTCMinutes().toString().padStart(2,"0")
        const day = time.toLocaleDateString("en-US",   
             {  weekday: "long", 
              timeZone: "UTC"
             });
        document.getElementById("result").innerHTML = "<p>Loading...</p>";
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


        document.getElementById("result").innerHTML = `
        <img src= ${iconUrl} alt="weather icon"/>
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>🌤️ Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
        <p>⌚ Time: ${day} ${hours}:${minutes} </p>
        `;
        
        }
    catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerHTML = "<p>Something went wrong. Check your connection.</p>";
  }
    
}
document.getElementById("userinput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") getWeather();
});

