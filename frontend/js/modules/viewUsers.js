
function changes(metodo, table, url) {
    const tableFilter = document.getElementById("tableFilter");
    const tables = {
        doctor: document.getElementById("doctor"),
        owner: document.getElementById("owner"),
        getAllPets: document.getElementById("getAllPets")
    };



    // Ocultar todas las tablas
    Object.values(tables).forEach(table => table.style.display = "none");

    // Mostrar la tabla seleccionada
    const selectedTable = tables[tableFilter.value];
    if (selectedTable) {
        selectedTable.style.display = "block";
        let table =selectedTable.getElementsByTagName("table")
        table[0].setAttribute("id", "example1");
    }

    dataTable(metodo, table, url,'admin');
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

  function getAllUsers(table,url){
    fetch(url).then(response => response.json()).then(data => {
        let i = 1;
          data.forEach(element => {
            document.getElementById(table).innerHTML += `
            <tr>
              <td>${i}</td>
              <td>${element.name}</td>
              <td>${element.lastName}</td>
              <td>${element.address}</td>
              <td>${element.phone}</td>
              <td>${element.email}</td>
              <td>${element.role}</td>
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


