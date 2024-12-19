function dataTable(metodo,table,url,role){
  if(metodo == 'getAllPets'){
    getAllPets(table,url,role);
  }else if (metodo == 'getVaccineRecord'){

    const geturl = window.location.href;
    const urlSplit = geturl.split('/');

    url = url +'/'+ urlSplit[urlSplit.length - 1];

    getVaccineRecord(table,url);
  } else if(metodo == 'getAllAppointments'){
    getAllAppointments(table,url);
  }
  else if(metodo == 'getAllMedicines'){
    getAllMedicines(table,url);
  }
}

async function getVaccineRecord(table,url){
  fetch(url).then(response => response.json()).then(data => {
    let i = 1;
    if(data.message =='missing id'){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No id provided!',
      });
      let url2 
      if(window.location.href.includes('veterinarian')){
        url2 = '/getAllPets';
      }else{
        url2 = '/getPetsByOwner';
      }
      fetch(url2).then(response => response.json()).then(data => {
        data.forEach(element =>{
          document.getElementById('selectPetid').innerHTML += `<option value="${element._id}">${element.name}</option>`;
        })
      });
    }else{
      let url2 
      if(window.location.href.includes('veterinarian')){
        url2 = '/getAllPets';
      }else{
        url2 = '/getPetsByOwner';
      }
      fetch(url2).then(response => response.json()).then(data => {
        data.forEach(element =>{
          document.getElementById('selectPetid').innerHTML += `<option value="${element._id}">${element.name}</option>`;
        })
      });
      document.getElementById('id').value = data._id;
        petsName('pet-name',data.name); 
        if ($.fn.DataTable.isDataTable('#example1')) {
          $('#example1').DataTable().clear().destroy(); 
        }
      if(data.vaccinationRecords.length == 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No vaccination records found!',
        });
      }else{
        
        data.vaccinationRecords.forEach(element => {
          const url = window.location.href;
          const urlSplit = url.split('/');

          const role = urlSplit[4];
          const date= new Date(element.date).toLocaleString('en-GB', { hour12: true });
          const nextAppointment = new Date(element.nextAppointment).toLocaleString('en-GB', { hour12: true });

          if(role == 'veterinarian'){

            document.getElementById(table).innerHTML += `
            <tr>
              <td>${i}</td>
              <td>${element.vaccine}</td>
              <td>${date}</td>
              <td>${nextAppointment ?? 'Not Apply'}</td>
              
              <td><a class="fas fa-edit" data-toggle="modal" data-target="#modal-default"></a></td>
            </tr>`;
            i++;
          }else{
            document.getElementById(table).innerHTML += `
            <tr>
              <td>${i}</td>
              <td>${element.vaccine}</td>
              <td>${date}</td>
              <td>${nextAppointment ?? 'Not Apply'}</td>
              <td>Nothing to do here</td>
            </tr>`;
            i++;
          }
        });
           
      }
      $(function () {
        
        $("#example1").DataTable({
          "responsive": true, "lengthChange": false, "autoWidth": false,
        })
      });
    }	
  });
}

function getAllPets(table,url,role){
  fetch(url).then(response => response.json()).then(data => {
    let i = 1;
    document.getElementById(table).innerHTML = "";
    data.forEach(element => {
      document.getElementById(table).innerHTML += `
      <tr>
        <td>${i}</td>
        <td>${element.name}</td>
        <td>${element.age} years</td>
        <td>${element.weight} Kg</td>
        <td>${element.breed}</td>
        <td>${element.type}</td>
        <td class="w-25 text-center">
          <img src="${element.image}" alt="Pet image" class="img-thumbnail w-25">
          <a class="fas fa-trash deleteButton" style="color: red;" href="/deletePhoto/${element.name}"></a>
        </td>
        <td>
          <a class="fas fa-eye" href="/home/${role}/vaccineRecords/${element._id}"></a>
          <a class="fas fa-edit" data-toggle="modal" data-target="#modal-default" data-name="${element.name}" 
          data-age="${element.age}" data-weigth="${element.weight}" data-breed="${element.breed}" 
          data-id="${element._id}" data-type="${element.type}"></a>
          <a class="fas fa-trash deleteButton" style="color: red;" onclick="deletePet('${element._id}','${element.name}')" aria-hidden="false"></a>
        </td>
      </tr>`;
      i++;
    });      

    $(function () {
      $("#example1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
      })
    });
  });
}


function getAllAppointments(table, url, action) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById(table);
      tableBody.innerHTML = ""; 
      let i = 1;

      if (!data || data.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No appointments found!',
        });
        return;
      }

      const fragment = document.createDocumentFragment();
      data.forEach(element => {
        const dateFormatted = new Date(element.date).toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${i}</td>
          <td>${element.name}</td>
          <td>${element.pet}</td>
          <td>${element.veterinarian}</td>
          <td>${dateFormatted}</td>
          <td>
            <a class="${action === 'edit' ? 'fas fa-edit' : 'fas fa-trash'}"
               data-toggle="modal" data-target="#modal-default" 
               data-id="${element._id}" title="${action === 'edit' ? 'Edit' : 'Delete'}"></a>
          </td>`;
        fragment.appendChild(row);
        i++;
      });
      tableBody.appendChild(fragment);

      $("#example1").DataTable({
        responsive: true,
        lengthChange: false,
        autoWidth: false,
      });
    })
    .catch(error => {
      console.error("Error fetching appointments:", error);
      Swal.fire({
        icon: 'error',
        title: 'Fetch Error',
        text: 'Failed to fetch appointments. Please try again later.',
      });
    });
}


function getAllMedicines(table, url){

  fetch(url).then(response => response.json()).then(data => {
    let i = 1;
      data.forEach(element => {

        
        const expirationDate = new Date(element.expiration_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const formattedDate = expirationDate.toISOString().split('T')[0];
        const isExpiredOrToday = expirationDate <= today;
        const isOutOfStock = element.stock === 0;

        document.getElementById(table).innerHTML += `
          <tr>
            <td>${i}</td>
            <td>${element.medId}</td>
            <td>${element.commercial_name}</td>
            <td>${element.generic_name}</td>
            <td>${element.description}</td>
            <td class="${isExpiredOrToday ? 'expired' : ''}">
              ${formattedDate} ${isExpiredOrToday ? '(EXPIRED)' : ''}
            </td>
            <td>${element.category}</td>
            <td>${element.stock} ${isOutOfStock ? '(Pending stock)' : ''}</td>
            <td>$${element.price}</td>
            <td>
              <a class="fas fa-edit" href="/home/admin/modifyMedicine?medId=${element.medId}"></a>
              <a class="fas fa-trash deleteButton" style="color: red;" data-id="${element.medId}" href="#"></a>
            </td>
          </tr>`
        i++;
      });

    $(function () {
      $("#example1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
      });
    });
  });
}
      
