const apiKey = "2969e89a86fc50bdf6179ecb9dc278da"
const weatherDataEle = document.querySelector(".weather-data");
const cityNameEle = document.querySelector("#city-name");
const formEle = document.querySelector("form");
const imgIcon = document.querySelector(".icon");

formEle.addEventListener("submit",(e)=>{

    e.preventDefault() // Prevent the form from submitting and refreshing the page
    
     const cityValue = cityNameEle.value

    getWeatherData(cityValue); // calling the function to get the weather data
})

 async function  getWeatherData(cityValue){

    try{
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric&units=metric`)
         if(!response.ok) {
            throw new Error("City not found");
         }

         const data = await response.json(); // converting the response to JSON format
         console.log(data); // logging the data to the console for debugging
         
         const temperature = Math.floor(data.main.temp); // getting the temperature from the data
         const description = data.weather[0].description  // getting the weather description
         const icon = data.weather[0].icon; // getting the weather icon


         const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        weatherDataEle.querySelector(".details").innerHTML = details.map(detail => `<p>${detail}</p>`).join(""); // displaying the details in the weather data element
         weatherDataEle.querySelector(".temp").textContent = `${temperature}°C`; // displaying the temperature
         weatherDataEle.querySelector(".desc").textContent = `${description}`; // displaying the weather description

         imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`

    }catch(err) {
        weatherDataEle.querySelector(".temp").textContent = ""
        imgIcon.innerHTML = ""
        weatherDataEle.querySelector(".desc").textContent = "An Error Occurred!"
    }


}