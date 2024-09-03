// VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEvento();
function cargarEvento() {
    // CUANDO SE AGRAGA UN CURSO PRESIONANDO 'AGREGAR AL CARRITO'
    listaCursos.addEventListener('click', agregarCurso);
    // ELIMINA CURSOS DEL CARRITO 
    carrito.addEventListener('click', eliminarCurso); 
    // VACIA EL CARRITO
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []; // RESETEA EL CARRITO
        limpiarHTML(); // ELIMINA EL HTML 
    })
}

// FUNCIONES
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
// ELIMINA EL CUROS DEL CARRITO 
function eliminarCurso (e){
    if(e.target.classList.contains('borrar-curso')){
        const curosId = e.target.getAttribute('data-id');
        // ELIMINA EL CURSO
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== curosId);
        carritoHTML(); // ACTUALIZA EL CARRITO
    }
}
// LEE EL CONTENIDO DEL HTML

function leerDatosCurso(cursos) {
    //console.log(cursos);
    // OBJETO CON LOS CURSOS
    const infoCurso = {
        imagen: cursos.querySelector('img').src,
        titulo: cursos.querySelector('h4').textContent,
        precio: cursos.querySelector('.precio span').textContent,
        id: cursos.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    };
    // REVISA SI UN ELEMENTO YA EXISTE EN EL CARRITO
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // ACTUALIZA LA CANTIDAD
        const curso = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // RETORNA  OBJETOS ACTUALIZADOS
            } else {
                return curso; // RETORNO LOS OBJETOS QUE NO SON ACTUALIZADOS
            }
        })
        articulosCarrito = [...curso]
    } else {
        // AGREGAR ELEMENTOS  AL CARRITO
        articulosCarrito = [...articulosCarrito, infoCurso]

    }
    console.log(articulosCarrito);
    carritoHTML();
}

// MUESTRA EL CARRITO EN EL HTML 

function carritoHTML() {

    // LIMPIAR EL HTML DEL CARRITO
    limpiarHTML();
    // RECORRE EL CARRITO Y GENERA EL HTML 
    articulosCarrito.forEach(cursos => {
        const { imagen, titulo, precio, cantidad, id } = cursos;
        const row = document.createElement('tr');
        row.innerHTML = `
                <td> <img src = "${imagen}" width = "100" > </td>
                <td>${titulo}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>
                    <a href="#" class="borrar-curso" data-id="${id}">X</a>
                </td>
            `;
        // AGREGAR AL HTML DEL TBODY 
        contenedorCarrito.appendChild(row);
    });

}

// ELIMINA LOS CURSOS DEL TBODY

function limpiarHTML() {
    // FORMA LENTA 
    /* contenedorCarrito.innerHTML = ''; */

    // FORMA RAPIDA
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}