var request = new XMLHttpRequest();
var localStorage = [];

function onload(){
    //let new_city = document.getElementById("new_city");
}

function deleteBlock(but){
  let city = but.id;
  let elem = document.getElementById(city);
  elem.parentNode.removeChild(elem);
}

function addCode() {  
  let new_city = document.getElementById("new_city");
  let city = new_city.value;
let url = new URL("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric");

request.open ("GET", url, true);

request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      console.log(data);//imgClassBig
      var imgSmall = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png"></img>`;
      var weather__city = data.name;
      var temperature = data.main.temp + "°C";
      var humidity = data.main.humidity;
      var wind_speed = data.wind.speed + "м/с";
      var feels_like = data.main.feels_like + "°C";
      var pressure = data.main.pressure;
      var country = data.sys.country; //<img class="imgClassSmall" src="https://img.icons8.com/material/96/000000/cloud--v1.png"></img>
      AddNewForm(temperature,imgSmall,humidity,wind_speed,feels_like,pressure,country);
    } else {
      console.log("Error with api!");
      alert("Города нет. Прости(");
    }
  };
request.send();
    }

    function AddNewForm(temperature,imgSmall,humidity,wind_speed,feels_like,pressure,country){
      //localStorage.push(new_city.value);
      add_to_me.insertAdjacentHTML('beforeend',` 
      <div id="`+new_city.value+`">
      <ul class="weatherData">
      <div class="hat">
      <h3 class="CityStyle">`+new_city.value+`</h3>
      <p class="tempPsmall">`+temperature+`</p>
      `+imgSmall+`
      <button onclick="deleteBlock(this)" id="`+new_city.value+`" class="supreme">x</button>
      </div>
      <li><div class="weatherBlock"><p class="p1">Влажность</p><p class="p2">`+humidity+`</p></div></li>
      <li><div class="weatherBlock"><p class="p1">Скорость ветра</p><p class="p2">`+wind_speed+`</p></div></li>
      <li><div class="weatherBlock"><p class="p1">Чувствуется как</p><p class="p2">`+feels_like+`</p></div></li>
      <li><div class="weatherBlock"><p class="p1">Давление</p><p class="p2">`+pressure+`</p></div></li>
      <li><div class="weatherBlock"><p class="p1">Страна</p><p class="p2">`+country+`</p></div></li>
      </ul>
      </div>
  
  `);
    }

    let apiKey = "ebfa87e4d112fd5614094678d7b9224d";
    
    if (!navigator.geolocation) 
    {
        let city = "moscow";
        var url = new URL("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric");
    }

    navigator.geolocation.getCurrentPosition(
        function (location) {
            let lat  = location.coords.latitude;
            let lon = location.coords.longitude;
            //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
            var url = new URL("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units=metric");

            GetMainData(url);
        },
        function () {
            alert("Доступ к геопозиции запрещен")
            let city = "moscow";
            var url = new URL("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric");

            GetMainData(url);
        }
    )

    function GetMainData(url){
        request.open ("GET", url, true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                  var data = JSON.parse(request.responseText);
                  console.log(data);//imgClassBig
                  document.querySelector('.imgClassBig').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png"></img>`;
                  document.querySelector('.cur_weather__city').textContent = data.name;
                  document.querySelector('.tempP').innerHTML = data.main.temp + "°C";
                  document.querySelector('.cur_first').innerHTML = data.main.humidity;
                  document.querySelector('.wind_speed').innerHTML = data.wind.speed + "м/с";
                  document.querySelector('.cur_feels_like').innerHTML = data.main.feels_like + "°C";
                  document.querySelector('.cur_pressure').innerHTML = data.main.pressure;
                  document.querySelector('.cur_country').innerHTML = data.sys.country;
                } else {
                  console.log("Error with api!");
                }
              };
              
        request.send();
    }