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


function disableFields() {
  $('#medCommercialName, #medGenericName, #medDescription, #medCategory, #medStock, #medPrice, #medExpDate, #medId')   
    .prop("disabled", true);  
}