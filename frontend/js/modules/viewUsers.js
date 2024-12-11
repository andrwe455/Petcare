// JavaScript actualizado
function dataTable(metodo, tableId, url, role) {
  if (metodo === 'getAllPets') {
    getAllPets(tableId, url, role);
  } else if (metodo === 'getAllUsers') {
    getAllUsers(tableId, url, role);
  }
}

function changes(metodo, tableId, url) {
  const tables = {
    veterinarian: document.getElementById("veterinarian"),
    owner: document.getElementById("owner"),
    getAllPets: document.getElementById("getAllPets")
  };

  // Ocultar todas las tablas
  Object.values(tables).forEach(table => table.style.display = "none");

  // Mostrar la tabla seleccionada
  const selectedTable = tables[metodo];
  if (selectedTable) {
    selectedTable.style.display = "block";
    const tableElement = selectedTable.querySelector("table");
    tableElement.setAttribute("id", "example1");

    // Llamar a la función de datos
    const role = metodo === 'veterinarian' || metodo === 'owner' ? metodo : 'admin';
    dataTable(metodo, tableId, url, role);
  }
}

function getAllPets(tableId, url, role) {
  fetch(url).then(response => response.json()).then(data => {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = '';
    data.forEach((element, index) => {
      tableBody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
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
            data-age="${element.age}" data-weight="${element.weight}" data-breed="${element.breed}"
            data-id="${element._id}" data-type="${element.type}"></a>
            <a class="fas fa-trash deleteButton" style="color: red;" onclick="deletePet('${element._id}', '${element.name}')" aria-hidden="false"></a>
          </td>
        </tr>`;
    });

    // Inicializar DataTable
    $("#example1").DataTable({
      responsive: true, lengthChange: false, autoWidth: false,
    });
  });
}

function getAllUsers(tableId, url, role) {
  fetch(url).then(response => response.json()).then(data => {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = '';
    data.filter(user => user.role === role).forEach((element, index) => {
      tableBody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${element.name}</td>
          <td>${element.lastName}</td>
          <td>${element.address}</td>
          <td>${element.phone}</td>
          <td>${element.email}</td>
          <td>${element.role}</td>
          <td>
            <a class="fas fa-eye"></a>
            <a class="fas fa-edit"></a>
          </td>
        </tr>`;
    });

    // Inicializar DataTable
    $("#example1").DataTable({
      responsive: true, lengthChange: false, autoWidth: false,
    });
  });
}