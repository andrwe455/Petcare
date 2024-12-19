function changes(value) {
  const usersTable = document.getElementById('usersTableBody');
  let url = '/getAllUsers';
  if(value == 'usersTable'){
    usersTable.innerHTML = '';
    getAllUsers(usersTable, url);
    document.getElementById('petContainer').style.display = 'none';
    document.getElementById('userContainer').style.display = 'block';
  }else
  {
    url = '/getAllPets';
    const petsTable = document.getElementById('petsTableBody');
    petsTable.innerHTML = '';
    getAllPet(petsTable, url);
    document.getElementById('userContainer').style.display = 'none';
    document.getElementById('petContainer').style.display = 'block';
  }
}

function getAllPet(table, url){
  fetch(url).then(response => response.json()).then(data => {

    data.forEach(pet => {
      const row = document.createElement('tr');
      const id = document.createElement('td');
      const name = document.createElement('td');
      const type = document.createElement('td');
      const breed = document.createElement('td');
      const age = document.createElement('td');
      const weight = document.createElement('td');

      id.textContent = pet._id;
      name.textContent = pet.name;
      type.textContent = pet.type;
      breed.textContent = pet.breed;
      age.textContent = pet.age;
      weight.textContent = pet.weight;

      row.appendChild(name);
      row.appendChild(type);
      row.appendChild(breed);
      row.appendChild(weight);
      row.appendChild(age);

      table.appendChild(row);
    });
    $(function () {
      if ($.fn.DataTable.isDataTable('#getAllPets')) {
        $('#getAllPets').DataTable().destroy();
      }

      $(`#getAllPets`).DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
      })
    });
  });

}

function getAllUsers(table, url){
  fetch(url).then(response => response.json()).then(data => {

    data.forEach(user => {
      const row = document.createElement('tr');
      const id = document.createElement('td');
      const name = document.createElement('td');
      const lastName = document.createElement('td');
      const address = document.createElement('td');
      const phone = document.createElement('td');
      const email = document.createElement('td');
      const role = document.createElement('td');
      const actions = document.createElement('td');

      id.textContent = user._id;
      name.textContent = user.name;
      lastName.textContent = user.lastName;
      address.textContent = user.address
      phone.textContent = user.phone;
      email.textContent = user.email;
      role.textContent = user.role;
      actions.innerHTML = `<button class="btn btn-danger" onclick="deleteUser('${user._id}')"><i class="fas fa-trash"></i></button>`;


      row.appendChild(name);
      row.appendChild(lastName);
      row.appendChild(address);
      row.appendChild(phone);
      row.appendChild(email);
      row.appendChild(role);
      row.appendChild(actions);

      table.appendChild(row);
    });
    $(function () {
      if ($.fn.DataTable.isDataTable('#usersTable')) {
        $('#usersTable').DataTable().destroy();
      }
    
      $('#usersTable').DataTable({
        "responsive": true, 
        "lengthChange": false, 
        "autoWidth": false,
      });
    });
    
  });
}

function deleteUser(userId) {
  // Mostrar el cuadro de confirmación con SweetAlert2
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action will permanently delete the user.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6', // Color del botón "Confirmar"
    cancelButtonColor: '#d33', // Color del botón "Cancelar"
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // Realizar la solicitud DELETE
      fetch(`/deleteUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        return response.json();
      })
      .then(data => {
        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire(
          'Deleted!',
          data.message,
          'success'
        ).then(() => {
          // Recargar la página después de confirmar la alerta de éxito
          window.location.reload();
        });
      })
      .catch(error => {
        // Mostrar mensaje de error con SweetAlert2
        Swal.fire(
          'Error',
          error.message,
          'error'
        );
      });
    }
  });
}
