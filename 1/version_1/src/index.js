const button = document.querySelector(".button");

button.addEventListener("click", () => {
changeImg();
});

function changeImg() {
    const icon1 = document.querySelector(".icon-start");
    const icon2 = document.querySelector(".icon-end");
    if (icon1.style.display === "block") {
        icon1.style.display = "none";
        icon2.style.display = "block";
    } else {
        icon1.style.display = "block";
        icon2.style.display = "none";
}
} 