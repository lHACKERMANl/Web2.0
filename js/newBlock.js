var request = new XMLHttpRequest();
let ItemArray = [];
let apiKey = "ebfa87e4d112fd5614094678d7b9224d";

function search() {
  if(event.key === 'Enter') {
      //alert(ele.value);  
      addCode();      
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function hideLoadingLayer(){
    //let new_city = document.getElementById("new_city");
    document.getElementById("loading_layer").style.visibility="hidden";
    alert("hi");
}

function deleteBlock(but){
  let city = but.id;
  localStorage.removeItem(city);
  let elem = document.getElementById(city);
  elem.parentNode.removeChild(elem);
}

function addCode() {
  if(document.getElementById("new_city").value == ""){
    alert("Введите город");
  }
  if(window.navigator.onLine == false)
  {
    alert("У вас есть интернет?");
  }
  if(window.navigator.onLine == true && document.getElementById("new_city").value != "")
  {
    try
    {

      add_to_me.insertAdjacentHTML(`beforeend`,`<div class="load">Loading...</div>`); 
      let new_city = document.getElementById("new_city");
      let city = new_city.value;
      document.getElementById("new_city").value="";
      let url = new URL("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric");
    
      request.open ("GET", url, true);
    
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          var data = JSON.parse(request.responseText);
          //console.log(data);//imgClassBig
          var imgSmall = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png"></img>`;
          var weather__city = data.name;
          var temperature = data.main.temp + "°C";
          var humidity = data.main.humidity;
          var wind_speed = data.wind.speed + "м/с";
          var feels_like = data.main.feels_like + "°C";
          var pressure = data.main.pressure;
          var id = data.sys.id;
          var country = data.sys.country; //<img class="imgClassSmall" src="https://img.icons8.com/material/96/000000/cloud--v1.png"></img>
          document.querySelector('.load').remove();
          var RandomId = getRandomInt(1000);
          localStorage.setItem(RandomId, weather__city);
          AddNewForm(temperature,imgSmall,humidity,wind_speed,feels_like,pressure,country,RandomId);
          //console.log(weather__city);
          //ItemArray.push(weather__city)
        } else {
          console.log("Error with api!");
          alert("Города нет. Прости(");
          document.querySelector('.load').remove();
        }
      };

      request.onreadystatechange=function() {
        if (request.readyState === 4){   
            if(request.status === 200){ 
                //success
            } else {
                if (!navigator.onLine){
                  alert("Не выключайте интернет ( \nКотята грустят ((("); 
                  document.querySelector('.load').remove();
                }
            }
        } 
    }    

      request.send();

    }catch(exception){
        alert('There was a network error.');
    }
  }
    }

    function AddNewForm(temperature,imgSmall,humidity,wind_speed,feels_like,pressure,country,weather__city){
      try{
        add_to_me.insertAdjacentHTML('beforeend',` 
        <div id="`+weather__city+`">
        <ul class="weatherData">
        <div class="hat">
        <h3 class="CityStyle">`+localStorage.getItem(weather__city)+`</h3>
        <p class="tempPsmall">`+temperature+`</p>
        `+imgSmall+`
        <button onclick="deleteBlock(this)" id="`+weather__city+`" class="supreme">x</button>
        </div>
        <li><div class="weatherBlock"><p class="p1">Влажность</p><p class="p2">`+humidity+`</p></div></li>
        <li><div class="weatherBlock"><p class="p1">Скорость ветра</p><p class="p2">`+wind_speed+`</p></div></li>
        <li><div class="weatherBlock"><p class="p1">Чувствуется как</p><p class="p2">`+feels_like+`</p></div></li>
        <li><div class="weatherBlock"><p class="p1">Давление</p><p class="p2">`+pressure+`</p></div></li>
        <li><div class="weatherBlock"><p class="p1">Страна</p><p class="p2">`+country+`</p></div></li>
        </ul>
        </div>
    
    `);
      }catch(exception){
        if(exception.name == 'NetworkError'){
          alert('There was a network error.');
       }
      }
    }
    
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
      try
      {
        request.open ("GET", url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
              var data = JSON.parse(request.responseText);
              //console.log(data);//imgClassBig
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

          request.onreadystatechange=function() {
            if (request.readyState === 4){  
                if(request.status === 200){ 
                    //success
                } else {
                  alert("Не выключайте интернет ( \n Котята грустят ((("); 
                }
            } 
        }    
          
    request.send();
      }catch(exception){
          alert('There was a network error.');
      }
    }


  function UpdateLocation(){

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

  }

  var count = 0;
  function autoLoad(){
    if(localStorage.length != 0){
      if(localStorage.length > count){
        //console.log(localStorage.key(count));
        let curKey = localStorage.key(count);
        let curCity = localStorage.getItem(curKey);
        addCodeNew(curKey, curCity);
        count++;
        autoLoad();
      }
      else{
        //console.log("X");
      }
    }
  }


  function addCodeNew(key, city) {  
    var subRequest = new XMLHttpRequest();
    //console.log("test");
    let url = new URL("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric");
  
    subRequest.open ("GET", url, true);
  
    subRequest.onload = function() {
      if (subRequest.status >= 200 && subRequest.status < 400) {
        var data = JSON.parse(subRequest.responseText);
        //console.log(data);//imgClassBig
        var imgSmall = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png"></img>`;
        var weather__city = data.name;
        var temperature = data.main.temp.toFixed() + "°C";
        var humidity = data.main.humidity;
        var wind_speed = data.wind.speed + "м/с";
        var feels_like = data.main.feels_like + "°C";
        var pressure = data.main.pressure;
        var RandomId = key;
        var country = data.sys.country; //<img class="imgClassSmall" src="https://img.icons8.com/material/96/000000/cloud--v1.png"></img>
        AddNewForm(temperature,imgSmall,humidity,wind_speed,feels_like,pressure,country,RandomId);
        //localStorage.setItem(weather__city, weather__city);
        //ItemArray.push(weather__city)
        console.log(weather__city);
      } else {
        console.log("Error with api!");
        alert("Города нет. Прости(");
      }
    };

    subRequest.send();
  }

  try
  {

    let autoLoadVar = document.getElementById("auto");
    window.addEventListener("load", autoLoad);
  
    let updateVar = document.getElementById("Update");
    updateVar.addEventListener("click",UpdateLocation);
  
    let addVar = document.getElementById("add");
    addVar.addEventListener("click", addCode);
  
    let loadHideVar = document.getElementById("loading_layer");
    loadHideVar.addEventListener("load", hideLoadingLayer);
  
    let keyVar = document.getElementById("new_city");
    document.addEventListener("keydown", search);

  }catch(e){
    console.log(e);
  }