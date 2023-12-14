document.addEventListener('DOMContentLoaded', function () {
  const productos = [
    { idProducto: 0, nombre: "Margarita", imagen: "assets/images/flor1.jpg", precio: 10.50, detalles: "Detalles del producto 1" },
    { idProducto: 1, nombre: "Azucena", imagen: "assets/images/flor2.jpg", precio: 11.50, detalles: "Detalles del producto 2" },
    { idProducto: 2, nombre: "Azalea", imagen: "assets/images/flor3.jpg", precio: 12.50, detalles: "Detalles del producto 3" },
    { idProducto: 3, nombre: "Dalia", imagen: "assets/images/flor4.jpg", precio: 13.50, detalles: "Detalles del producto 4" },
    { idProducto: 4, nombre: "Hortensia", imagen: "assets/images/flor5.jpg", precio: 14.50, detalles: "Detalles del producto 5" },
    { idProducto: 5, nombre: "Lirio", imagen: "assets/images/flor6.jpg", precio: 15.50, detalles: "Detalles del producto 6" },
    { idProducto: 6, nombre: "Hibisco", imagen: "assets/images/flor7.jpg", precio: 16.50, detalles: "Detalles del producto 7" },
    { idProducto: 7, nombre: "Bugambilia", imagen: "assets/images/flor8.jpg", precio: 17.50, detalles: "Detalles del producto 8" }
  ];

  let carrito = [];

  const modal = document.getElementById("detallesModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImg = document.getElementById("modalImg");
  const modalPrice = document.getElementById("modalPrice");
  const closeButton = document.querySelector('#closeButton');
  const carritoBtn = document.querySelector('#añadirAlCarritoModal');

  function mostrarDetalles(index) {
    modalTitle.textContent = productos[index].nombre;
    modalImg.src = productos[index].imagen;
    modalPrice.textContent = `Precio: ${productos[index].precio}€`;
    modal.style.display = "block";
    carritoBtn.index = productos[index].idProducto;
  }

  function cerrarModal() {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target === modal) {
      cerrarModal();
    }
  };

  const verDetallesButtons = document.querySelectorAll('.ver_detalles-btn');
  verDetallesButtons.forEach(function (button, index) {
    button.onclick = function () {
      mostrarDetalles(index);
    };
  });

  closeButton.onclick = cerrarModal;

  function borrarCarritoHTML() {
    let carritoLista = document.getElementById('carritoLista');
    carritoLista.innerHTML = "";
  }

  function generarCarritoHTLM() {
    let carritoLista = document.getElementById('carritoLista');
    if (carrito.length == 0) {
      carritoLista.innerHTML = "No hay elementos en el carrito";
      return;      
    }
    for (let i = 0; i < carrito.length; i++) {
      let precioTotal = productos[carrito[i].idProducto].precio * carrito[i].cantidad;
      let nuevoHTML = `
      <div class="itemcarrito" id="itemcarrito${i}">
						<img src="${productos[carrito[i].idProducto].imagen}" alt="" id="imagen">
						<div>
              <div class="texto"><span id="nombre">${productos[carrito[i].idProducto].nombre}</span><span id="precioTotalProducto">${precioTotal}€</span></div>
							
							<span class="cantidad" id="cantidad">
                <button class="material-symbols-outlined" id="menosBtn">remove</button>
                ${carrito[i].cantidad}
                <button class="material-symbols-outlined" id="masBtn">add</button>
                <button id="eliminar" class="material-symbols-outlined">delete</button>
              </span>
							
              
						</div>
			</div>`;
      carritoLista.innerHTML += nuevoHTML;
    }

    const masBtn = document.querySelectorAll('#masBtn');
    masBtn.forEach(function (button, index) {
      button.onclick = function () {
        carrito[index].cantidad++;
        borrarCarritoHTML();
        generarCarritoHTLM();
        calcularTotalCarrito();
      };
    });

    const menosBtn = document.querySelectorAll('#menosBtn');
    menosBtn.forEach(function (button, index) {
      button.onclick = function () {
        carrito[index].cantidad--;
        carrito[index].cantidad == 0 ? carrito.splice(index, 1) : null;
        borrarCarritoHTML();
        generarCarritoHTLM();
        calcularTotalCarrito();
      };
    });

    const eliminarBtn = document.querySelectorAll('#eliminar');
    eliminarBtn.forEach(function (button, index) {
      button.onclick = function () {
        carrito.splice(index, 1);
        borrarCarritoHTML();
        generarCarritoHTLM();
        calcularTotalCarrito();
      };
    });


  }

  function añadirAlCarrito(index) {
    let carritoLista = document.getElementById('carritoLista');

    // Borrar los elementos del carrito
    borrarCarritoHTML();

    // Calcular de nuevo el carrito (memoria)
    let i = 0;
    for (i = 0; i < carrito.length; i++) {
      if (carrito[i].idProducto == index) {
        carrito[i].cantidad++;
        break;
      }
    }

    if (i == carrito.length) {
      let Item = {
        idProducto: 0,
        cantidad: 0
      };
      Item.idProducto = index;
      Item.nombre = productos[index].nombre;
      Item.cantidad = 1;
      carrito.push(Item);
    }

    // Construir el nuevo HTML
    generarCarritoHTLM();

    calcularTotalCarrito();


    // for (i = 0; i < carrito.length; i++) {
    //   console.log(carrito[i].nombre + ", " + carrito[i].cantidad);
    // }


  }

  function calcularTotalCarrito() {
    // Calcula el total
    let precioTotalCarrito = 0;
    let elementosEnCarrito = 0;
    for (i = 0; i < carrito.length; i++) {
      let precioTotal = productos[carrito[i].idProducto].precio * carrito[i].cantidad;
      precioTotalCarrito += precioTotal;
      elementosEnCarrito += carrito[i].cantidad;
    }
    const precioTotalCarritoDiv = document.getElementById('precioTotalCarrito');
    precioTotalCarritoDiv.innerHTML = `${precioTotalCarrito}€`;
    const elementosEnCarritoDiv = document.getElementById('elementosencarrito');
    elementosEnCarritoDiv.innerHTML = elementosEnCarrito?`${elementosEnCarrito}`:"";
  }

  const añadirAlCarritoBtn = document.querySelectorAll('#añadirAlCarrito');
  añadirAlCarritoBtn.forEach(function (button, index) {
    button.onclick = function () {
      añadirAlCarrito(index);
    };
  });

  const mostrarBtn = document.getElementById('mostrarBtn');
  const ventanaEmergente = document.getElementById('ventanaEmergente');
  const cerrarBtn = document.getElementById('cerrarBtn');
  const añadirAlCarritoModalBtn = document.getElementById('añadirAlCarritoModal');

  mostrarBtn.addEventListener('click', function () {
    ventanaEmergente.style.right = '0';
  });

  cerrarBtn.addEventListener('click', function () {
    ventanaEmergente.style.right = '-500px';
  });

  añadirAlCarritoModalBtn.addEventListener('click', function () {
    console.log(`Index ${añadirAlCarritoModalBtn.index}`);
    añadirAlCarrito(añadirAlCarritoModalBtn.index);
  })


});

document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');
  const sidePanel = document.getElementById('sidePanel');

  toggleButton.addEventListener('click', function () {
    // Verificar si el panel está abierto o cerrado
    const isOpen = sidePanel.style.right === '70px' || sidePanel.style.right === '0';

    // Si está abierto, cerrarlo; si está cerrado, abrirlo
    sidePanel.style.right = isOpen ? '-350px' : '70px';
  });
});




