$('#deleteButton').on('click', async function() {

  const medId = $('#medId').val(); 

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',   
    cancelButtonColor: '#3085d6', 
    confirmButtonText: 'Yes, I am sure',
    cancelButtonText: 'No, cancel'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`/removeMedicine?id=${medId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          Swal.fire("Removed", "The medicine has been removed from the inventory.", "success")
            .then(() => {
              $('#medicineForm')[0].reset(); 
              disableFields();              
              $('#deleteButton').hide();    
              $('#modifyButton').hide(); 
            });
        } else {
          Swal.fire("Error", "Could not remove the medicine from the inventory.", "error");
        }
      } catch (error) {
        console.error("Error removing medicine:", error);
        Swal.fire("Error", "An error occurred while removing the medicine from the inventory.", "error");
      }
    }
  });
});

$(document).on('click', '.deleteButton', async function(event) {

  event.preventDefault(); 

  const medId = $(this).data('id'); 
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will permanently delete the medicine record.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it'
  });

  if (result.isConfirmed) {
    try {
      const response = await fetch(`/removeMedicine?id=${medId}`, { method: 'DELETE' });

      if (response.ok) {
        Swal.fire('Deleted!', 'The medicine record has been deleted.', 'success')
          .then(() => location.reload()); 
      } else {
        Swal.fire('Error', 'Could not delete the medicine record.', 'error');
      }
    } catch (error) {
      console.error("Error deleting medicine:", error);
      Swal.fire('Error', 'An error occurred while deleting the medicine.', 'error');
    }
  }
});

function disableFields() {
  $('#medCommercialName, #medGenericName, #medDescription, #medCategory, #medStock, #medPrice, #medExpDate, #medId')   
    .prop("disabled", true);  
}