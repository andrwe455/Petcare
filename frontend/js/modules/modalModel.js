function createPetModal(){

  let openModalCreate = document.createElement('button');
  openModalCreate.setAttribute('type','button');
  openModalCreate.setAttribute('class','btn btn-primary');
  openModalCreate.setAttribute('data-toggle','modal');
  openModalCreate.setAttribute('data-target','#modal-create');
  openModalCreate.innerText = 'Create Pet';
  document.getElementById('buttonCreate').appendChild(openModalCreate);

  let modalCreate = document.createElement('div');
  modalCreate.setAttribute('class','modal fade');
  modalCreate.setAttribute('id','modal-create');
  document.body.appendChild(modalCreate);

  let modalDialog = document.createElement('div');
  modalDialog.setAttribute('class','modal-dialog');

  let modalContent = document.createElement('div');
  modalContent.setAttribute('class','modal-content');

  let modalHeader = document.createElement('div');
  modalHeader.setAttribute('class','modal-header modal-primary');

  let modalTitle = document.createElement('h2');
  modalTitle.setAttribute('class','modal-title');
  modalTitle.innerText = 'Register a new Pet';

  let closeButton = document.createElement('button');
  closeButton.setAttribute('type','button');
  closeButton.setAttribute('class','close');
  closeButton.setAttribute('data-dismiss','modal');
  closeButton.setAttribute('aria-label','Close');

  let span = document.createElement('span');
  span.setAttribute('aria-hidden','true');
  span.innerHTML = '&times;';
  closeButton.appendChild(span);

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  let modalBody = document.createElement('div');
  modalBody.setAttribute('class','modal-body');
  
  let form = document.createElement('form');
  form.setAttribute('action','/createPet');
  form.setAttribute('method','post');
  form.setAttribute('enctype','multipart/form-data');

  let formGroup1 = document.createElement('div');
  formGroup1.setAttribute('class','form-group');
  
  let label1 = document.createElement('label');
  label1.setAttribute('for','name');
  label1.innerHTML = 'Name <span style="color:red">*</span>';

  let input1 = document.createElement('input');
  input1.setAttribute('type','text');
  input1.setAttribute('id','name');
  input1.setAttribute('class','form-control');
  input1.setAttribute('name','name');

  formGroup1.appendChild(label1);
  formGroup1.appendChild(input1);

  let formGroup2 = document.createElement('div');
  formGroup2.setAttribute('class','form-group');

  let label2 = document.createElement('label');
  label2.setAttribute('for','age');
  label2.innerHTML = 'Age <span style="color:red">*</span>';

  let input2 = document.createElement('input');
  input2.setAttribute('type','number');
  input2.setAttribute('id','age');
  input2.setAttribute('class','form-control');
  input2.setAttribute('name','age');

  formGroup2.appendChild(label2);
  formGroup2.appendChild(input2);

  let formGroup3 = document.createElement('div');
  formGroup3.setAttribute('class','form-group');

  let label3 = document.createElement('label');
  label3.setAttribute('for','weight');
  label3.innerHTML = 'Weight <span style="color:red">*</span>';

  let input3 = document.createElement('input');
  input3.setAttribute('type','number');
  input3.setAttribute('id','weight');
  input3.setAttribute('class','form-control');
  input3.setAttribute('name','weight');

  formGroup3.appendChild(label3);
  formGroup3.appendChild(input3);

  let formGroup4 = document.createElement('div');
  formGroup4.setAttribute('class','form-group');

  let label4 = document.createElement('label');
  label4.setAttribute('for','breed');
  label4.innerHTML = 'Breed <span style="color:red">*</span>';

  let input4 = document.createElement('input');
  input4.setAttribute('type','text');
  input4.setAttribute('id','breed');
  input4.setAttribute('class','form-control');
  input4.setAttribute('name','breed');

  formGroup4.appendChild(label4);
  formGroup4.appendChild(input4);

  let formGroup5 = document.createElement('div');
  formGroup5.setAttribute('class','form-group');

  let label5 = document.createElement('label');
  label5.setAttribute('for','type');
  label5.innerHTML = 'Type <span style="color:red">*</span>';

  let input5 = document.createElement('input');
  input5.setAttribute('type','text');
  input5.setAttribute('id','type');
  input5.setAttribute('class','form-control');
  input5.setAttribute('name','type');

  formGroup5.appendChild(label5);
  formGroup5.appendChild(input5);

  let formGroup6 = document.createElement('div');
  formGroup6.setAttribute('class','form-group');

  let label6 = document.createElement('label');
  label6.setAttribute('for','image');
  label6.innerHTML = 'Pet Image <span style="color:red">*</span>';

  let inputGroup = document.createElement('div');
  inputGroup.setAttribute('class','input-group');

  let customFile = document.createElement('div');
  customFile.setAttribute('class','custom-file');

  let input6 = document.createElement('input');
  input6.setAttribute('type','file');
  input6.setAttribute('id','image');
  input6.setAttribute('class','custom-file-input');
  input6.setAttribute('name','image');

  let label7 = document.createElement('label');
  label7.setAttribute('class','custom-file-label');
  label7.setAttribute('for','image');
  label7.innerHTML = 'Choose file <span style="color:red">*</span>';

  customFile.appendChild(input6);
  customFile.appendChild(label7);

  inputGroup.appendChild(customFile);
  formGroup6.appendChild(label6);
  formGroup6.appendChild(inputGroup);

  let modalFooter = document.createElement('div');
  modalFooter.setAttribute('class','modal-footer');

  let buttonCreate = document.createElement('button');
  buttonCreate.setAttribute('type','submit');
  buttonCreate.setAttribute('class','btn btn-primary');
  buttonCreate.innerText = 'Create';

  let buttonClose = document.createElement('button');
  buttonClose.setAttribute('type','button');
  buttonClose.setAttribute('class','btn btn-danger');
  buttonClose.classList.add('ml-auto');
  buttonClose.setAttribute('data-dismiss','modal');
  buttonClose.innerText = 'Close';


  let required = document.createElement('span');
  required.setAttribute('style','color:red');
  required.innerText = '* Required';

  modalFooter.appendChild(buttonCreate);
  modalFooter.appendChild(buttonClose);

  modalBody.appendChild(formGroup1);
  modalBody.appendChild(formGroup2);
  modalBody.appendChild(formGroup3);
  modalBody.appendChild(formGroup4);
  modalBody.appendChild(formGroup5);
  modalBody.appendChild(formGroup6);
  modalBody.appendChild(required);
  
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  form.appendChild(modalContent);

  modalDialog.appendChild(form);
  modalCreate.appendChild(modalDialog);
}

function deletePet(id,name){
  
  fetch(`/deletePet/${id}/${name}`,{
    method: 'DELETE'
  }).then(response => response.json()).then(data => {
      Swal.fire({
        title: 'Pet deleted',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        location.reload();
      });
  });
}