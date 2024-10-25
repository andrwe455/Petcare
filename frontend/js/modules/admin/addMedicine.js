let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let dateStr = `${year}-${month}-${date}`;
let input = document.querySelector('[name=expiration_date]');

input.setAttribute('min', dateStr);

$(document).ready(function() {
  
  var baseId = ''; // To store the generated base ID

  // Event listener for typing in commercial or generic name fields
  $('#medCommercialName, #medGenericName').on('input', function() {
    // Get values from the input fields
    var commercialName = $('#medCommercialName').val().trim();
    var genericName = $('#medGenericName').val().trim();

    // Check if both commercial and generic names are filled
    if (commercialName.length >= 3 && genericName.length >= 3) {
      // Generate the base ID using the first 3 letters of both commercial and generic names
      baseId = commercialName.substring(0, 3).toUpperCase() + '_' + genericName.substring(0, 3).toUpperCase();
      $('#medId').val(baseId); // Preview the next available ID
    } else {
      // Clear the ID field if inputs are not valid
      $('#medId').val('');
    }
  });

  $('#medicineForm').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Submit the form via AJAX
    $.post('/createMedicine', $(this).serialize())
    .done(function(response) {
      // Handle success response
      console.log(response);
      // Show success alert (this can also be part of onFormValid if you want)
      Swal.fire({
        title: 'Success!',
        text: 'Medicine added successfully!',
        icon: 'success',
        confirmButtonText: 'Okay'
      }).then(() => {
        // Clear the form after the alert is closed
        $('#medicineForm')[0].reset(); // Reset the form
      });
    })
    .fail(function(error) {
      // Handle error response
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error adding the medicine.',
        icon: 'error',
        confirmButtonText: 'Accept'
      });
    });
  });
});


