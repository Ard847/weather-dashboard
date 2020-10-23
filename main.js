
const key = '&appid=90d09eb7cd3006afae982b7097c6c2d2'
const days = 5
const currenturlquery = 'https://api.openweathermap.org/data/2.5/weather?q=' 
const UVUrl = 'https://api.openweathermap.org/data/2.5/uvi/forecast?lat='
const futureurlquery = 'https://api.openweathermap.org/data/2.5/forecast?q='


const button = document.querySelector("button");
button.addEventListener("click",function(){
    begin()
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
    const temp = response.main.temp
    const humidity = response.main.humidity
    const wind = response.wind.speed
    const lon = response.coord.lon
    const lat = response.coord.lat
    //console.log('temp',temp)
    const temperature = document.querySelector("#temperature")
    temperature.textContent ="Temperature: "+ temp + "°F"
    //console.log('humidity',humidity)
    const hum= document.querySelector("#Humidity")
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
        const U_V = document.querySelector("#UV")
        U_V.textContent ="UV index: " + uv
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


    let tempArray = []
    let humArray=[]
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
                    tempArray[0] = datas.main.temp
                    humArray[0] = datas.main.humidity
                } 
                if(datas.dt_txt == afterNextDay + " 00:00:00"){
                    tempArray[1] = datas.main.temp
                    humArray[1] = datas.main.humidity
                } 
                if(datas.dt_txt == day_3 + " 00:00:00"){
                    tempArray[2] = datas.main.temp
                    humArray[2] = datas.main.humidity

                }
                if(datas.dt_txt == day_4 + " 00:00:00"){
                    tempArray[3] = datas.main.temp
                    humArray[3] = datas.main.humidity

                }
                if(datas.dt_txt == day_5 + " 00:00:00"){
                    tempArray[4] = datas.main.temp
                    humArray[4] = datas.main.humidity
                }
            }
        })
        //console.log(tempArray)
        //console.log(humArray)
        Tempera.forEach(function(){
            Tempera[0].textContent = "Temp: " + tempArray[0] + "°F"
            Tempera[1].textContent = "Temp: " + tempArray[1] + "°F"
            Tempera[2].textContent = "Temp: " + tempArray[2] + "°F"
            Tempera[3].textContent = "Temp: " + tempArray[3] + "°F"
            Tempera[4].textContent = "Temp: " + tempArray[4] + "°F"
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