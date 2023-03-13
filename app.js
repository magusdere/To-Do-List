const formulario = document.querySelector("#formulario");
const inputTarea = document.querySelector("#tarea");
const mensajeError = document.querySelector(".alert-danger");
const contenedorTareas = document.querySelector("#contenedorTareas");
const templateTarea = document.querySelector("#templateTarea");

let tareas = [];

const mostrarTareas = () => {
    localStorage.setItem("tareas", JSON.stringify(tareas));

    contenedorTareas.textContent = "";
    const fragment = document.createDocumentFragment();

    tareas.forEach((item) => {
        const clone = templateTarea.content.cloneNode(true);
        clone.querySelector(".lead").textContent = item.tarea;
        clone.querySelector(".btn-danger").dataset.id = item.id;
        fragment.appendChild(clone);
    });
    
    contenedorTareas.appendChild(fragment);
}

const agregarTarea = (tarea) => {
    const tareaObjeto = {
        tarea: tarea,
        id: Date.now(),
    }

    tareas.push(tareaObjeto);

    mostrarTareas();
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    mensajeError.classList.add("d-none");

    if(!inputTarea.value.trim()){
        mensajeError.classList.remove("d-none");
        return;
    }

    const tarea = inputTarea.value;

    agregarTarea(tarea);
})

document.addEventListener("click", (e) => {
    if (e.target.matches(".btn-danger")) {
        tareas = tareas.filter((item) => item.id !== parseInt(e.target.dataset.id));
        mostrarTareas();
    }
})

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tareas")) {
        tareas = JSON.parse(localStorage.getItem("tareas"));
        mostrarTareas();
    }
});