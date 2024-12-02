$(document).ready(function() {

  let owner = document.getElementById('ownerInfo').value;
  let pet = document.getElementById('petInfo').value;
  const petField = document.getElementById('petInfo');
  const ownerField = document.getElementById('ownerInfo');

  petField.addEventListener('change', function(){

    pet = document.getElementById('petInfo').value;
    owner = document.getElementById('ownerInfo').value;

    loadingFields();
    disableFields();
    performSearch(owner, pet);
  });

  ownerField.addEventListener('change', function () {

    const petField = document.getElementById('petInfo');
    const owner = document.getElementById('ownerInfo').value;
    
    resetFields();
    disableFields();
  
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
          
          disableFields();
          resetFields();

          return Swal.fire({
            title: 'No recipes found',
            text: `This pet has no recipes assigned.`,
            icon: 'warning',
            confirmButtonText: 'Okay'
          });
        } 
        else if (response.length === 1){
          const medicine = response[0];
          populateFields(medicine, deleteButton, modifyButton);
        }
      },
      error: function() {

        disableFields();
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

  function populateFields(medicine){

    const initialDate = new Date(medicine.initial_date);
    const formattedInitialDate = initialDate.toISOString().split('T')[0];
    const finalDate = new Date(medicine.final_date);
    const formattedFinalDate = finalDate.toISOString().split('T')[0];
    let medicineCounter = 0;

    $('#initialDate').val(formattedInitialDate).prop("disabled", false);
    $('#finalDate').val(formattedFinalDate).prop("disabled", false);
    $('#recommendationsInfo').val(medicine.recommendations).prop("disabled", false);
    $('#medicinesInfo').prop("disabled", false);
    $('#addButton').prop("disabled", false);

    medicine.medicines.forEach((medicineCounter) => {
      medicineCounter++;
    });
    
    medicine.medicines.forEach((medicines, index) => {

      const {doseType, doseTimeType} = medicines;

      const newRow = `
        <div class="row mb-2" id="medicineRow${index}">
          <div class="col-6">
            <div class="form-group">
              <div class="input-group">
                <input type="number" id="doseAmount${index}" min="1" class="form-control" name="dose_amount" placeholder="amount" value="${medicine.dose_amount || ''}" required>
                
                <div>
                  <select id="doseType${index}" class="form-control hide-placeholder" name="dose_type" required>
                    <option value="" disabled ${medicine.dose_type ? 'selected' : ''}>Pills/Drops</option>
                    <option ${doseType === 'Pills' ? 'selected' : ''}>Pills</option>
                    <option ${doseType === 'Drops' ? 'selected' : ''}>Drops</option>
                  </select>
                </div>
                
                <div class="input-group-prepend">
                  <span class="input-group-text">per</span>
                </div>
                
                <input type="number" id="doseDays${index}" min="1" class="form-control" name="dose_time_amount" placeholder="time" value="${medicine.dose_time_amount || ''}" required>
                
                <div>
                  <select class="form-control hide-placeholder" name="dose_time_type" required>
                    <option value="" disabled ${medicine.dose_time_type ? 'selected' : ''}>Hours/Days</option>
                    <option ${doseTimeType === 'Hours' ? 'selected' : ''}>Hours</option>
                    <option ${doseTimeType === 'Days' ? 'selected' : ''}>Days</option>
                  </select>
                </div>
              
                <input type="text" title="${medicine.medicines}" id="medicineName${index}" class="form-control" name="medicines" placeholder="Medicine" value="${medicine.medicines}" readonly>
              
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

    $('#deleteButton').show();
    $('#modifyButton').show();
  }

  function disableFields(){
    $('#initialDate, #finalDate, #recommendationsInfo, #medicinesInfo, #addButton').prop("disabled", true); 
    $('#deleteButton').hide();
    $('#modifyButton').hide();
  }

  function resetFields(){
    $('#initialDate, #finalDate, #recommendationsInfo, #medicinesInfo').val(''); 
    $('#deleteButton').hide();
    $('#modifyButton').hide();
  }
  
  function loadingFields(){
    $('#initialDate, #finalDate, #recommendationsInfo, #medicinesInfo').val('Loading...'); 
  }
});

