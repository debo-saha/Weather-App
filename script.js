const input=document.getElementById("input");
const place_name=document.querySelector(".place");
const realtime=document.querySelector(".realtime");
const weatherType=document.querySelector(".weatherType");
const weatherImage=document.querySelector(".weatherImage");
const temp=document.querySelector(".temp");
const mintemp=document.querySelector(".mintemp");
const maxtemp=document.querySelector(".maxtemp");

const feelslike=document.querySelector(".feelslike");
const humidity=document.querySelector(".humidity");
const wind=document.querySelector(".wind");
const Pressure=document.querySelector(".Pressure");


const button=document.querySelector(".search_button")




let city="pune";
let url;
url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=
95fb090ce3fa823476417db75a976235`
const searchByCity=()=>{
    city=input.value;
    console.log(city);    
    url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=
95fb090ce3fa823476417db75a976235`
getWeatherData();
input.value=""
}
button.addEventListener("click",searchByCity);




const getFullCountryName=(code)=>{
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

return (regionNames.of(`${code}`));
}

const getRealDate=(code)=>{
const currentDate= new Date(code*1000);
const options={
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric",
    hour:"numeric",
    minute:"numeric",
}

const formatter= new Intl.DateTimeFormat("en-us",options);

const formatDate =formatter.format(currentDate)

return formatDate
}


function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}
const getWeatherData= async()=>{
    try {
        const res=await fetch(url,{
            headers:{
                Accept:'application/json',
            },
        });
        const data= await res.json();
        console.log(data)
        console.log(data.wind.speed) 
        console.log(data.main.feels_like) 



        console.log(data.weather[0].icon) 








        place_name.innerHTML=`${data.name}, ${getFullCountryName(data.sys.country)}`;
        realtime.innerHTML=`${getRealDate(data.dt)}`
        weatherType.innerHTML=`${data.weather[0].main}`
        temp.innerHTML=`${kelvinToCelsius(data.main.temp)}&#176`
        mintemp.innerHTML=`Min : ${kelvinToCelsius(data.main.temp_min)}&#176`
        maxtemp.innerHTML=`Max : ${kelvinToCelsius(data.main.temp_max)}&#176`
        humidity.innerHTML=`${data.main.humidity} %`
        Pressure.innerHTML=`${data.main.pressure} mbar`
        feelslike.innerHTML=`${kelvinToCelsius(data.main.feels_like)}&#176`
        wind.innerHTML=`${data.wind.speed} KMPH`;
        weatherImage.innerHTML=`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`

    
    } catch (error) {
        console.log(error)
    }
}


document.body.addEventListener("load",getWeatherData());