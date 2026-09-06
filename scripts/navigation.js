const button =
    document.querySelector("#nav-button");


const nav =
    document.querySelector("#nav-bar");


button.addEventListener("click", () => {


    button.classList.toggle("show");


    nav.classList.toggle("show");


});