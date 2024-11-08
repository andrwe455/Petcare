function dataTable(metodo,table,url){
  if(metodo == 'getAllPets'){
    getAllPets(table,url);
  }else if (metodo == 'getVaccineRecord'){

    const geturl = window.location.href;
    const urlSplit = geturl.split('/');

    url = url +'/'+ urlSplit[urlSplit.length - 1];

    getVaccineRecord(table,url);
  } else if(metodo == 'getAllAppointments'){
    getAllAppointments(table,url);
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
      if(window.location.href.includes('veterinary')){
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
      document.getElementById('id').value = data._id;
        petsName('pet-name',data.name); 
        if ($.fn.DataTable.isDataTable('#example1')) {
          $('#example1').DataTable().clear().destroy(); // Limpiar y destruir la instancia existente
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

          if(role == 'veterinary'){

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

function getAllPets(table,url){
  fetch(url).then(response => response.json()).then(data => {
    let i = 1;
      data.forEach(element => {
        document.getElementById(table).innerHTML += `
        <tr>
          <td>${i}</td>
          <td>${element.name}</td>
          <td>${element.age} years</td>
          <td>${element.weight} Kg</td>
          <td>${element.breed}</td>
          <td>${element.type}</td>
          <td>
            <a class="fas fa-eye" href="/home/owner/vaccineRecords/${element._id}"></a>
            <a class="fas fa-edit" data-toggle="modal" data-target="#modal-default" data-name="${element.name}" 
            data-age="${element.age}" data-weigth="${element.weight}" data-breed="${element.breed}" 
            data-id="${element._id}" data-type="${element.type}"></a>
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
      let i = 1;

      if (!data || data.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No appointments found!',
        });
      } else {
        data.forEach(element => {
          let iconClass = action === 'edit' ? 'fas fa-edit' : 'fas fa-trash';
          let actionTitle = action === 'edit' ? 'Edit' : 'Delete';

          document.getElementById(table).innerHTML += `
          <tr>
            <td>${i}</td>
            <td>${element.name}</td>
            <td>${element.pet}</td>
            <td>${element.veterinarian}</td>
            <td>${element.date}</td>
            <td>
              <a class="${iconClass}" data-toggle="modal" data-target="#modal-default" 
                 data-id="${element._id}" title="${actionTitle}"></a>
            </td>
          </tr>`;
          i++;
        });
      }

      $(function () {
        $("#example1").DataTable({
          responsive: true,
          lengthChange: false,
          autoWidth: false,
        });
      });
    });
}
