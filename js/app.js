//Variables

const d = document;
const carrito =  d.querySelector("#carrito");
const vaciarCarrito = d.querySelector("#vaciar-carrito");
const divCarrito = d.querySelector("#lista-carrito tbody");
const listaArticulos = d.querySelector("#lista-articulos");
let articulosCarrito = [];


//Funciones llamadas
registrarEventListeners();

// FUnciones- Agregar Articulo

function  registrarEventListeners(){
    listaArticulos.addEventListener("click", agregarArticulo);
}

function agregarArticulo(e){
    e.preventDefault(); //para evitar el salto al inicio de pagina por el HREF #
    // Delegation para evitar event bubbling
    if(e.target.classList.contains("agregar-carrito")){
        const ArticuloSel=  e.target.parentElement.parentElement;
        leeDatosArticulo(ArticuloSel);
    }
    
}

// FUnciones- leer html donde se hace click

function leeDatosArticulo(articulo){
    //Crear un obj  con el contenido del articulo
    const infoArticulo = {
        imagen: articulo.querySelector("img").src,
        titulo: articulo.querySelector("h4").textContent,
        precio: articulo.querySelector(".precio span").textContent,
        id: articulo.querySelector("a").getAttribute("data-id"),
        cantidad:1,
    };
    const existe= articulosCarrito.some(
        (articulo) => articulo.id === infoArticulo.id
        ); 
     if(existe){
        //Actualizar cantidad
        const articulos = articulosCarrito.map((articulo)=>{
            if (articulo.id === infoArticulo.id){
                articulo.cantidad++;
                return articulo
            } else{
                return articulo
            }
        })
        articulosCarrito=[...articulos]
    } else{
        //Agregar nuevo al carrito
        articulosCarrito = [...articulosCarrito, infoArticulo]
    }
    carritoHTML();
}
//mostrar los elementos en el DOM
function carritoHTML(){
    //limpiar html
    limpiarHTML();
    articulosCarrito.forEach((articulo) => {
        const row = d.createElement("tr");
        row.innerHTML=`
        <td <img src=${articulo.imagen} width= "100">  </img></td>
        <td> ${articulo.titulo} </td>
        <td> ${articulo.precio} </td>
        <td> ${articulo.cantidad} </td>
        <td> <a href="#" class="borrar-articulo" data-id=${articulo.id}> X </a></td>
        `;
        //Agregar al DOM
        divCarrito.appendChild(row);
      
    });

}

//eliminar los articulos precedentes del tbody
function limpiarHTML(){
    divCarrito.innerHTML= ""
}