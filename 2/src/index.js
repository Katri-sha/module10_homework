const button = document.querySelector("button");

function showSize() {
    const x = window.screen.width;
    const y = window.screen.height;
    const x1 = window.innerWidth;
    const y1 = window.innerHeight;
    alert(`Размеры экрана монитора: ширина - ${x} px, высота - ${y} px`);
    alert(`Размеры окна браузера: ширина - ${x1} px, высота - ${y1} px`);
}
button.addEventListener("click", () => {
    showSize();
});