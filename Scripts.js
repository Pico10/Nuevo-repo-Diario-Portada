document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('subscription-form');
    const fields = form.querySelectorAll('input');

    const validationRules = {
        'full-name': value => value.length > 6 && /\s/.test(value) ? '' : 'Debe tener más de 6 letras y al menos un espacio.',
        'email': value => /\S+@\S+\.\S+/.test(value) ? '' : 'Formato de email no válido.',
        'password': value => value.length >= 8 && /\d/.test(value) ? '' : 'Debe tener al menos 8 caracteres, con letras y números.',
        'confirm-password': value => value === document.getElementById('password').value ? '' : 'Las contraseñas no coinciden.',
        'age': value => Number.isInteger(parseInt(value)) && value >= 18 ? '' : 'Debe ser un número entero mayor o igual a 18.',
        'phone': value => /^\d{7,}$/.test(value) ? '' : 'Debe ser un número de al menos 7 dígitos sin espacios, guiones ni paréntesis.',
        'address': value => value.length >= 5 && /\s/.test(value) ? '' : 'Debe tener al menos 5 caracteres, con letras, números y un espacio.',
        'city': value => value.length >= 3 ? '' : 'Debe tener al menos 3 caracteres.',
        'postal-code': value => value.length >= 3 ? '' : 'Debe tener al menos 3 caracteres.',
        'dni': value => /^\d{7,8}$/.test(value) ? '' : 'Debe ser un número de 7 u 8 dígitos.'
    };

    fields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('focus', clearError);
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let allValid = true;
        fields.forEach(field => {
            if (!validateField({ target: field })) {
                allValid = false;
            }
        });

        if (allValid) {
            const formData = Array.from(fields).map(field => `${field.name}: ${field.value}`).join('\n');
            alert(`Formulario enviado con éxito:\n\n${formData}`);
        } else {
            alert('Corrige los errores en el formulario.');
        }
    });

    function validateField(event) {
        const field = event.target;
        const error = validationRules[field.id](field.value);
        const errorElement = document.getElementById(`error-${field.id}`);
        if (error) {
            errorElement.innerText = error;
            return false;
        } else {
            errorElement.innerText = '';
            return true;
        }
    }

    function clearError(event) {
        const field = event.target;
        const errorElement = document.getElementById(`error-${field.id}`);
        errorElement.innerText = '';
    }
});