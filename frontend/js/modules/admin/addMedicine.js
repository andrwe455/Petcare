let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0'); 
let date = String(today.getDate()).padStart(2, '0'); 
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

  hidePlaceholder();
});

function hidePlaceholder() {
  const medCategorySelect = document.getElementById('medCategory');
  const placeholderOption = medCategorySelect.querySelector('option[value=""]');
  placeholderOption.style.display = 'none';
}


