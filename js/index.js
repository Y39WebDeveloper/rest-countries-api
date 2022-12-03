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
                }
            }
        }
        document.getElementById("countries").innerHTML = content;
    }
    function showCountries(){
        let content = '';
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
            }
        }
        document.getElementById("countries").innerHTML = content;
    }
    showCountries();
    /* Filter */
    let x = document.querySelectorAll(".filter .option div");
    let filter = document.querySelector(".filter");
    filter.onclick = () => {
        filter.classList.toggle('active');
    }
    x.forEach(c => {
    c.onclick = function() {
        if(this.dataset.continent){
            document.querySelector(".textBox").value = this.dataset.continent;
            document.querySelector(".textBox").dataset.selected = this.dataset.continent;
        }else{
            document.querySelector(".textBox").value = "Filter by Region";
            document.querySelector(".textBox").dataset.selected = "all";
        }
        showCountries();
    }
    /* filter */
});
})