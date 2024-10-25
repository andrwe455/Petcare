let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let dateStr = `${year}-${month}-${date}`;
let input = document.querySelector('[name=expiration_date]');

input.setAttribute('min', dateStr);

$(document).ready(function() {
  let originalId = '';
  let originalCommercialName = '';
  let originalGenericName = '';
  let originalBaseId = '';

  // When search button is clicked, fetch the medicine data
  $('#searchButton').on('click', function() {
    var searchQuery = $('#searchMedicine').val().trim();

    if (searchQuery) {
      // Send AJAX request to search for the medicine
      $.ajax({
        url: '/searchMedicine',
        method: 'GET',
        data: { searchQuery: searchQuery },
        success: function(response) {
          // Populate the form fields with the returned medicine data
          $('#medCommercialName').val(response.commercial_name);
          $('#medGenericName').val(response.generic_name);
          $('#medDescription').val(response.description);
          if (response.expiration_date) {
            const expirationDate = new Date(response.expiration_date);
            const formattedDate = expirationDate.toISOString().split('T')[0];
            $('#medExpDate').val(formattedDate);
          }
          $('#medCategory').val(response.category);
          $('#medStock').val(response.stock);
          $('#medPrice').val(response.price);
          $('#medId').val(response.medId);

          // Store the original ID and commercial/generic names
          originalId = response.medId;
          originalCommercialName = response.commercial_name;
          originalGenericName = response.generic_name;
          originalBaseId = originalCommercialName.substring(0, 3).toUpperCase() + '_' + originalGenericName.substring(0, 3).toUpperCase();

          $('#medCommercialName, #medGenericName, #medDescription, #medExpDate, #medCategory, #medStock, #medPrice, #medId').prop('disabled', false);
        },
        error: function(error) {
          
          $('#medicineForm')[0].reset();

          Swal.fire({
            title: error.status === 404 ? 'Not Found!' : 'Error!',
            text: error.status === 404 ? 'Medicine not found' : 'An error occurred while fetching medicine data.',
            icon: 'warning',
            confirmButtonText: 'Okay'
          })

          $('#medCommercialName, #medGenericName, #medDescription, #medExpDate, #medCategory, #medStock, #medPrice, #medId').prop('disabled', true);
        }
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a search term.',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
    }
  });

  // Handle form submission and potential ID update
  $('#medicineForm').on('submit', async function(event) {
    event.preventDefault();

    const newCommercialName = $('#medCommercialName').val();
    const newGenericName = $('#medGenericName').val();
    const newBaseId = newCommercialName.substring(0, 3).toUpperCase() + '_' + newGenericName.substring(0, 3).toUpperCase();
    let newId = originalId;
    let isNewIdNeeded = false;

    // Check if the commercial name has changed
    if ((newCommercialName !== originalCommercialName || newGenericName !== originalGenericName) && newBaseId != originalBaseId) {

      // AJAX request to check if the new ID already exists
      const checkIdExists = async (id) => {
        const checkResponse = await fetch(`/checkIdExists?id=${id}`);
        const exists = await checkResponse.json();
        return exists;
      };

      let counter = 1;
      let potentialId = `${newBaseId}_${String(counter).padStart(3, '0')}`;

      // Keep incrementing the ID counter if it already exists
      while (await checkIdExists(potentialId)) {
        counter++;
        potentialId = `${newBaseId}_${String(counter).padStart(3, '0')}`;
      }

      newId = potentialId; // Update the ID to the new unique ID
      isNewIdNeeded = true; // Flag that a new ID is needed
      $('#medId').val(newId); // Update the ID field with the new one
      console.log(newId);

      // **New check to see if the old ID still exists**
      if (!await checkIdExists(originalId)) {
        // If the original ID does not exist, revert to the original ID
        newId = originalId;
        $('#medId').val(newId); // Revert the ID field to the original ID
    }
    }

    // Collect data for submission
    const medicineData = {
      medId: newId, // Always use the potentially new ID
      commercial_name: newCommercialName,
      generic_name: newGenericName,
      description: $('#medDescription').val(),
      expiration_date: $('#medExpDate').val(),
      category: $('#medCategory').val(),
      stock: parseInt($('#medStock').val()),
      price: parseFloat($('#medPrice').val())
    };

    try {
      // Use the original ID to find the document, regardless of whether the ID changes
      const response = await fetch('/modifyMedicine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...medicineData, originalId }) // Include originalId to find the document
      });

      if (response.ok) {
        Swal.fire("Success!", "Medicine data has been updated.", "success").then(() => {
          $('#searchMedicine').val('');
        });
      } else {
        throw new Error("Failed to update medicine data.");
      }
    } catch (error) {
      Swal.fire("Error!", "Unable to update medicine data.", "error");
      console.error(error);
    }

    originalId = newId; 
  });
});

