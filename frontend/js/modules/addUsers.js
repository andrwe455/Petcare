document.addEventListener("DOMContentLoaded", function () {
    const userRoleSelect = document.getElementById("userRole");
    const veterinarianForm = document.getElementById("veterinarianForm");
    const ownerForm = document.getElementById("ownerForm");
    const petForm = document.getElementById("petForm");

    // Mostrar y ocultar formularios dependiendo del rol seleccionado
    userRoleSelect.addEventListener("change", function () {
        const selectedRole = userRoleSelect.value;
        veterinarianForm.classList.add("d-none");
        ownerForm.classList.add("d-none");
        petForm.classList.add("d-none");

        if (selectedRole === "veterinarian") {
            veterinarianForm.classList.remove("d-none");
        } else if (selectedRole === "owner") {
            ownerForm.classList.remove("d-none");
        } else if (selectedRole === "pet") {
            petForm.classList.remove("d-none");
        }
    });
    function validateFields(formData) {
        return Object.values(formData).every(value => value !== "");
    }

    function showAlert(mensaje, tipo) {
        alert(`${tipo.toUpperCase()}: ${mensaje}`);
    }
    document.getElementById('userRole').addEventListener('change', function () {
        const role = this.value;
        const forms = ['veterinarianForm', 'ownerForm', 'petForm'];
    
        // Oculta todos los formularios y elimina los atributos required
        forms.forEach(formId => {
            const form = document.getElementById(formId);
            form.classList.add('d-none');
            form.querySelectorAll('input').forEach(input => input.removeAttribute('required'));
        });
    
        // Muestra el formulario correspondiente y añade required a los campos visibles
        const selectedForm = document.getElementById(`${role}Form`);
        if (selectedForm) {
            selectedForm.classList.remove('d-none');
            selectedForm.querySelectorAll('input').forEach(input => input.setAttribute('required', ''));
        }
    });
    
    // Manejo del envío del formulario
    document.getElementById("userForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const selectedRole = userRoleSelect.value;
        let formData = {};

        let url

        if (selectedRole === "veterinarian") {
            formData = {
                role: "veterinarian",
                name: document.getElementById("veterinarianName").value,
                lastName: document.getElementById("veterinarianLastName").value,
                address: document.getElementById("veterinarianAddress").value,
                phone: document.getElementById("veterinarianPhone").value,
                email: document.getElementById("veterinarianEmail").value
            };
            url = '/crtUser'
        } else if (selectedRole === "owner") {
            formData = {
                role: "owner",
                name: document.getElementById("ownerName").value,
                lastName: document.getElementById("ownerLastName").value,
                address: document.getElementById("ownerAddress").value,
                phone: document.getElementById("ownerPhone").value,
                email: document.getElementById("ownerEmail").value
            };
            url = '/crtUser'
        } else if (selectedRole === "pet") {
            formData = {
                role: "pet",
                name: document.getElementById("petName").value,
                type: document.getElementById("petType").value,
                breed: document.getElementById("petBreed").value,
                weight: document.getElementById("petWeight").value,
                age: document.getElementById("petAge").value
            };
            url = '/crtPet'
        }
        // Verificar si hay campos vacíos
        if (validateFields(formData)) {
            fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            }).then(response => response.json()).then(data => {
                if(data.message !== 'User created successfully'){
                    Swal.fire({
                        title: 'Error',
                        text: data.message,
                        icon: 'error',
                        confirmButtonText: 'Accept'
                    }).then(() => {
                        window.location.reload();
                    });
                    return;
                }
                Swal.fire({
                    title: 'User created',
                    text: 'The user has been created successfully',
                    icon: 'success',
                    confirmButtonText: 'Accept'
                }).then(() => {
                    window.location.reload();
                });
            }).catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'An error occurred while creating the user',
                    icon: 'error',
                    confirmButtonText: 'Accept'
                }).then(() => {
                    window.location.reload();
                });
            });
        }

    });
});
