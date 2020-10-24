const key = '&appid=90d09eb7cd3006afae982b7097c6c2d2'
const days = 5
const currenturlquery = 'https://api.openweathermap.org/data/2.5/weather?q=' 
const UVUrl = 'https://api.openweathermap.org/data/2.5/uvi/forecast?lat='
const futureurlquery = 'https://api.openweathermap.org/data/2.5/forecast?q='


const button = document.querySelector("button");
button.addEventListener("click",function(event){
    event.preventDefault()
    begin()
    store()
})

function begin(){
    const currentDay = moment().format('M/D/YYYY')
    const city =  document.querySelector("#search").value
    const c = document.querySelector("#city")
    
    c.textContent = city + " (" + currentDay + ")"
  
    $.ajax({
        url: currenturlquery + city +key
    }).then(process).then(future(city)).catch(error)
}

function process(response){
    //console.log(response)
    const temp = Math.floor((response.main.temp - 273.15))
    const humidity = response.main.humidity
    const wind = response.wind.speed
    const lon = response.coord.lon
    const lat = response.coord.lat
    const weather = response.weather[0].main
    const img = document.querySelector("#weather")
    console.log(weather)
     
    if(weather == 'Clouds' || weather == 'Haze'){
        console.log("here")
        img.src =  './Assets/clouds.png'
    }
    if(weather == 'Clear'){ 
        img.src = 'Assets/sunny.png'
    }
    if(weather == 'Rain'){ 
        img.src = 'Assets/rainy.png'
    }
    if(weather == 'Snow'){
        let src = 'Assets/snow.png'
    }
    img.setAttribute("class","img")
    //console.log('temp',temp)
    
    const temperature = document.querySelector("#temperature")
    temperature.textContent ="Temperature: "+ temp + "°C"
    //console.log('humidity',humidity)
    const hum = document.querySelector("#Humidity")
    hum.textContent ="Humidity: " + humidity + "%"
    //console.log('wind',wind)
    const win = document.querySelector("#wind")
    win.textContent ="Wind Speed: " + wind + "MPH"
    //console.log('lon',lon)
    //console.log('lat',lat)

    $.ajax({
        url: UVUrl + lat + "&lon=" + lon + key
    }).then(function(data){
        const uv = data[0].value
        //console.log('uv',uv)
        const u_v =  document.querySelector("#uv_span")
        u_v.textContent = uv
        u_v.style.height = "10px"
       if(uv < 3){
            u_v.style.backgroundColor = "green"; 
       }if(uv >= 3 && uv <= 5){
            u_v.style.backgroundColor = "yellow"
       }if(uv >5){
            u_v.style.backgroundColor = "red"
       }
    }).catch(error)
     
}

function error(error){
    console.log(error)
}

