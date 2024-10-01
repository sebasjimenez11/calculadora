import { peticionServidor } from "./peticionesServidor.js";
const modal = document.querySelector('.modal');
const historial = document.getElementById('contenido-historial');
export let isOpenModal = false;

export const openModal = async () => {
    isOpenModal = true;
    const data = await peticionServidor('historial', 'historial');
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            historialCalculadora(data[i].operacion_actual, data[i].resultado);
        }
    }
    modal.style.display = 'grid';
}

export const historialCalculadora = (operacion, resultado) => {
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
    isOpenModal = false;
    historial.innerHTML = ''; 
    modal.style.display = 'none'; 
}

export const borrarHistorial = async () => {
    await peticionServidor('borrarHistorial', 'borrarHistorial');
    historial.innerHTML = ''; 
    const data = await peticionServidor('historial', 'historial');
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            historialCalculadora(data[i].operacion_actual, data[i].resultado);
        }
    }
}
export const traerOperacionHistorial = async () => {
    let value = await peticionServidor('','');
    closeModal();
    return value;
}



window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});