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
    if(data.vaccinationRecords.length == 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No vaccination records found!',
      });
    }else{
      data.vaccinationRecords.forEach(element => {
        document.getElementById(table).innerHTML += `
        <tr>
          <td>${i}</td>
          <td>${element.vaccine}</td>
          <td>${element.date}</td>
          <td>${element.nextDate ?? 'Not Apply'}</td>
          <td><a class="fas fa-edit" data-toggle="modal" data-target="#modal-default"></a></td>
        </tr>`;
        i++;
      });
    }
    $(function () {
      $("#example1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
      })
    });
    petsName('pet-name',data.name);    
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

function getAllAppointments(table,url){

  fetch(url).then(response => response.json()).then(data =>{
    let i = 1;
    data.forEach(element => {
      document.getElementById(table).innerHTML += `
      <tr>
      <td>${i}</td>
      <td>${element.name}</td>
      <td>${element.pet}</td>
      <td>${element.veterinarian}</td>
      <td>${element.date}</td>
      <td><a class="fas fa-edit" data-toggle="modal" data-target="#modal-default"></a></td>
      </tr>`
      i++;
      });
  })
}