export const peticionServidor = async (valorOperando, operador) => {
    try {
        let Id = localStorage.getItem('Id');
        if (Id === 'undefined') {
            Id = null;
        }
        const response = await fetch('/server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                operacion: valorOperando,
                Opc: operador,
                Id: Id
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        localStorage.setItem('Id', data.Id);
        return data.value;
    } catch (error) {
        console.error('Error en la peticion:', error);
    }
}
