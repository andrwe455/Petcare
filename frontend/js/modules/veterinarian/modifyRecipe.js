function hidePlaceholder() {

  const placeHolders = document.querySelectorAll('.hide-placeholder');

  placeHolders.forEach((element) => {
    const placeholderOption = element.querySelector('option[value=""]');
    
    if (placeholderOption) {
      placeholderOption.style.display = 'none';
    }
  });
}

function countMedicines() {
  return document.querySelectorAll('[id^="medicineRow"]').length;
}  

$(document).ready(function() {

  let owner = document.getElementById('ownerInfo').value;
  let pet = document.getElementById('petInfo').value;
  const petField = document.getElementById('petInfo');
  const ownerField = document.getElementById('ownerInfo');
  let modifiedRecipe;
  let medicineCounter;

  petField.addEventListener('change', function(){

    pet = document.getElementById('petInfo').value;
    owner = document.getElementById('ownerInfo').value;

    resetFields();
    disableFields();
    loadingFields();
    performSearch(owner, pet);
  });

  ownerField.addEventListener('change', function () {

    const petField = document.getElementById('petInfo');
    const owner = document.getElementById('ownerInfo').value;
    
    resetFields();
    disableFields();
    loadingFields();
  
    const interval = setInterval(() => {
      if (petField.textContent !== 'Loading pets...') {
        clearInterval(interval); 
  
        const pet = petField.value;
        if (pet != 0) {
          performSearch(owner, pet);
        }
        else{
          disableFields();
          resetFields();
        }
      }
    }, 50); 
  });
  
  function performSearch(owner, pet){
    $.ajax({
      url: '/getRecipes',
      method: 'GET',
      data: {owner: owner, pet: pet},
      success: function(response) {
        if (response.length === 0) {

          resetFields();

          return Swal.fire({
            title: 'No recipes found',
            text: `This pet has no recipes assigned.`,
            icon: 'warning',
            confirmButtonText: 'Okay'
          });
        } 

        else if (response.length === 1){
          const recipe = response[0];
          modifiedRecipe = recipe;
          populateFields(recipe);
          hidePlaceholder();
        }

        else {
          function showModal() {

            if ($('#recipeModal').length === 0) {
        
              let modalContent = `
                <div class="modal fade" id="recipeModal" tabindex="-1" role="dialog" aria-labelledby="recipeModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="recipeModalLabel">Select a Recipe</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <table class="table table-bordered">
                          <thead>
                            <tr>
                              <th>Assigner</th>
                              <th>Generation Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
              `;
        
              response.forEach((recipe, index) => {
                const formattedDate = new Date(recipe.generation_date).toLocaleDateString();
                const assignerName = `${recipe.assigner.name} ${recipe.assigner.lastName}`;
        
                modalContent += `
                  <tr>
                    <td>${assignerName}</td>
                    <td>${formattedDate}</td>
                    <td>
                      <button type="button" class="btn btn-primary select-recipe-btn" data-index="${index}">Select</button>
                    </td>
                  </tr>
                `;
              });
        
              modalContent += `
                          </tbody>
                        </table>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              `;
        
              $('body').append(modalContent);
              $('#recipeModal').modal('show');
        
              $('.select-recipe-btn').on('click', function () {

                resetFields();
                $('#openRecipeModal').show();

                const selectedIndex = $(this).data('index');
                const selectedRecipe = response[selectedIndex];
                modifiedRecipe = selectedRecipe;
        
                populateFields(selectedRecipe);
                hidePlaceholder();
        
                $('#recipeModal').modal('hide');
        
                $('#recipeModal').on('hidden.bs.modal', function () {
                  $('.modal-backdrop').remove(); 
                  $(this).remove(); 
                });
              });
            } else {
              $('#recipeModal').modal('show');
            }
          }
        }

        showModal();

        $('#openRecipeModal').on('click', function () {
          showModal();
        });
      },

      error: function() {

        resetFields();

        return Swal.fire({
          title: 'Error',
          text: `An error has happened while retrieving the recipe's data.`,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    });
  }

  function populateFields(recipe) {

    const initialDate = new Date(recipe.initial_date);
    const formattedInitialDate = initialDate.toISOString().split('T')[0];
    const finalDate = new Date(recipe.final_date);
    const formattedFinalDate = finalDate.toISOString().split('T')[0];
    const assignedBy = `<h2 class="card-title">Assigned by: ${recipe.assigner.name} ${recipe.assigner.lastName}</h2>`;
  
    $('#initialDate').val(formattedInitialDate).prop('disabled', false);
    $('#finalDate').val(formattedFinalDate).prop('disabled', false);
    $('#recommendationsInfo').val(recipe.recommendations).prop('disabled', false);
    $('#medicinesInfo').val('').prop('disabled', false);
    $('#addButton').prop('disabled', false);
    formHeader.insertAdjacentHTML('beforeend', assignedBy);
  
    recipe.medicines.forEach((medName, index) => {

      const doseAmount = recipe.dose_amount[index];
      const doseType = recipe.dose_type[index];
      const doseTimeType = recipe.dose_time_type[index];
      const doseTimeAmount = recipe.dose_time_amount[index];
  
      const newRow = `
        <div class="row mb-2" id="medicineRow${index}">
          <div class="col-6">
            <div class="form-group">
              <div class="input-group">
                <input type="number" id="doseAmount${index}" min="1" class="form-control" name="dose_amount" placeholder="amount" value="${doseAmount}" required>
                
                <div>
                  <select id="doseType${index}" class="form-control hide-placeholder" name="dose_type" required>
                    <option value="" disabled ${!doseType ? 'selected' : ''}>Pills/Drops</option>
                    <option ${doseType === 'Pills' ? 'selected' : ''}>Pills</option>
                    <option ${doseType === 'Drops' ? 'selected' : ''}>Drops</option>
                  </select>
                </div>
                
                <div class="input-group-prepend">
                  <span class="input-group-text">per</span>
                </div>
                
                <input type="number" id="doseTime${index}" min="1" class="form-control" name="dose_time_amount" placeholder="time" value="${doseTimeAmount}" required>
                
                <div>
                  <select id="doseTimeType${index}" class="form-control hide-placeholder" name="dose_time_type" required>
                    <option value="" disabled ${!doseTimeType ? 'selected' : ''}>Hours/Days</option>
                    <option ${doseTimeType === 'Hours' ? 'selected' : ''}>Hours</option>
                    <option ${doseTimeType === 'Days' ? 'selected' : ''}>Days</option>
                  </select>
                </div>
              
                <input type="text" title="${medName}" id="medicineName${index}" class="form-control" name="medicines" placeholder="Medicine" value="${medName}" readonly>
              
                <button type="button" class="btn btn-outline-danger ml-2" onclick="this.closest('.row').remove();">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
  
      medicinesGroup.insertAdjacentHTML('beforeend', newRow);
    });
  
    $('#deleteButton, #modifyButton').show();
  }
  
  function disableFields(){
    $('#initialDate, #finalDate, #recommendationsInfo, #medicinesInfo, #addButton').prop("disabled", true); 
    $('#deleteButton, #modifyButton').hide();
  }

  function resetFields(){
    $('#initialDate, #finalDate, #recommendationsInfo, #medicinesInfo').val(''); 
    $('#deleteButton, #modifyButton, #openRecipeModal').hide();
    document.getElementById('formHeader').innerHTML = '<h2 class="card-title">Recipe information</h2>';
    document.getElementById('medicinesGroup').innerHTML = '<label class="required">Dose</label>';
  }
  
  function loadingFields(){
    $('#recommendationsInfo, #medicinesInfo').val('Loading...'); 
    $('#initialDate, #finalDate').val('');
  }

  $('#modifyRecipeForm').on('submit', async function(event) {
    event.preventDefault();
  
    console.log(`Medicine Counter: ${medicineCounter}`);
    console.log(document.querySelectorAll('[id^="medicineRow"]'));

    const petSelect = document.getElementById('petInfo');
    const petText = petSelect.textContent;
    const petId = petSelect.value;
    const recipeId = modifiedRecipe._id;

    let allergies = [];

    try {
      const response = await fetch(`/getPetsById/${petId}`);
      const petData = await response.json();
      allergies = petData.allergies || [];
      console.log(allergies);
    } catch (error) {
      console.error('Error fetching pet data:', error);
      return Swal.fire({
        title: 'Error!',
        text: 'Unable to fetch pet allergies.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }

    const medicines = [];
    medicineCounter = countMedicines();

    for (let i = 0; i < medicineCounter; i++) {

      const medicineInput = document.getElementById(`medicineName${i}`);

      if (medicineInput && medicineInput.value.trim()) {
        medicines.push(medicineInput.value.trim());
      }
    }

    const conflictingAllergies = medicines.filter(medicine => 
      allergies.some(allergy => allergy.name === medicine)
    );

    if (conflictingAllergies.length > 0) {
      return Swal.fire({
        title: 'Warning!',
        text: `The pet is allergic to: ${conflictingAllergies.join(', ')}.`,
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
    } 
    
    else if(medicineCounter == 0){
      Swal.fire({
        title: 'Hey!',
        text: 'You need to add at least one medicine.',
        icon: 'warning',
        confirmButtonText: 'Okay'
      })
    }

    else if(petText == 'No pets found'){
      Swal.fire({
        title: 'Hey!',
        text: 'This person has no pets registered.',
        icon: 'warning',
        confirmButtonText: 'Okay'
      });
    }

    else{

      const updatedData = {
        medicines: [],
        dose_amount: [],
        dose_time_amount: [],
        dose_type: [],
        dose_time_type: [],
        initial_date: $('#initialDate').val(),
        final_date: $('#finalDate').val(),
        recommendations: $('#recommendationsInfo').val()
      };
    
      for (let i = 0; i < medicineCounter; i++) {
        updatedData.medicines.push($(`#medicineName${i}`).val());
        updatedData.dose_amount.push($(`#doseAmount${i}`).val());
        updatedData.dose_type.push($(`#doseType${i}`).val());
        updatedData.dose_time_amount.push($(`#doseTime${i}`).val());
        updatedData.dose_time_type.push($(`#doseTimeType${i}`).val());

        console.log($(`#medicineName${i}`).val());
      }

      console.log(`Medicine Counter: ${medicineCounter}`);
      console.log(document.querySelectorAll('[id^="medicineRow"]'));
      saveModifiedRecipe(recipeId, updatedData);
    }
  });
  
  function saveModifiedRecipe(recipeId, updatedData) {
    $.ajax({
      url: `/updateRecipe/${recipeId}`, // Pass the recipe ID in the URL
      method: 'PUT', // Use PUT for updates
      contentType: 'application/json',
      data: JSON.stringify(updatedData), // Send the updated recipe data
      success: function(response) {
        Swal.fire({
          title: 'Success',
          text: 'Recipe updated successfully!',
          icon: 'success',
          confirmButtonText: 'Okay'
        });
      },
      error: function(error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update the recipe. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    });
    medicineCounter = 0;
  }
});
