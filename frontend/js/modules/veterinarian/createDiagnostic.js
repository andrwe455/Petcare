
$(document).ready(() => {
    fetch('/crtappointmentusers?role=owner')
        .then(res => res.json())
        .then(data => {
            const clientSelect = $('#client');
            clientSelect.empty().append(new Option('Select a client', ''));
            data.forEach(client => {
                clientSelect.append(new Option(`${client.name} ${client.lastName}`, client._id));
            });
        });

   
    fetch('/crtappointmentusers?role=veterinarian')
        .then(res => res.json())
        .then(data => {
            const vetSelectAssigner = $('#assigner');
            vetSelectAssigner.empty().append(new Option('Select a veterinarian', ''));
            data.forEach(vet => {
                vetSelectAssigner.append(new Option(`${vet.name} ${vet.lastName}`, vet._id));
            });
        });

    
    $('#client').on('change', function () {
        const clientId = $(this).val();
        const petSelect = $('#pet');
        petSelect.empty().append(new Option('Select a pet', ''));
        if (clientId) {
            fetch(`/crtappointmentpets?owner=${clientId}`)
                .then(res => res.json())
                .then(data => {
                    data.forEach(pet => {
                        petSelect.append(new Option(pet.name, pet._id));
                    });
                });
        }
    });
});

function createDiagnosis(event) {
    event.preventDefault();

    const form = document.getElementById('createDiagnosis');
    const formData = new FormData(form);

    
    console.log('Datos enviados:', JSON.stringify(jsonData));

    fetch('/crtDiagnostic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData) 
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Diagnosis Created',
                    text: 'The diagnosis was saved successfully!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.reload(); 
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Creation Failed',
                    text: data.message || 'An error occurred while saving the diagnosis.',
                    confirmButtonText: 'OK'
                });
            }
        })
        .catch(error => {
            console.error('Error:', error); 
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message || 'An unexpected error occurred while creating the diagnosis.',
                confirmButtonText: 'OK'
            });
        });
}

document.getElementById('createDiagnosis').addEventListener('submit', function (event) {
    event.preventDefault();

    const form = this;
    const formData = new FormData(form);

    const jsonData = {};
    formData.forEach((value, key) => {
        if (key === 'tests_required[]') {
            jsonData[key.replace('[]', '')] = Array.from(form.querySelectorAll(`#tests_required option:checked`)).map(option => option.value);
        } else {
            jsonData[key] = value || null; 
        }
    });

    const requiredFields = [
        { name: 'owner', displayName: 'owner' },
        { name: 'pet', displayName: 'Pet' },
        { name: 'assigner', displayName: 'Assigned Veterinarian' },
        { name: 'diagnostic_name', displayName: 'Diagnostic Name' },
        { name: 'symptoms_description', displayName: 'Symptoms Description' },
        { name: 'treatment_plan', displayName: 'Treatment Plan' },
        { name: 'initial_date', displayName: 'Start Date of Treatment' },
        { name: 'final_date', displayName: 'End Date of Treatment' }
    ];

    const missingFields = requiredFields.filter(field => {
        const value = formData.get(field.name)?.trim();
        return !value || value === ''; 
    });

    if (missingFields.length > 0) {
        const fieldNames = missingFields.map(field => field.displayName).join(', ');
        Swal.fire({
            icon: 'warning',
            title: 'Required Fields Missing',
            text: `Please fill out the following required fields: ${fieldNames}.`,
            confirmButtonText: 'OK'
        });
        return;
    }

    fetch('/crtDiagnostic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Diagnosis Created',
                    text: 'The diagnosis was saved successfully!',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Creation Failed',
                    text: data.message || 'An error occurred while saving the diagnosis.',
                    confirmButtonText: 'OK'
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message || 'An unexpected error occurred while creating the diagnosis.',
                confirmButtonText: 'OK'
            });
        });
});

