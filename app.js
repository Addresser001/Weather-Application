const searchForm = document.querySelector('.form');
const display = document.querySelector('.inforTemplate')
const button = document.querySelector('.button')




const weatherInfo = async()=>{
   
    try{
        let cityName = searchForm.inputValue.value;
        const apiKey = 'c08b1e63bd95bb2c1c1773a801bb2ac7'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
        const { main, sys, weather, name } = data;
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

        const template =`
        <div class="weatherOutput">
        <button type="button" class="closeBtn"><i class="material-icons">close</i></button>
        <h2 class="city">${name} <span ><sup class="country"><small>${sys.country}</small></sup></span></h2>
        <h1 class="temp">${Math.round(main.temp)}<sup><sup><small>o</small></sup>C</sup></h1>

        <figure><img class="icon" src=${icon}></img>
        <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
        </div>
        `
        display.innerHTML =template;

        const closeBtn= document.querySelector('.closeBtn');

        closeBtn.addEventListener('click', e=>{
            display.style.display='none';
            location.reload();
        });

    }
    catch{
        display.innerText ='Please enter a valid City! Or Check your internet connection!'
    }
}



button.addEventListener('click',e=>{
    e.preventDefault();
    weatherInfo();
    searchForm.inputValue.value ='';
    searchForm.inputValue.focus();
});

