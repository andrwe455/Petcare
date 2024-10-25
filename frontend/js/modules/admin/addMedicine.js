let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let dateStr = `${year}-${month}-${date}`;
let input = document.querySelector('[name=expiration_date]');

input.setAttribute('min', dateStr);

$(document).ready(function() {
  
  var baseId = '';

  $('#medCommercialName, #medGenericName').on('input', function() {

    var commercialName = $('#medCommercialName').val().trim();
    var genericName = $('#medGenericName').val().trim();

    if (commercialName.length >= 3 && genericName.length >= 3) {
      baseId = commercialName.substring(0, 3).toUpperCase() + '_' + genericName.substring(0, 3).toUpperCase();
      $('#medId').val(baseId); 
    } else {
  
      $('#medId').val('');
    }
  });

  $('#medicineForm').on('submit', function(event) {
    event.preventDefault(); 

    $.post('/createMedicine', $(this).serialize()).done(function(response) {

      console.log(response);

      Swal.fire({
        title: 'Success!',
        text: 'Medicine added successfully!',
        icon: 'success',
        confirmButtonText: 'Okay'
      }).then(() => {
        $('#medicineForm')[0].reset(); 
      });
    })
    .fail(function(error) {

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


