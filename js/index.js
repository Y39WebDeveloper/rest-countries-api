let x = document.querySelectorAll(".filter .option div");
let filter = document.querySelector(".filter");
filter.onclick = () => {
    filter.classList.toggle('active');
}

x.forEach(c => {
    c.onclick = function() {
        document.querySelector(".textBox").value = this.innerHTML;
    }
});