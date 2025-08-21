const cuenta = document.getElementById("cuenta");
const aside2 = document.querySelector(".vector");

document.getElementById('btn').addEventListener('click', ()=> {document.getElementById('aside').classList.toggle('invisible');});

window.addEventListener("load", () => { // agrega evento a la ventana al cargar
  const alinear = () => {
    const rect = cuenta.getBoundingClientRect();
    aside2.style.left = rect.left - 225 + "px"; 
  };

  alinear();
  window.addEventListener("resize", alinear);
});

cuenta.addEventListener('click', ()=> {aside2.classList.toggle('bye');});

document.getElementById('guia').addEventListener('click', ()=>{window.open("https://arieltobar911.github.io/info/", "_blank");});
document.getElementById('year').textContent = new Date().getFullYear();
