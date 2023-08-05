const addBtn = document.querySelector(".addbtn");
const apikey = "500fac3c197d5aaa63483a5f8079573a";

let record = new Set();
const listOfResultedData = []

addBtn.addEventListener("click",(e)=>{
    //addBtn.removeEventListener("click", ()=>{});
    e.preventDefault();
    let inputCity = document.getElementById("input").value;
     let cityName = inputCity.trim();
    // console.log(cityName);
     if(cityName===""){
        alert("Please enter city name");
     }
    async function FetchWeatherData(){
        try{

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`
        const response = await fetch(url,{method:"GET"});
        if(!response.ok){
            throw new Error("Network response is not ok")
        }
        const result = await response.json();
       // console.log(result);
        if(isPresentAlready(result.name.toLowerCase())){
            alert("Already present")
        }else{
            record.add(result.name.toLowerCase());
            listOfResultedData.push(result);
            listOfResultedData.sort((a,b)=>{
                return a.main.temp - b.main.temp;
            })
            const container = document.querySelector(".container");
            container.innerHTML = "";
           ShowOntoUI(result);
        }
    }catch(error){
        alert("Please Enter Full City Name Or write Correct Spelling",error);
    }
      }
     FetchWeatherData();
})
function isPresentAlready(nameofcity){
    if(record.has(nameofcity)){
        return true;
    }else{
        return false;
    }
}
const container = document.querySelector(".container");
function ShowOntoUI(Data){
    listOfResultedData.forEach((Data)=>{
       const item = Data;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML=`
    <div class="top">
            <div class="left">
                <span>${item.main.temp}°</span>
            </div>
            <div class="right">
              <img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="">
            </div>
    </div>
    <div class="bottom">
        <div class="left">
            <p>H:${item.main.temp_max}°-L:${item.main.temp_min}°</p>
            <span class="cityname">${item.name}</span>
        </div>
        <div class="right">
            <p>${item.weather[0].description}</p>
        </div>
    </div>
    `
    container.appendChild(card);
    })

   document.getElementById("input").value = "";
}
