

const container = document.getElementById("container");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function agregarAlCarrito(servicio) {

    if (carrito.some(el => el.id === servicio.id)) {
        const indexServicio = carrito.findIndex(el => el.id === servicio.id);
        carrito[indexServicio].cantidad += 1;
        carrito[indexServicio].subtotal = carrito[indexServicio].cantidad * carrito[indexServicio].precio;
    } else {
        const nuevoServicio = {
            ...servicio,
            cantidad: 1,
            subtotal: servicio.precio,
        };
        carrito.push(nuevoServicio);
    };

    Toastify({
        text: `${servicio.nombre} agregado al carrito con exito!`,
        gravity: "bottom",
    }).showToast();

    localStorage.setItem("carrito", JSON.stringify(carrito));
};


function crearCard(servicio) {
    const card = document.createElement("div");
    card.className = "card";
    card.id= `service - ${servicio.id}`


    const titulo = document.createElement("h3");
    titulo.innerText = `Servicio : ${servicio.nombre}`;



    const imagen = document.createElement("img");
    imagen.src = "https://media.istockphoto.com/id/1295701453/es/vector/servicios-del-hotel-y-personal-del-hotel-objetos-dibujados-a-mano-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=ORr8jCLrvrIhTlEWlME9uj0lebN08O584Bx-Po_p-1M=";
    imagen.className = "img";

    const precio = document.createElement("p");
    precio.innerText = `$${servicio.precio}`;

    const boton = document.createElement("button");
    boton.innerText = "Agregar al carrito";
    boton.onclick = () => agregarAlCarrito(servicio);

    card.append(titulo);
    card.append(imagen);
    card.append(precio);
    card.append(boton);

    container.append(card);
};


function mostrarCarrito(servicio) {
    const card = document.createElement("div");
    card.className = "card";

    const titulo = document.createElement("h3");
    titulo.innerText = servicio.nombre;

    const imagen = document.createElement("img");
    imagen.src = "https://media.istockphoto.com/id/1295701453/es/vector/servicios-del-hotel-y-personal-del-hotel-objetos-dibujados-a-mano-ilustraci%C3%B3n-vectorial.jpg?s=612x612&w=0&k=20&c=ORr8jCLrvrIhTlEWlME9uj0lebN08O584Bx-Po_p-1M=";
    imagen.className = "img";

    const precio = document.createElement("p");
    precio.innerText = `$${servicio.precio}`;

    const boton = document.createElement("button");
    boton.innerText = "Agregar al carrito";
    boton.onclick = () => agregarAlCarrito(servicio);

    card.append(titulo);
    card.append(imagen);
    card.append(precio);
    card.append(boton);

    document.getElementById("div-carrito").append(card);
};


container.innerHTML = `<span class="loader"></span>`

fetch('./data.json')
    .then(response => response.json())
    .then(servicios => {
        setTimeout(() => {
            container.innerHTML = ``
            servicios.forEach(el => crearCard(el));
            const mostrar = document.createElement("button");
            mostrar.innerText = "Mostrar carrito";

            mostrar.addEventListener("click", () => {
                document.getElementById("div-carrito").innerHTML = "";
                carrito.forEach(el => mostrarCarrito(el));
            });

            const limpiar = document.createElement("button");
            limpiar.innerText = "Limpiar carrito";

            limpiar.addEventListener("click", () => {
                if (carrito.length > 0) {
                    Swal.fire({
                        title: 'Está seguro de que quiere limpiar su carrito?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, limpiar carrito',
                        cancelButtonText: 'No limpiar carrito'
                    })
                    .then(result => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Qué lástima!",
                                text: "Limpiaste tu carrito",
                                icon: "error",
                            });
                            carrito = [];
                            localStorage.setItem("carrito", JSON.stringify(carrito));
                        } else {
                            Swal.fire({
                                title: "Genial!",
                                text: "Tu carrito no fue eliminado",
                                icon: "success",
                            });
                        };
                    });
            } else {
                Toastify({
                    text: "Tu carrito está vacío!",
                }).showToast();
            }
        });

        container.append(mostrar);
        container.append(limpiar);
        }, 2000);
    })






