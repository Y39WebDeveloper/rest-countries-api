let getData = function(apilink){
    return new Promise((resolve, reject) => {
        let myRequest = new XMLHttpRequest();

        myRequest.onload = function(){
            if(this.readyState === 4 && this.status === 200){
                resolve(JSON.parse(this.responseText));
            }else{
                reject(Error("Error"));
            }
        }

        myRequest.open("GET",apilink);
        myRequest.send();
    })
}
getData("https://restcountries.com/v3.1/all").then((countries) => {
    document.getElementById("search").onkeyup = () => {
        let content = '';
        let pays = [];
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].name.common.toLowerCase().includes(document.getElementById("search").value.toLowerCase())){
                if (countries[i].continents == document.querySelector(".textBox").dataset.selected || document.querySelector(".textBox").dataset.selected == "all"){
                    content += `<a href="details.html" class="country">
                    <img class="flag" src="${countries[i].flags.png}" alt="">
                    <div class="info">
                        <h3 class="title">${countries[i].name.common}</h3>
                        <ul>
                            <li><span>Population: </span>${countries[i].population}</li>
                            <li><span>Region: </span>${countries[i].continents}</li>
                            <li><span>Capital: </span>${countries[i].capital}</li>
                        </ul>
                    </div>
                    </a>`;
                    pays.push(countries[i]);
                }
            }
        }
        document.getElementById("countries").innerHTML = content;
        saveInStorage(pays);
    }
    function showCountries(){
        let content = '';
        let pays = [];
        for (let i = 0; i < countries.length; i++) {
            if (countries[i].continents == document.querySelector(".textBox").dataset.selected || document.querySelector(".textBox").dataset.selected == "all") {
                content += `<a href="details.html" class="country">
                <img class="flag" src="${countries[i].flags.png}" alt="">
                <div class="info">
                    <h3 class="title">${countries[i].name.common}</h3>
                    <ul>
                        <li><span>Population: </span>${countries[i].population}</li>
                        <li><span>Region: </span>${countries[i].continents}</li>
                        <li><span>Capital: </span>${countries[i].capital}</li>
                    </ul>
                </div>
                </a>`;
                pays.push(countries[i]);
            }
        }
        document.getElementById("countries").innerHTML = content;
        saveInStorage(pays);
    }
    showCountries();
    /* Filter */
    let x = document.querySelectorAll(".filter .option div");
    let filter = document.querySelector(".filter");
    filter.onclick = () => {
        filter.classList.toggle('active');
    }
    x.forEach(c => {
        c.onclick = function(){
            if (this.dataset.continent) {
                document.querySelector(".textBox").value = this.dataset.continent;
                document.querySelector(".textBox").dataset.selected = this.dataset.continent;
            } else {
                document.querySelector(".textBox").value = "Filter by Region";
                document.querySelector(".textBox").dataset.selected = "all";
            }
            showCountries();
        }
    });
    /* filter */
    function saveInStorage(pays){
        let v = document.querySelectorAll(".country");
        for (let i = 0; i < v.length; i++) {
            v[i].onclick = function () {
                localStorage.country = JSON.stringify(pays[i]);
            }
        }
    }
});


let colors = document.querySelector(':root');

if (localStorage.mode == "light") {
    colors.style.setProperty('--element', 'hsl(0, 0%, 100%)');
    colors.style.setProperty('--bg', 'hsl(0, 0%, 94%)');
    colors.style.setProperty('--text', 'hsl(200, 15%, 8%)');
    document.querySelector('#mode span').innerHTML = "Light Mode";
} else if (localStorage.mode == "dark") {
    colors.style.setProperty('--element', 'hsl(209, 23%, 22%)');
    colors.style.setProperty('--bg', 'hsl(207, 26%, 17%)');
    colors.style.setProperty('--text', 'hsl(0, 0%, 100%)');
    document.querySelector('#mode span').innerHTML = "Dark Mode";
}

let modeBtn = document.getElementById("mode");
modeBtn.onclick = () => {
    if (localStorage.mode == "dark") {
        colors.style.setProperty('--element', 'hsl(0, 0%, 100%)');
        colors.style.setProperty('--bg', 'hsl(0, 0%, 94%)');
        colors.style.setProperty('--text', 'hsl(200, 15%, 8%)');
        localStorage.mode = "light";
        document.querySelector('#mode span').innerHTML = "Light Mode";
    } else if (localStorage.mode == "light") {
        colors.style.setProperty('--element', 'hsl(209, 23%, 22%)');
        colors.style.setProperty('--bg', 'hsl(207, 26%, 17%)');
        colors.style.setProperty('--text', 'hsl(0, 0%, 100%)');
        localStorage.mode = "dark";
        document.querySelector('#mode span').innerHTML = "Dark Mode";
    }
}