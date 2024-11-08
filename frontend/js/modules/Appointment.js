function updateapp() {
    const form = document.getElementById('updatea');
    const formData = new FormData(form);

    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    console.log(JSON.stringify(jsonData));

    fetch("/updateappointment", {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(jsonData) 
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
            text: 'Appointment updated successfully!',
        }).then(() => {
            window.location.reload(); 
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
        jsonData[key] = value;
    });

    console.log(JSON.stringify(jsonData)); 

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


  document.getElementById('name').addEventListener('keypress', preventNumbersInput);
  document.getElementById('pet').addEventListener('keypress', preventNumbersInput);
  document.getElementById('veterinarian').addEventListener('keypress', preventNumbersInput);

  