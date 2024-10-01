import { peticionServidor } from "./peticionesServidor.js";
const modal = document.querySelector('.modal');

export const openModal = async (operacion) => {
    const data = await peticionServidor('historial', 'historial', operacion);
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            historialCalculadora(data[i].operacion_actual, data[i].resultado)
        }
    }
    modal.style.display = 'grid';
}

export const historialCalculadora = async (operacion, resultado) => {
    let historial = document.getElementById('contenido-historial');
    let nuevoContenedor = document.createElement('div');
    let nuevoResultado = document.createElement('span');
    let nuevaOperacion = document.createElement('span');

    nuevoContenedor.classList.add('container-div');
    nuevoResultado.classList.add('resultado');
    nuevaOperacion.classList.add('operacion');
    nuevoResultado.textContent = resultado;
    nuevaOperacion.textContent = operacion;

    nuevoContenedor.appendChild(nuevoResultado);
    nuevoContenedor.appendChild(nuevaOperacion);

    historial.appendChild(nuevoContenedor);
}

export const closeModal = () => {
    modal.style.display = 'none';
}

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});