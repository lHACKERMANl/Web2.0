let apiKey = "ebfa87e4d112fd5614094678d7b9224d";
let city = "chita";
let url = "api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;



 axios.get(url).then(res => {
    console.log(res.data);
    //добавляем название города
    //document.querySelector('.weather__city').textContent = data.name;
    //data.main.temp содержит значение в Кельвинах, отнимаем от 273, чтобы получить значение в градусах Цельсия
    //document.querySelector('.weather__forecast').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
    //Добавляем описание погоды
    //document.querySelector('.weather__desc').textContent = data.weather[0]['description'];
    //Добавляем иконку погоды
    //document.querySelector('.weather__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    })
    .catch(function () {
        console.log("nope");
    });
