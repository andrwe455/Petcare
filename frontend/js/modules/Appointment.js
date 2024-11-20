function updateapp() {
    // Obtener el formulario y sus datos
    const form = document.getElementById('updatea');
    const formData = new FormData(form);

    // Convertir los datos del formulario en un objeto JSON
    const jsonData = {};
    formData.forEach((value, key) => {
        if (key === 'veterinarian') {
            const vetSelect = document.getElementById('veterinarian');
            jsonData.veterinarian = vetSelect.options[vetSelect.selectedIndex]?.text || null; // Nombre del veterinario
        } else {
            jsonData[key] = value;
        }
    });

    // Validar si la mascota está seleccionada
    const petSelect = document.getElementById('pet');
    if (petSelect) {
        jsonData.pet = petSelect.value; // ID de la mascota seleccionada
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Please select a pet before updating the appointment.',
        });
        return;
    }

    // Validar si los campos obligatorios están completos
    if (!jsonData.veterinarian || !jsonData.date || !jsonData.id) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please complete all required fields before updating the appointment.',
        });
        return;
    }

    console.log("Data to send:", JSON.stringify(jsonData)); // Para depuración

    // Enviar datos al servidor
    fetch("/updateappointment", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || 'Error updating appointment');
                });
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Appointment Updated',
                text: 'The appointment has been updated successfully!',
            }).then(() => {
                window.location.reload(); // Recargar la página después de actualizar
            });
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: `There was an error updating the appointment: ${error.message}`,
            });
        });
}


function createapp(event) {
    event.preventDefault(); 

    if (!validateForm()) {
        return; 
    }

    const form = document.getElementById('crtappointment');
    const formData = new FormData(form);

    const jsonData = {};
    formData.forEach((value, key) => {
        if (key === 'name') {
            const nameSelect = document.getElementById('name');
            jsonData.name = nameSelect.options[nameSelect.selectedIndex].text;
        } else if (key === 'pet') {
            // Get the selected option text for the pet
            const petSelect = document.getElementById('pet');
            jsonData.pet = petSelect.options[petSelect.selectedIndex].text;
        } else if (key === 'veterinarian') {
            // Get the selected option text for the veterinarian
            const vetSelect = document.getElementById('veterinarian');
            jsonData.veterinarian = vetSelect.options[vetSelect.selectedIndex].text;
        } else {
            jsonData[key] = value; // For other fields, use the original value
        }
    });

    console.log(JSON.stringify(jsonData)); // Debugging: See the final payload

    fetch("/crtappointment", { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(jsonData) 
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                throw new Error(data.message || 'Error creating appointment');
            }
            return data; 
        });
    })
    .then(data => {
        if (data.success) { 
            Swal.fire({
                icon: 'success',
                title: 'Appointment Created',
                text: data.message,
            }).then(() => {
                window.location.reload(); 
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Creation Failed',
                text: data.message,
            });
        }
    })
    .catch(error => {
        console.error('Error:', error); 
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        });
    });
}

function deleteapp(event) {
    const form = document.getElementById('deleteAppointmentForm');
    const formData = new FormData(form);

    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    console.log("Data to delete:", jsonData); 

    fetch("/deleteappointment", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'Error deleting appointment');
            });
        }
        return response.json();
    })
    .then(data => {
        Swal.fire({
            icon: 'success',
            title: 'Appointment Deleted',
            text: 'The appointment has been deleted successfully!',
        }).then(() => {
            window.location.reload();
        });
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Deletion Failed',
            text: `There was an error deleting the appointment: ${error.message}`,
        });
    });
}



function preventNumbersInput(event) {
    const charCode = event.which ? event.which : event.keyCode;
  
    if ((charCode > 47 && charCode < 58)) {
        event.preventDefault();
    }
  }

  function validateForm() {
    const name = document.getElementById('name').value.trim();
    const pet = document.getElementById('pet').value.trim();
    const veterinarian = document.getElementById('veterinarian').value.trim();
    const date = document.querySelector('input[name="date"]').value.trim();

    if (!name || !pet || !veterinarian || !date) {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Fields',
            text: 'Please fill out all the fields before submitting.',
        });
        return false; 
    }
    return true; 
}


$(document).ready(() => {
    // Load clients and veterinarians
    fetch('/crtappointmentusers?role=owner')
        .then(res => res.json())
        .then(data => {
            const clientSelect = $('#name');
            data.forEach(client => {
                clientSelect.append(new Option(`${client.name} ${client.lastName}`, client._id));
            });
        });

    fetch('/crtappointmentusers?role=veterinarian')
        .then(res => res.json())
        .then(data => {
            const vetSelect = $('#veterinarian');
            data.forEach(vet => {
                vetSelect.append(new Option(`${vet.name} ${vet.lastName}`, vet._id));
            });
        });

    // Load pets based on selected client
    $('#name').on('change', function () {
        const clientId = $(this).val();
        if (clientId) {
            fetch(`/crtappointmentpets?owner=${clientId}`)
                .then(res => res.json())
                .then(data => {
                    const petSelect = $('#pet');
                    petSelect.empty().append(new Option('Select a pet', ''));
                    data.forEach(pet => {
                        petSelect.append(new Option(pet.name, pet._id));
                    });
                });
        } else {
            $('#pet').empty().append(new Option('Select a pet', ''));
        }
    });
});

  document.getElementById('name').addEventListener('keypress', preventNumbersInput);
  document.getElementById('pet').addEventListener('keypress', preventNumbersInput);
  document.getElementById('veterinarian').addEventListener('keypress', preventNumbersInput);

  