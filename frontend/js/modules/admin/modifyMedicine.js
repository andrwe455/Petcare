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

  function performSearch() {
    const searchQuery = $('#searchMedicine').val().trim();
    const deleteButton = $('#deleteButton');
    const modifyButton = $('#modifyButton');
    const searchResultsDiv = $('#searchResults');

    $(document).on('click', function(event) {

      if (!$(event.target).closest('#searchResults').length && !$(event.target).closest('#searchMedicine').length) {
        searchResultsDiv.hide();
      }
    });
  
    if (searchQuery) {
      $.ajax({
        url: '/searchMedicine',
        method: 'GET',
        data: { searchQuery: searchQuery },
        success: function(response) {

          if (response.length > 1) {
            searchResultsDiv.empty().show();
  
            response.forEach(medicine => {
              const resultItem = $(`
                <div class="result-item" data-id="${medicine.medId}">
                  ${medicine.commercial_name} (${medicine.generic_name})
                </div>
              `);
              
              resultItem.on('click', function() {
                
                $('#medCommercialName').val(medicine.commercial_name).prop("disabled", false);
                $('#medGenericName').val(medicine.generic_name).prop("disabled", false);
                $('#medDescription').val(medicine.description).prop("disabled", false);
                $('#medCategory').val(medicine.category).prop("disabled", false);
                $('#medStock').val(medicine.stock).prop("disabled", false);
                $('#medPrice').val(medicine.price).prop("disabled", false);
                if (medicine.expiration_date) {
                  const expirationDate = new Date(medicine.expiration_date);
                  const formattedDate = expirationDate.toISOString().split('T')[0];
                  $('#medExpDate').val(formattedDate).prop("disabled", false);
                }
                $('#medId').val(medicine.medId).prop("disabled", false);

                originalId = medicine.medId;
                originalCommercialName = medicine.commercial_name;
                originalGenericName = medicine.generic_name;

                searchResultsDiv.hide(); 
                deleteButton.show();
              });
  
              searchResultsDiv.append(resultItem); 
            });
          } else if (response.length === 1) {
            
            const medicine = response[0];
            populateMedicineFields(medicine, deleteButton, searchResultsDiv, modifyButton);
          }
        },
        error: function(error) {
          if (error.status === 404) {
            handleNotFound(deleteButton, modifyButton);
            disableFields();
            searchResultsDiv.hide(); 
          } else {
            handleError(deleteButton,modifyButton);
            disableFields();
            searchResultsDiv.hide(); 
          }
        }
      });
    } else {
      handleNothingTyped();
      searchResultsDiv.hide(); 
    }
  }
  
  function populateMedicineFields(medicine, deleteButton, searchResultsDiv, modifyButton) {

    $('#medCommercialName').val(medicine.commercial_name).prop("disabled", false);
    $('#medGenericName').val(medicine.generic_name).prop("disabled", false);
    $('#medDescription').val(medicine.description).prop("disabled", false);
    $('#medCategory').val(medicine.category).prop("disabled", false);
    $('#medStock').val(medicine.stock).prop("disabled", false);
    $('#medPrice').val(medicine.price).prop("disabled", false);
    if (medicine.expiration_date) {
      const expirationDate = new Date(medicine.expiration_date);
      const formattedDate = expirationDate.toISOString().split('T')[0];
      $('#medExpDate').val(formattedDate).prop("disabled", false);
    }
    $('#medId').val(medicine.medId).prop("disabled", false);

    originalId = medicine.medId;
    originalCommercialName = medicine.commercial_name;
    originalGenericName = medicine.generic_name;

    if (searchResultsDiv) {
      searchResultsDiv.hide();
    }
    
    deleteButton.show();
    modifyButton.show();
  }

  function disableFields() {
    $('#medCommercialName, #medGenericName, #medDescription, #medCategory, #medStock, #medPrice, #medExpDate, #medId')   
      .prop("disabled", true);  
  }

  function handleNotFound(deleteButton, modifyButton) {

    Swal.fire({
      title: 'Not Found!',
      text: 'Medicine not found',
      icon: 'warning',
      confirmButtonText: 'Okay'
    });

    $('#medicineForm')[0].reset(); 
    deleteButton.hide();
    modifyButton.hide();
  }

  function handleError(deleteButton, modifyButton){

    Swal.fire({
      title: 'Error!',
      text: 'An error occurred while fetching medicine data.',
      icon: 'error',
      confirmButtonText: 'Accept'
    });

    $('#medicineForm')[0].reset(); 
    deleteButton.hide();
    modifyButton.hide();
  }

  function handleNothingTyped(){
    Swal.fire({
      title: 'Error!',
      text: 'Please enter a search term.',
      icon: 'warning',
      confirmButtonText: 'Okay'
    });
  }

  $('#searchButton').on('click', performSearch);

  $('#searchMedicine').on('keypress', function(event) {
    if (event.which === 13) {
      event.preventDefault();  
      performSearch();         
    }
  });

  $('#medicineForm').on('submit', async function(event) {
    event.preventDefault();

    const newCommercialName = $('#medCommercialName').val();
    const newGenericName = $('#medGenericName').val();
    const newBaseId = newCommercialName.substring(0, 3).toUpperCase() + '_' + newGenericName.substring(0, 3).toUpperCase();
    let newId = originalId;
    let isNewIdNeeded = false;

    if ((newCommercialName !== originalCommercialName || newGenericName !== originalGenericName) && newBaseId != originalBaseId) {

      const checkIdExists = async (id) => {
        const checkResponse = await fetch(`/checkIdExists?id=${id}`);
        const exists = await checkResponse.json();
        return exists;
      };

      let counter = 1;
      let potentialId = `${newBaseId}_${String(counter).padStart(3, '0')}`;

      while (await checkIdExists(potentialId)) {
        counter++;
        potentialId = `${newBaseId}_${String(counter).padStart(3, '0')}`;
      }

      newId = potentialId; 
      isNewIdNeeded = true; 
      $('#medId').val(newId); 
      console.log(newId);

      if (!await checkIdExists(originalId)) {
        
        newId = originalId;
        $('#medId').val(newId); 
      }
    }

    const medicineData = {
      medId: newId, 
      commercial_name: newCommercialName,
      generic_name: newGenericName,
      description: $('#medDescription').val(),
      expiration_date: $('#medExpDate').val(),
      category: $('#medCategory').val(),
      stock: parseInt($('#medStock').val()),
      price: parseFloat($('#medPrice').val())
    };

    try {
      
      const response = await fetch('/modifyMedicine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...medicineData, originalId }) 
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

