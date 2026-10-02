/*-----------------------------------*/
/*--|funcionalidad_autores_famosos|--*/
/*-----------------------------------*/
const autores = document.querySelectorAll(".autor");
const botonRestablecer = document.getElementById("boton_restablecer");
const mensajeGeneral = document.getElementById("mensaje_general");
const datosIniciales = {
    1: {
        nombre: "Gabriel García Márquez",
        nacionalidad: "Colombiana",
        libro: "Cien años de soledad",
        descripcion: "Escritor colombiano reconocido por sus obras de literatura y por ser una figura importante del realismo mágico."
    },
    2: {
        nombre: "Miguel de Cervantes",
        nacionalidad: "Española",
        libro: "Don Quijote de la Mancha",
        descripcion: "Escritor español conocido principalmente por su obra Don Quijote de la Mancha."
    },
    3: {
        nombre: "Jane Austen",
        nacionalidad: "Británica",
        libro: "Orgullo y prejuicio",
        descripcion: "Escritora inglesa reconocida por sus novelas sobre la sociedad, las relaciones y las costumbres de su época."
    }
};
/*----------------------------------------*/
/*--|obtener_los_datos_con_localstorage|--*/
/*----------------------------------------*/
function obtenerDatos(id) {
    const datosGuardados = localStorage.getItem(`autor_famoso_${id}`);
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    }
    return datosIniciales[id];
}
/*-----------------------*/
/*--|mostrar_los_datos|--*/
/*-----------------------*/
function mostrarDatos(autor) {
    const id = autor.dataset.id;
    const datos = obtenerDatos(id);
    autor.querySelector(".campo_nombre").value = datos.nombre;
    autor.querySelector(".campo_nacionalidad").value = datos.nacionalidad;
    autor.querySelector(".campo_libro").value = datos.libro;
    autor.querySelector(".campo_descripcion").value = datos.descripcion;
    autor.querySelector(".nombre_autor").textContent = datos.nombre;
}
/*-------------------------------------------------------*/
/*--|guardar_y_restaurar_los_datos_usando_localstorage|--*/
/*-------------------------------------------------------*/
function guardarDatos(autor) {
    const id = autor.dataset.id;
    const nombre = autor.querySelector(".campo_nombre").value;
    const nacionalidad = autor.querySelector(".campo_nacionalidad").value;
    const libro = autor.querySelector(".campo_libro").value;
    const descripcion = autor.querySelector(".campo_descripcion").value;
    const datos = {
        nombre: nombre,
        nacionalidad: nacionalidad,
        libro: libro,
        descripcion: descripcion
    };
    localStorage.setItem(`autor_famoso_${id}`, JSON.stringify(datos));
    autor.querySelector(".nombre_autor").textContent = nombre;
    mostrarMensaje(autor, "Información guardada correctamente.");
}
function restaurarDatos(autor) {
    const id = autor.dataset.id;
    localStorage.removeItem(`autor_famoso_${id}`);
    mostrarDatos(autor);
    mostrarMensaje(autor, "Información restaurada.");
}
/*--------------------------*/
/*--|mostrar_los_mensajes|--*/
/*--------------------------*/
function mostrarMensaje(autor, texto) {
    const mensaje = autor.querySelector(".mensaje_autor");
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = "";
    }, 2000);
}
/*----------------------------------------------------*/
/*--|restablecer_todos_los_autores_con_localstorage|--*/
/*----------------------------------------------------*/
function restablecerTodos() {
    const confirmacion = confirm("¿Deseas restablecer todos los autores?");
    if (!confirmacion) {
        return;
    }
    autores.forEach((autor) => {
        const id = autor.dataset.id;
        localStorage.removeItem(`autor_famoso_${id}`);
        mostrarDatos(autor);
    });
    mensajeGeneral.textContent = "Todos los autores fueron restablecidos.";
    setTimeout(() => {
        mensajeGeneral.textContent = "";
    }, 2000);
}
/*----------------------------*/
/*--|eventos_de_los_autores|--*/
/*----------------------------*/
autores.forEach((autor) => {
    const botonGuardar = autor.querySelector(".boton_guardar");
    const botonRestaurar = autor.querySelector(".boton_restaurar");
    botonGuardar.addEventListener("click", () => {
        guardarDatos(autor);
    });
    botonRestaurar.addEventListener("click", () => {
        restaurarDatos(autor);
    });
});
botonRestablecer.addEventListener("click", restablecerTodos);
/*------------------------*/
/*--|cargando_los_datos|--*/
/*------------------------*/
function cargarDatos() {
    autores.forEach((autor) => {
        mostrarDatos(autor);
    });
}
cargarDatos();