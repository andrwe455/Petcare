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
        console.log(data);
        alert('Appointment updated successfully!');
        window.location.reload(); 
    })
    .catch(error => {
        console.error('Error:', error); 
        alert(`There was an error updating the appointment: ${error.message}`);
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
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'Error creating appointment');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) { 
            alert(data.message);
            window.location.reload(); 
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error); 
        alert(error.message);
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
        alert("All fields must be filled out before submitting.");
        return false; 
    }
    return true; 
  }

  document.getElementById('name').addEventListener('keypress', preventNumbersInput);
  document.getElementById('pet').addEventListener('keypress', preventNumbersInput);
  document.getElementById('veterinarian').addEventListener('keypress', preventNumbersInput);

  