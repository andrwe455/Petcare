let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0'); 
let date = String(today.getDate()).padStart(2, '0'); 
let dateStr = `${year}-${month}-${date}`; 
const initialDate = document.querySelector('[name=initial_date]');
const finalDate = document.querySelector('[name=final_date]');
const recommendationsDiv = document.getElementById('recommendationsInfo');

initialDate.setAttribute('min', dateStr);
finalDate.setAttribute('disabled', true);

initialDate.addEventListener('change', function () {

  if (initialDate.value) {
    const inputInitialDate = new Date(initialDate.value);
    const inputFinalDate = new Date(finalDate.value);

    finalDate.setAttribute('min', initialDate.value);

    if (inputFinalDate < inputInitialDate) {
      finalDate.value = initialDate.value;
    }

    finalDate.removeAttribute('disabled');
  } else {
    finalDate.setAttribute('disabled', true);
  }
});

function hidePlaceholder() {

  const placeHolders = document.querySelectorAll('.hide-placeholder');

  placeHolders.forEach((element) => {
    const placeholderOption = element.querySelector('option[value=""]');
    
    if (placeholderOption) {
      placeholderOption.style.display = 'none';
    }
  });
}

function adjustHeight(element) {
  
  if (!element.value.trim()) {
    element.style.height = 'auto'; 
    return; 
  }

  element.style.height = 'auto'; 
  element.style.height = element.scrollHeight + 'px'; 
}

let medicineCounter = 0; 

function addMedicine() {

  const medicinesGroup = document.getElementById('medicinesGroup');
  const medicineInput = document.getElementById('medicinesInfo');
  const medicineName = medicineInput.value;

  medicineCounter = countMedicines();

  if(!medicineName){
    alert('Enter a medicine first');
  }
  
  else{
    const newRow = `
      <div class="row mb-2" id="medicineRow${medicineCounter}">
        <div class="col-6">
          <div class="form-group">
            <div class="input-group">
              <input type="number" id="doseAmount${medicineCounter}" min="1" class="form-control" name="dose_amount" placeholder="amount" required oninvalid="this.setCustomValidity('Please enter a valid amount')" oninput="this.setCustomValidity('')">
              
              <div>
                <select id="doseType${medicineCounter}" class="form-control hide-placeholder" name="dose_type" required oninvalid="this.setCustomValidity('Please select one')" oninput="setCustomValidity('')">
                  <option value="" disabled selected>Pills/Drops</option>
                  <option>Pills</option>
                  <option>Drops</option>
                </select>
              </div>
              
              <div class="input-group-prepend">
                <span class="input-group-text">per</span>
              </div>
              
              <input type="number" id="doseTime${medicineCounter}" min="1" class="form-control" name="dose_time_amount" placeholder="time" required oninvalid="this.setCustomValidity('Please enter a valid number of days')" oninput="this.setCustomValidity('')">
              
              <div>
                <select id="doseTimeType${medicineCounter}" class="form-control hide-placeholder" name="dose_time_type" required oninvalid="this.setCustomValidity('Please select one')" oninput="setCustomValidity('')">
                  <option value="" disabled selected>Hours/Days</option>
                  <option>Hours</option>
                  <option>Days</option>
                </select>
              </div>
            
              <input type="text" title="${medicineName}" id="medicineName${medicineCounter}" class="form-control" name="medicines" placeholder="Medicine" value="${medicineName}" readonly>
            
              <button type="button" class="btn btn-outline-danger ml-2" onclick="this.closest('.row').remove(); medicineCounter--;">
                <i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    medicinesGroup.insertAdjacentHTML('beforeend', newRow);

    medicineInput.value = '';

    medicineCounter++; 

    hidePlaceholder();
  }
}

function setAssigner(){

  fetch('/getUserData').then(response => response.json()).then(data => {

    document.getElementById('username').innerHTML = data.name;
    document.getElementById('assignerId').value = data._id;
    document.getElementById('assigner').value = data.name + " " + data.lastName;
  })
  .catch((error) => console.error('Error fetching user data:', error));
}

function getOwners(){

  fetch('/getAllUsers').then(response => response.json()).then(data => {

    const select = document.getElementById('ownerInfo');

    data.forEach(owner => {
      if(owner.role == 'owner'){

        const option = document.createElement('option');
        option.textContent = `${owner.name} ${owner.lastName}`;
        option.value = owner._id;
        select.appendChild(option);
      }
    });
  })
}

function getPets(){

  fetch('/getAllPets').then(response => response.json()).then(data => {

    const select = document.getElementById('petInfo');
    const owner = document.getElementById('ownerInfo').value;

    select.removeAttribute('disabled');
    select.innerHTML = '';

    data.forEach(pet => {

      if (pet.owner && (pet.owner == owner)) {

        const option = document.createElement('option');
        option.textContent = `${pet.name} (${pet.breed})`;
        option.value = pet._id;
        select.appendChild(option);
      }
    });

    if(select.options.length == 0){

      const option = document.createElement('option');
      option.textContent = 'No pets found';
      option.value = 0;
      select.appendChild(option);
      select.setAttribute('disabled', true);
    }
  })
}

$(document).ready(function() {

  hidePlaceholder();
  setAssigner();
  getOwners();
  
  const select = document.getElementById('ownerInfo');
  const petSelect = document.getElementById('petInfo');

  select.addEventListener('change', function () {

    petSelect.innerHTML = '';

    const loadingOption = document.createElement('option');
    loadingOption.textContent = 'Loading pets...';
    petSelect.appendChild(loadingOption);
    petSelect.setAttribute('disabled', true);

    getPets();
  });

  $('#recipeForm').on('submit', async function(event) {

    event.preventDefault(); 

    const petText = petSelect.textContent;
    const petId = petSelect.value;

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
      
      $.post('/createRecipe', $(this).serialize()).done(function(response) {

        console.log(response);
  
        Swal.fire({
          title: 'Success!',
          text: 'Recipe created succesfully!',
          icon: 'success',
          confirmButtonText: 'Okay'
        })
      })
      .fail(function(error) {
  
        console.error(error);
        
        Swal.fire({
          title: 'Error!',
          text: 'There was an creating the recipe.',
          icon: 'error',
          confirmButtonText: 'Accept'
        });
      });
    }
  });
});

function countMedicines() {
  return document.querySelectorAll('[id^="medicineRow"]').length;
}  




