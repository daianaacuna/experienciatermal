const servicios = [
    {
        id: 1,
        nombre: "Masajes relajantes full",
        precio: 15000,
        ExperienciaTermal: false,
        
    },
    {   
        id: 2,
        nombre: "Cena Bodega y maridajes",
        precio: 80000,
        ExperienciaTermal: true,

    },
    {
        id: 3,
        nombre: "Full termal spa day",
        precio: 50000,
        ExperienciaTermal: true,
    },
    {
        id: 4,
        nombre: "Evening late check out",
        precio: 120000,
        ExperienciaTermal: true,
    },

];


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
        text: `${producto.nombre} agregado al carrito`,
        gravity: "bottom",
    }).showToast();

    localStorage.setItem("carrito", JSON.stringify(carrito));
};


function limpiarCarrito() {
    if (carrito.length > 0) {
        localStorage.clear();
        carrito = [];
        alert("Listo! Limpiaste tu carrito!");
    } else {
        alert("Aun no llenaste tu carrito!");
    };
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

servicios.forEach(el => crearCard(el));

const mostrar = document.createElement("button");
mostrar.innerText = "Mostrar carrito";

mostrar.addEventListener("click", () => {
    console.log("Mostrando tu carrito", carrito);
});

const limpiar = document.createElement("button");
limpiar.innerText = "Limpiar carrito";

limpiar.addEventListener("click", () => {
    limpiarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
});



container.append(mostrar);
container.append(limpiar);