function future(city){
     
    let nextDay = moment().add(1,'days').format('M/D/YYYY')
    let afterNextDay = moment().add(2,'days').format('M/D/YYYY')
    let day_3 = moment().add(3,'days').format('M/D/YYYY')
    let day_4 = moment().add(4,'days').format('M/D/YYYY')
    let day_5 = moment().add(5,'days').format('M/D/YYYY')

    const dates = document.querySelectorAll(".date")
    const Tempera = document.querySelectorAll(".temperature")
    const humi = document.querySelectorAll(".Humidity")
    const board = document.querySelectorAll(".board")
    const img = document.querySelectorAll(".weather")


    let tempArray = []
    let humArray=[]
    let weatherArray = []
    tempArray.length = 5
    humArray.length = 5

    dates.forEach(function(){
        dates[0].textContent = nextDay
        dates[1].textContent = afterNextDay
        dates[2].textContent = day_3
        dates[3].textContent = day_4
        dates[4].textContent = day_5
    })
    nextDay = moment().add(1,'days').format('YYYY-M-D')
    afterNextDay = moment().add(2,'days').format('YYYY-M-D')
    day_3 = moment().add(3,'days').format('YYYY-M-D')
    day_4 = moment().add(4,'days').format('YYYY-M-D')
    day_5 = moment().add(5,'days').format('YYYY-M-D')

    $.ajax({
        url : futureurlquery + city + key
    }).then(function(data){
        //console.log(data,'hello')
        //console.log(data.list[0].dt_txt)
        data.list.forEach(function(){
            for(datas of data.list){
                //console.log(datas.dt_txt)
                if(datas.dt_txt == nextDay + " 00:00:00"){
                    tempArray[0] = Math.floor(datas.main.temp - 273.15)
                    humArray[0] = datas.main.humidity
                    weatherArray[0] = datas.weather[0].main
                } 
                if(datas.dt_txt == afterNextDay + " 00:00:00"){
                    tempArray[1] = Math.floor(datas.main.temp - 273.15)
                    humArray[1] = datas.main.humidity
                    weatherArray[1] = datas.weather[0].main
                } 
                if(datas.dt_txt == day_3 + " 00:00:00"){
                    tempArray[2] = Math.floor(datas.main.temp - 273.15)
                    humArray[2] = datas.main.humidity
                    weatherArray[2] = datas.weather[0].main
                }
                if(datas.dt_txt == day_4 + " 00:00:00"){
                    tempArray[3] = Math.floor(datas.main.temp - 273.15)
                    humArray[3] = datas.main.humidity
                    weatherArray[3] = datas.weather[0].main
                }
                if(datas.dt_txt == day_5 + " 00:00:00"){
                    tempArray[4] = Math.floor(datas.main.temp - 273.15)
                    humArray[4] = datas.main.humidity
                    weatherArray[4] = datas.weather[0].main
                }
            }
        })


        //console.log(tempArray)
        //console.log(humArray)
        img.forEach(function(){
            for(index = 0; index < weatherArray.length; index++){
                if(weatherArray[index] == 'Clouds' || weatherArray[index]  == 'Haze'){
                    console.log("here")
                    img[index].src =  './Assets/clouds.png'
                }
                if(weatherArray[index]  == 'Clear'){ 
                    img[index].src = 'Assets/sunny.png'
                }
                if(weatherArray[index]  == 'Rain'){ 
                    img[index].src = 'Assets/rainy.png'
                }
                if(weatherArray[index]  == 'Snow'){
                    img[index].src = 'Assets/snow.png'
                }
                img[index].style.display = "block";
            }

        })
        Tempera.forEach(function(){
            Tempera[0].textContent = "Temp: " + tempArray[0] + "°C"
            Tempera[1].textContent = "Temp: " + tempArray[1] + "°C"
            Tempera[2].textContent = "Temp: " + tempArray[2] + "°c"
            Tempera[3].textContent = "Temp: " + tempArray[3] + "°C"
            Tempera[4].textContent = "Temp: " + tempArray[4] + "°C"
        })

        humi.forEach(function(){
            humi[0].textContent = "Humidity: " + humArray[0] + "%"
            humi[1].textContent = "Humidity: " + humArray[1] + "%"
            humi[2].textContent = "Humidity: " + humArray[2] + "%"
            humi[3].textContent = "Humidity: " + humArray[3] + "%"
            humi[4].textContent = "Humidity: " + humArray[4] + "%"
            
        })

    }).catch(error)
}

function store(){
    const cityName =  document.querySelector("#search").value
    const historic = document.querySelector("#historic")
    const p = document.createElement("button")
    let value = JSON.parse(localStorage.getItem("city"))
    let cityObject = {
        city : cityName
    }

    if(value == null){
        console.log("here")
        localStorage.setItem('city',JSON.stringify(cityObject))
        historic.append(p)
        p.textContent = cityName
        p.setAttribute("class",'btn btn-outline-secondary button')
        p.id = cityName
        p.addEventListener("click",function(event){
            event.preventDefault()
            const currentDay = moment().format('M/D/YYYY')
            const c = document.querySelector("#city")
            c.textContent = p.id + " (" + currentDay + ")"
             $.ajax({
                url: currenturlquery + p.id +key
            }).then(process).then(future(p.id)).catch(error)
            })
    }else{ 
        console.log("im here")
        value.city +=","+ cityName
        localStorage.setItem('city',JSON.stringify(value))
        let array = value.city.split(',') 
        for(cities of array){
            p.textContent = ""
            p.textContent = cities
            historic.append(p)
            p.setAttribute("class",'btn btn-outline-secondary button')
            p.id =cityName
        }
        p.addEventListener("click",function(event){
            event.preventDefault()
            const currentDay = moment().format('M/D/YYYY')
            const c = document.querySelector("#city")
            c.textContent = p.id + " (" + currentDay + ")"
             $.ajax({
                url: currenturlquery + p.id +key
            }).then(process).then(future(p.id)).catch(error)
            })
    }
    
}