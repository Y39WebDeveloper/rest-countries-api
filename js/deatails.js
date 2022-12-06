let country = JSON.parse(localStorage.country);
let currency = Object.values(country.currencies);
let language = Object.values(country.languages);

let content = `<img class="flag" src="${country.flags.png}" alt="">
            <div class="description">
                <div class="name">${country.name.common}</div>
                <div class="info">
                    <ul>
                        <li><span>Native Name: </span>${country.name.common}</li>
                        <li><span>Population: </span>${country.population}</li>
                        <li><span>Region: </span>${country.continents}</li>
                        <li><span>Sub Region: </span>${country.subregion}</li>
                        <li><span>Capital: </span>${country.capital}</li>
                    </ul>
                    <ul>
                        <li><span>Top Level Domian: </span>${country.tld[0]}</li>
                        <li><span>Currency: </span>${currency[0].name}</li>
                        <li><span>Language: </span>${lang()}</li>
                    </ul>
                </div>
                <div class="border">
                    Border Countries:
                    <ul>
                        ${border()}
                    </ul>
                </div>
            </div>`;
function lang(){
    let cont = '';
    if(language.length <= 1){
        cont += `${language[0]}`;
    }else{
        for (let i = 0; i < language.length; i++) {
            cont += `${language[i]}, `;
        }
    }
    return cont;
}
function border(){
    try {
        let cont = '';
        for (let i = 0; i < country.borders.length; i++) {
            cont += `<li>${country.borders[i]}</li>`;
        }
        return cont;
    } catch (Unknown) {
        return Unknown = "unknown";
    }
}
document.querySelector(".country").innerHTML = content;

let colors = document.querySelector(':root');
localStorage.mode = "dark";


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
    }else if(localStorage.mode == "light"){
        colors.style.setProperty('--element', 'hsl(209, 23%, 22%)');
        colors.style.setProperty('--bg', 'hsl(207, 26%, 17%)');
        colors.style.setProperty('--text', 'hsl(0, 0%, 100%)');
        localStorage.mode = "dark";
        document.querySelector('#mode span').innerHTML = "Dark Mode";
    }
}