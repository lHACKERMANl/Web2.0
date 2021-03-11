function addCode() {
    add_to_me.insertAdjacentHTML('beforeend', '\
    <div id="delete_but">\
    <ul class="weatherData">\
    <div class="hat">\
    <h3 class="CityStyle">Moscow</h3>\
    <p class="tempPsmall">8°C</p>\
    <img class="imgClassSmall" src="https://img.icons8.com/material/96/000000/cloud--v1.png"></img>\
    <button onclick="deleteBlock()" class="supreme">x</button>\
</div>\
<li><div class="weatherBlock"><p class="p1">Ветер</p><p class="p2">Modern</p></div></li>\
<li><div class="weatherBlock"><p class="p1">Облачность</p><p class="p2">Broken cloud</p></div></li>\
<li><div class="weatherBlock"><p class="p1">Давление</p><p class="p2">1013 hpa</p></div></li>\
<li><div class="weatherBlock"><p class="p1">Влажность</p><p class="p2">52%</p></div></li>\
<li><div class="weatherBlock"><p class="p1">Координаты</p><p class="p2">[59.88 , 30.42]</p></div></li>\
</ul>\
</div>\
    ');
    }



