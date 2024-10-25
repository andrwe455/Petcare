document.addEventListener("DOMContentLoaded", function () {
    const userRoleSelect = document.getElementById("userRole");
    const doctorForm = document.getElementById("doctorForm");
    const ownerForm = document.getElementById("ownerForm");
    const petForm = document.getElementById("petForm");

    // Mostrar y ocultar formularios dependiendo del rol seleccionado
    userRoleSelect.addEventListener("change", function () {
        const selectedRole = userRoleSelect.value;
        doctorForm.classList.add("d-none");
        ownerForm.classList.add("d-none");
        petForm.classList.add("d-none");

        if (selectedRole === "doctor") {
            doctorForm.classList.remove("d-none");
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

    // Manejo del envío del formulario
    document.getElementById("userForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const selectedRole = userRoleSelect.value;
        let formData = {};

        let url

        if (selectedRole === "doctor") {
            formData = {
                role: "doctor",
                name: document.getElementById("doctorName").value,
                lastName: document.getElementById("doctorLastName").value,
                address: document.getElementById("doctorAddress").value,
                phone: document.getElementById("doctorPhone").value,
                email: document.getElementById("doctorEmail").value
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
                alert('Create')
            })
        }

    });
});
