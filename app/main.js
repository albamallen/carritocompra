window.onload = () =>{
// galeria


    let imgactual = 0;

    let miniaturas = document.querySelectorAll(`.mini`);

    let btnIzq = document.querySelector("#izq");
    btnIzq.addEventListener("click",() => {
        imgactual == 0 ? imgactual = miniaturas.length-1 : imgactual--;
        cambioimagen(miniaturas[imgactual]);
    })

    let btnDrch = document.querySelector("#drch");
    btnDrch.addEventListener("click",() => {
        imgactual == miniaturas.length-1 ? imgactual = 0: imgactual++;
        cambioimagen(miniaturas[imgactual]);
    })

/** Boiler Galería simple */
let cambioimagen = (item) => {
    let imagengrande = document.querySelector("#caja");
	imagengrande.src = item.src;
    imagengrande.alt = item.alt;

    miniaturas.forEach(element => {
        element.classList.remove("active")
    })
    item.classList.add("active");
};

miniaturas.forEach(item => {
    item.addEventListener('click', event => {
        imgactual = item.dataset.num;
        cambioimagen(item);
    })
})



}

