document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscription-form');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeModalButton = document.getElementById('close-modal');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (validateForm()) {
            const formData = new FormData(form);
            const queryParams = new URLSearchParams(formData).toString();
            const url = `https://jsonplaceholder.typicode.com/users?${queryParams}`;

            fetch(url, { method: 'GET' })
                .then(response => response.json())
                .then(data => handleSuccess(data, queryParams))
                .catch(error => handleError(error));
        }
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onload = () => {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            for (const [key, value] of Object.entries(formData)) {
                const input = document.querySelector(`[name=${key}]`);
                if (input) input.value = value;
            }
        }
    };
});

function validateForm() {
    // Implementa tus validaciones de formulario aquí
    return true; // Retornar true si todas las validaciones pasan
}

function handleSuccess(data, queryParams) {
    localStorage.setItem('formData', JSON.stringify(data));
    showModal(`Datos recibidos: ["Suscripción exitosa! Datos enviados: ${queryParams}"]`);
}

function handleError(error) {
    showModal(`Error en la suscripción: ${error}`);
}

function showModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.innerText = message;
    modal.style.display = 'block';
}
