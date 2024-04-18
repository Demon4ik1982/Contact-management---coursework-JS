document.addEventListener("DOMContentLoaded", async function(){
  const scrollbar = document.body.clientWidth - window.innerWidth + 'px';
  const modalWindow = document.getElementById('openModal');
  const openModalAlert = document.getElementById('openModalAlert');
  const clientsId = document.getElementById('clients__id');
  const clientsName = document.getElementById('clients__name');
  const clientsData = document.getElementById('clients__data');
  const clientsDataEdit = document.getElementById('clients__data-edit');
  const formInputFilter = document.getElementById('form-input');


  // Фильтрация
  let delayTimer = null;
  formInputFilter.addEventListener('input', function(e){

    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      filterContactInput(e.target.value);
    }, 300);
  });

  let buttonStateId = 0;
  clientsId.addEventListener('click', () =>{
    if (buttonStateId === 0) {
      filterContact(buttonStateId, 'id');
      buttonStateId = 1;
    } else {
      filterContact(buttonStateId, 'id');
      buttonStateId = 0;
    }
  });

  let buttonStateName = 0;
  clientsName.addEventListener('click', () =>{
    if (buttonStateName === 0) {
      filterContact(buttonStateName, 'name');
      buttonStateName = 1;
    } else {
      filterContact(buttonStateName, 'name');
      buttonStateName = 0;
    }
  });

  let buttonStateDate = 0;
  clientsData.addEventListener('click', () =>{
    if (buttonStateDate === 0) {
      filterContact(buttonStateDate, 'createdAt');
      buttonStateDate = 1;
    } else {
      filterContact(buttonStateDate, 'createdAt');
      buttonStateDate = 0;
    }
  });

  let buttonStateDateEdit = 0;
  clientsDataEdit.addEventListener('click', () =>{
    if (buttonStateDateEdit === 0) {
      filterContact(buttonStateDateEdit, 'updatedAt');
      buttonStateDateEdit = 1;
    } else {
      filterContact(buttonStateDateEdit, 'updatedAt');
      buttonStateDateEdit = 0;
    }
  });

  // Открыть модальное окно
  document.querySelector('[href="#openModal"]').addEventListener('click',function(){
    document.body.style.overflow = 'hidden';
    document.querySelector('#openModal').style.marginLeft = scrollbar;
    modalWindow.style.opacity = '1';
    modalWindow.style.pointerEvents = 'auto';
    modalWindow.style.overflowY = 'auto';
    newModalWindow()
  });

  const responce = await fetch('http://localhost:3000/api/clients');
  const newPersonList = await responce.json();
  newPersonList.forEach(person => {
    renderClient(person)

  });

  let idContact = 0;

  //Добавление контактов в форму модального окна
  function newContact(contact) {

    const newContactForm = document.getElementById('new-contact');

    const newContactDiv = document.createElement('div');
    const newContactSelect = document.createElement('select');
    const newContactSelectOptionTel = document.createElement('option');
    const newContactSelectOptionDopTel = document.createElement('option');
    const newContactSelectOptionEmail = document.createElement('option');
    const newContactSelectOptionVK = document.createElement('option');
    const newContactSelectOptionFacebook = document.createElement('option');
    const newContactInput = document.createElement('input');
    const newContactInputDelete = document.createElement('label');

    newContactDiv.setAttribute('class', 'modal__new-contact');
    newContactDiv.setAttribute('id', `modal__new-contact-${idContact}`);
    newContactSelect.setAttribute('class', 'modal__select');
    newContactSelect.setAttribute('name', 'contact-type');

    newContactSelectOptionTel.setAttribute('id', 'tel');
    newContactSelectOptionDopTel.setAttribute('id', 'dop-tel');
    newContactSelectOptionEmail.setAttribute('id', 'email');
    newContactSelectOptionVK.setAttribute('id', 'vk');
    newContactSelectOptionFacebook.setAttribute('id', 'facebook');

    newContactSelectOptionTel.setAttribute('class', 'modal__select-item');
    newContactSelectOptionDopTel.setAttribute('class', 'modal__select-item');
    newContactSelectOptionEmail.setAttribute('class', 'modal__select-item');
    newContactSelectOptionVK.setAttribute('class', 'modal__select-item');
    newContactSelectOptionFacebook.setAttribute('class', 'modal__select-item');

    newContactSelectOptionTel.setAttribute('value', 'tel');
    newContactSelectOptionDopTel.setAttribute('value', 'dop-tel');
    newContactSelectOptionEmail.setAttribute('value', 'email');
    newContactSelectOptionVK.setAttribute('value', 'vk');
    newContactSelectOptionFacebook.setAttribute('value', 'facebook');

    newContactSelectOptionTel.textContent = "Телефон";
    newContactSelectOptionDopTel.textContent = "Доп. телефон";
    newContactSelectOptionEmail.textContent = "Email";
    newContactSelectOptionVK.textContent = "VK";
    newContactSelectOptionFacebook.textContent = "Facebook";

    newContactInput.setAttribute('class', 'modal__select-input');
    newContactInput.setAttribute('id', `select-input-${idContact}`);
    newContactInput.setAttribute('type', 'tel');
    newContactInput.setAttribute('name', 'tel');
    newContactInput.setAttribute('placeholder', 'Введите данные контакта');

    newContactInputDelete.setAttribute('class', 'modal__select-input-label');
    newContactInputDelete.setAttribute('for', `select-input-${idContact}`);

    if (contact !== null) {
      newContactInput.setAttribute('value', `${contact.value}`);
      newContactInput.setAttribute('type', `${contact.type}`);
      newContactInputDelete.style.setProperty("visibility", "visible");
      if (contact.type === 'tel') {
        newContactSelectOptionTel.setAttribute('selected', 'selected');
        newContactInput.setAttribute('type', `${contact.type}`);
        newContactInput.setAttribute('name', `${contact.type}`);
      };
      if (contact.type === 'dop-tel') {
        newContactSelectOptionDopTel.setAttribute('selected', 'selected');
        newContactInput.setAttribute('type', `tel`);
        newContactInput.setAttribute('name', `${contact.type}`);
      };
      if (contact.type === 'email') {
        newContactSelectOptionEmail.setAttribute('selected', 'selected');
        newContactInput.setAttribute('type', `${contact.type}`);
        newContactInput.setAttribute('name', `${contact.type}`);
      };
      if (contact.type === 'vk') {
        newContactSelectOptionVK.setAttribute('selected', 'selected');
        newContactInput.setAttribute('type', `url`);
        newContactInput.setAttribute('name', `${contact.type}`);
    };
      if (contact.type === 'facebook') {
        newContactSelectOptionFacebook.setAttribute('selected', 'selected');
        newContactInput.setAttribute('type', `url`);
        newContactInput.setAttribute('name', `${contact.type}`);
      };
    }

    newContactForm.addEventListener('input', function(e) {
      e.preventDefault();
        if (newContactInput.value) {
          newContactInputDelete.style.setProperty("visibility", "visible");
        } else {
          newContactInputDelete.style.setProperty("visibility", "hidden");
        }
    });

    newContactInputDelete.addEventListener('click', () =>{
      if (!confirm('Вы уверены?')) {
        return;
      }
      newContactDiv.remove();
      removeButtonNewContact()
    });

    newContactSelect.addEventListener('change', function() {
      let type = 'tel'
      const option = newContactSelect.value;
      if (option === 'email') {
        type = 'email'
      } if (option === 'vk' || option === 'facebook') {
        type = 'url'
      }
      newContactInput.setAttribute('type', `${type}`);
      newContactInput.setAttribute('name', `${option}`);
    });



    idContact = idContact + 1;


    newContactSelect.append(newContactSelectOptionTel, newContactSelectOptionDopTel, newContactSelectOptionEmail, newContactSelectOptionVK, newContactSelectOptionFacebook);
    newContactDiv.append(newContactSelect, newContactInput, newContactInputDelete);
    newContactForm.prepend(newContactDiv);
  }

  // Создание модального окна
  async function newModalWindow() {
    const sectionModal = document.getElementById('openModal')

    const modalDialog = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalHeader = document.createElement('div');
    const modalTitle = document.createElement('h2');
    const modalClose = document.createElement('a');
    const modalCloseImg = document.createElement('img');

    const modalForm = document.createElement('form');
    const modalBody = document.createElement('div');
    const modalSurname = document.createElement('input');
    const modalName = document.createElement('input');
    const modalLastname = document.createElement('input');

    const modalNewContact = document.createElement('div');
    const modalNewContactButton = document.createElement('span');

    const modalBtnWrapper = document.createElement('div');
    const modalBtn = document.createElement('button');
    const modalBtnCancel = document.createElement('a');

    modalDialog.setAttribute('class', 'modal__dialog');
    modalDialog.setAttribute('id', 'modal__dialog');
    modalContent.setAttribute('class', 'modal__content');
    modalContent.setAttribute('id', 'modal__content')
    modalHeader.setAttribute('class', 'modal__header');
    modalTitle.setAttribute('class', 'modal__title title-h2');
    modalTitle.textContent = "Новый клиент";
    modalClose.setAttribute('href', '#close');
    modalClose.setAttribute('title', 'Close');
    modalClose.setAttribute('class', 'modal__close');
    modalCloseImg.setAttribute('class', 'modal__close-img');
    modalCloseImg.setAttribute('src', '/img/cros.svg');

    modalForm.setAttribute('class', 'modal__form');
    modalForm.setAttribute('id', 'new-client');
    modalBody.setAttribute('class', 'modal__body');
    modalBody.setAttribute('id', 'fio');
    modalSurname.setAttribute('class', 'modal__form-input');
    modalName.setAttribute('class', 'modal__form-input');
    modalLastname.setAttribute('class', 'modal__form-input');
    modalSurname.setAttribute('id', 'surname');
    modalName.setAttribute('id', 'name');
    modalLastname.setAttribute('id', 'lastname');
    modalSurname.setAttribute('type', 'text');
    modalName.setAttribute('type', 'text');
    modalLastname.setAttribute('type', 'text');
    modalSurname.setAttribute('name', 'surname');
    modalName.setAttribute('name', 'name');
    modalLastname.setAttribute('name', 'lastname');
    modalSurname.setAttribute('placeholder', 'Фамилия*');
    modalName.setAttribute('placeholder', 'Имя*');
    modalLastname.setAttribute('placeholder', 'Отчество');
    // modalSurname.setAttribute('required', '');
    // modalName.setAttribute('required', '');

    modalNewContact.setAttribute('class', 'modal__new-client');
    modalNewContact.setAttribute('id', 'new-contact');
    modalNewContactButton.setAttribute('class', 'modal__new-client-span');
    modalNewContactButton.setAttribute('id', 'new-contact-button');
    modalNewContactButton.textContent = "Добавить контакт"

    modalBtnWrapper.setAttribute('class', 'modal__btn-wrapper');
    modalBtn.setAttribute('class', 'modal__btn btn btn-reset');
    modalBtn.setAttribute('id', 'new-contact-add');
    modalBtn.textContent = "Сохранить";
    modalBtnCancel.setAttribute('class', 'modal__cancel');
    modalBtnCancel.setAttribute('href', '#cancel');
    modalBtnCancel.textContent = "Отмена";

    modalClose.append(modalCloseImg);
    modalHeader.append(modalTitle, modalClose);
    modalBody.append(modalSurname, modalName, modalLastname);
    modalNewContact.append(modalNewContactButton);
    modalBtnWrapper.append(modalBtn, modalBtnCancel);
    modalForm.append(modalBody, modalNewContact, modalBtnWrapper);
    modalContent.append(modalHeader, modalForm);
    modalDialog.append(modalContent);
    sectionModal.append(modalDialog);

    let delayIntervalRed = null;
    let delayIntervalGreen = null;
    let delayIntervalRedName = null;
    let delayIntervalGreenName = null;
    let delayIntervalRedSurname = null;
    let delayIntervalGreenSurname = null;


    modalForm.addEventListener('submit', async function(e) {
      e.preventDefault();


      clearInterval(delayIntervalRed);
      clearInterval(delayIntervalGreen);

      if (checkForNumber(modalSurname.value)) {
        delayIntervalRed = setInterval(() => {
          modalSurname.style.backgroundColor = "rgba(245, 0, 82, 0.3)";
        }, 500);
        delayIntervalGreen = setInterval(() => {
          modalSurname.style.backgroundColor = "transparent";
        }, 1000);
        alert('В фамилии не может содержаться число');
        return;
      }

      clearInterval(delayIntervalRed);
      clearInterval(delayIntervalGreen);

      if (checkForNumber(modalName.value)) {
        delayIntervalRed = setInterval(() => {
          modalName.style.backgroundColor = "rgba(245, 0, 82, 0.3)";
        }, 500);
        delayIntervalGreen = setInterval(() => {
          modalName.style.backgroundColor = "transparent";
        }, 1000);
        alert('В имени не может содержаться число');
        return;
      }


      if (checkForNumber(modalLastname.value)) {
        setInterval(() => {
          modalLastname.style.backgroundColor = "rgba(245, 0, 82, 0.3)";
        }, 500);
        setInterval(() => {
          modalLastname.style.backgroundColor = "transparent";
        }, 1000);
        alert('В отчестве не может содержаться число');
        return;
      }

      const contactsAll = document.querySelectorAll('.modal__select');

      let contactList = [];
      for (i = 0; i < contactsAll.length; i++) {
        let contact = document.getElementById(`select-input-${i}`)

        let typeContact = contact.name;
        let person = {
          type: typeContact,
          value: contact.value,
        }

        contactList.push(person);
      }

      const responce = await fetch('http://localhost:3000/api/clients', {
            method: 'POST',
            body: JSON.stringify({
              name: stringСonversion(modalName.value.trim()),
              surname: stringСonversion(modalSurname.value.trim()),
              lastName: stringСonversion(modalLastname.value.trim()),
              contacts: contactList,
            }),
            headers: {
              'Content-Type': 'application/json',
            },

        });


        const newPerson = await responce.json();
        let keys = Object.keys(newPerson);



        if (keys.includes('errors')) {
          newPerson.errors.forEach(element => {

            if (element.field === 'name') {

              modalName.setAttribute('placeholder', `${element.message}`);
              delayIntervalRedName = setInterval(() => {
                modalName.style.backgroundColor = "rgba(245, 0, 82, 0.3)";
              }, 500);
              delayIntervalGreenName = setInterval(() => {
                modalName.style.backgroundColor = "transparent";
              }, 1000);
              return;
            }


            if (element.field === 'surname') {

              modalSurname.setAttribute('placeholder', `${element.message}`);
              delayIntervalRedSurname = setInterval(() => {
                modalSurname.style.backgroundColor = "rgba(245, 0, 82, 0.3)";
              }, 500);
              delayIntervalGreenSurname = setInterval(() => {
                modalSurname.style.backgroundColor = "transparent";
              }, 1000);
              return;
            }

            const contactListEmpty = document.querySelectorAll('.modal__select-input')
            contactList.forEach(contact => {
              for (const iterator of contactListEmpty) {
                if (contact.value === '' && iterator.value === ''){
                  iterator.style.backgroundColor = "rgba(245, 0, 82, 0.3)";
                  iterator.setAttribute('placeholder', `${element.message}`);
                }
                iterator.addEventListener('input', () => {
                  iterator.style.backgroundColor = 'white';
                  iterator.setAttribute('placeholder', `Введите данные контакта`);
                });
              }
            });

          });

          return
        }


      renderClient(newPerson)

      e.target.reset();
      modalWindow.style.opacity = '0';
      modalWindow.style.pointerEvents = 'none';
      modalWindow.style.overflowY = 'auto';
      modalDialog.remove();
      idContact = 0;
    });

    modalName.addEventListener('input', () => {
      clearInterval(delayIntervalRed);
      clearInterval(delayIntervalGreen);
      clearInterval(delayIntervalRedName);
      clearInterval(delayIntervalGreenName);
      modalName.style.backgroundColor = 'transparent';
      modalName.setAttribute('placeholder', `Имя*`);
    });

    modalSurname.addEventListener('input', () => {
      clearInterval(delayIntervalRed);
      clearInterval(delayIntervalGreen);
      clearInterval(delayIntervalRedSurname);
      clearInterval(delayIntervalGreenSurname);
      modalSurname.style.backgroundColor = 'transparent';
      modalSurname.setAttribute('placeholder', `Фамилия*`);
    });

    document.getElementById('new-contact-button').addEventListener('click',function(){
      newContact(null);
      removeButtonNewContact();
    });

    document.querySelector('[href="#close"]').addEventListener('click',function(){
      document.body.style.overflow = 'visible';
      document.querySelector('#openModal').style.marginLeft = '0px';
      modalWindow.style.opacity = '0';
      modalWindow.style.pointerEvents = 'none';
      modalWindow.style.overflowY = 'auto';
      modalDialog.remove();
      idContact = 0;
    });

    document.querySelector('[href="#cancel"]').addEventListener('click',function(){
      document.body.style.overflow = 'visible';
      document.querySelector('#openModal').style.marginLeft = '0px';
      modalWindow.style.opacity = '0';
      modalWindow.style.pointerEvents = 'none';
      modalWindow.style.overflowY = 'auto';
      modalDialog.remove();
      idContact = 0;
    });

  }

  function removeButtonNewContact() {
    let counterСontact = document.querySelectorAll('.modal__new-contact').length

    if (counterСontact > 9) {
      document.getElementById('new-contact-button').style.opacity = '0';
      document.getElementById('new-contact-button').style.pointerEvents = 'none';
    } else {
      document.getElementById('new-contact-button').style.opacity = '1';
      document.getElementById('new-contact-button').style.pointerEvents = 'auto';
    }
  }

  function renderClient(newPerson) {

    const createTime =  correctTime(newPerson.createdAt)
    const updateTime =  correctTime(newPerson.updatedAt)

    const clientsTable = document.getElementById('clients-table');

    const clientsTableTr = document.createElement('tr');
    const clientsTableTdId = document.createElement('td');
    const clientsTableTdIdSpan = document.createElement('span');
    const clientsTableTdFio = document.createElement('td');

    const clientsTableTdDate = document.createElement('td');
    const clientsTableTdDateWrapper = document.createElement('div')
    const clientsTableTdDateSpan = document.createElement('span')
    const clientsTableTdDateTimeSpan = document.createElement('span')

    const clientsTableTdDateEdit = document.createElement('td');
    const clientsTableTdDateEditWrapper = document.createElement('div');
    const clientsTableTdDateEditSpan = document.createElement('span');
    const clientsTableTdDateEditTimeSpan = document.createElement('span');


    const clientsTableContacts = document.createElement('td');
    const clientsTableAction = document.createElement('td');
    const clientsTableContactsList = document.createElement('ul');

    clientsTableTr.setAttribute('class', 'clients__table-body-tr');
    clientsTableTdId.setAttribute('class', 'clients__table-body-td clients__id');
    clientsTableTdFio.setAttribute('class', 'clients__table-body-td clients__name');
    clientsTableTdDate.setAttribute('class', 'clients__table-body-td');
    clientsTableTdDateWrapper.setAttribute('class', 'clients__data-wrapper');
    clientsTableTdDateSpan.setAttribute('class', 'clients__data');
    clientsTableTdDateEdit.setAttribute('class', 'clients__table-body-td');
    clientsTableTdDateEditWrapper.setAttribute('class', 'clients__data-wrapper');
    clientsTableTdDateEditSpan.setAttribute('class', 'clients__data');
    clientsTableContacts.setAttribute('class', 'clients__table-body-td');
    clientsTableAction.setAttribute('class', 'clients__table-body-td');
    clientsTableTdDateTimeSpan.setAttribute('class', 'clients__data-time');
    clientsTableTdIdSpan.setAttribute('class', 'clients__id-body');
    clientsTableTdDateEditTimeSpan.setAttribute('class', 'clients__data-time');

    clientsTableContactsList.setAttribute('class', 'clients__contact-list');

    clientsTableTdIdSpan.textContent = newPerson.id

    let numCreateTime = Number(createTime.time[0]);
    let moscowTimeCreate = numCreateTime + 3;
    if (moscowTimeCreate < 10) {
      moscowTimeCreate = `0${moscowTimeCreate}`
    } else {
      moscowTimeCreate = `${moscowTimeCreate}`
    }

    let numCreateEdit = Number(updateTime.time[0]);
    let moscowTimeEdit = numCreateEdit + 3;
    if (moscowTimeEdit < 10) {
      moscowTimeEdit = `0${moscowTimeEdit}`
    } else {
      moscowTimeEdit = `${moscowTimeEdit}`
    }

    clientsTableTdFio.textContent = `${newPerson.surname} ${newPerson.name} ${newPerson.lastName}`
    clientsTableTdDateSpan.textContent = `${createTime.year[2]}.${createTime.year[1]}.${createTime.year[0]}  `;
    clientsTableTdDateTimeSpan.textContent = `${moscowTimeCreate}:${createTime.time[1]}`
    clientsTableTdDateWrapper.append(clientsTableTdDateSpan, clientsTableTdDateTimeSpan)
    clientsTableTdDate.append(clientsTableTdDateWrapper)

    clientsTableTdDateEditSpan.textContent = `${updateTime.year[2]}.${updateTime.year[1]}.${updateTime.year[0]}  `
    clientsTableTdDateEditTimeSpan.textContent = `${moscowTimeEdit}:${updateTime.time[1]}`;
    clientsTableTdDateEditWrapper.append(clientsTableTdDateEditSpan, clientsTableTdDateEditTimeSpan)
    clientsTableTdDateEdit.append(clientsTableTdDateEditWrapper);


    clientsTableTdId.append(clientsTableTdIdSpan);
    clientsTableContacts.append(clientsTableContactsList);

    newPerson.contacts.forEach(contact => {

      const clientsTableContactsListItem = document.createElement('li');
      const clientsTableContactsLink = document.createElement('a');
      const clientsTableContactsListItemImg = document.createElement('img');
      const clientsTableContactsListItemSpan = document.createElement('span');
      clientsTableContactsListItem.setAttribute('class', 'clients__contact-item');
      clientsTableContactsListItemSpan.setAttribute('class', 'clients__contact-item-span');
      clientsTableContactsLink.setAttribute('class', 'clients__tooltip navy-tooltip');

      if (contact.type === 'tel') clientsTableContactsListItemImg.setAttribute('src', '/img/phone.svg');
      if (contact.type === 'dop-tel') clientsTableContactsListItemImg.setAttribute('src', '/img/client.svg');
      if (contact.type === 'email') clientsTableContactsListItemImg.setAttribute('src', '/img/mail.svg');
      if (contact.type === 'vk') clientsTableContactsListItemImg.setAttribute('src', '/img/vk.svg');
      if (contact.type === 'facebook') clientsTableContactsListItemImg.setAttribute('src', '/img/fb.svg');

      clientsTableContactsListItemSpan.textContent = contact.value;

      clientsTableContactsLink.append(clientsTableContactsListItemImg, clientsTableContactsListItemSpan)
      clientsTableContactsListItem.append(clientsTableContactsLink)
      clientsTableContactsList.append(clientsTableContactsListItem)
    });

    const clientsTableActionBtnWrapper = document.createElement('div');
    const clientsTableActionBtnEdit = document.createElement('button');
    const clientsTableActionBtnDelete = document.createElement('button');

    clientsTableActionBtnWrapper.setAttribute('class', 'clients__btn-wrapper');
    clientsTableActionBtnEdit.setAttribute('class', 'clients__btn-edit brn btn-reset');
    clientsTableActionBtnDelete.setAttribute('class', 'clients__btn-delete brn btn-reset');

    clientsTableActionBtnEdit.textContent = 'Изменить';
    clientsTableActionBtnDelete.textContent = 'Удалить';

    clientsTableActionBtnWrapper.append(clientsTableActionBtnEdit, clientsTableActionBtnDelete)
    clientsTableAction.append(clientsTableActionBtnWrapper)

    clientsTableTr.append(clientsTableTdId, clientsTableTdFio, clientsTableTdDate, clientsTableTdDateEdit, clientsTableContacts, clientsTableAction);
    clientsTable.append(clientsTableTr);

    clientsTableActionBtnEdit.addEventListener('click', function(){
      document.body.style.overflow = 'hidden';
      document.querySelector('#openModal').style.marginLeft = scrollbar;
      modalWindow.style.opacity = '1';
      modalWindow.style.pointerEvents = 'auto';
      modalWindow.style.overflowY = 'auto';
      editModalWindow(newPerson, clientsTableTr);
    });

    clientsTableActionBtnDelete.addEventListener('click', async () => {

      const prob = true
      document.body.style.overflow = 'hidden';
      document.querySelector('#openModalAlert').style.marginLeft = scrollbar;
      openModalAlert.style.opacity = '1';
      openModalAlert.style.pointerEvents = 'auto';
      openModalAlert.style.overflowY = 'auto';

      modalDeleteClient(newPerson, clientsTableTr, prob)

    });
  }

function correctTime(dataTime) {
  let data = dataTime.split('T');
  let year = data[0].split('-');
  let time = data[1].split(':');
  return {
    year,
    time,
  }
  }

// Модальное окно редактирование карточки
async function editModalWindow(person, tr) {
  const sectionModal = document.getElementById('openModal')

  const modalDialog = document.createElement('div');
  const modalContent = document.createElement('div');
  const modalHeader = document.createElement('div');
  const modalTitleWrapper = document.createElement('div');
  const modalTitle = document.createElement('h2');
  const modalIdClient = document.createElement('span');
  const modalClose = document.createElement('a');
  const modalCloseImg = document.createElement('img');

  const modalForm = document.createElement('form');
  const modalBody = document.createElement('div');
  const modalSurname = document.createElement('input');
  const modalName = document.createElement('input');
  const modalLastname = document.createElement('input');

  const modalNewContact = document.createElement('div');
  const modalNewContactButton = document.createElement('span');

  const modalBtnWrapper = document.createElement('div');
  const modalBtn = document.createElement('button');
  const modalBtnCancel = document.createElement('a');

  modalDialog.setAttribute('class', 'modal__dialog');
  modalDialog.setAttribute('id', 'modal__dialog');
  modalContent.setAttribute('class', 'modal__content');
  modalContent.setAttribute('id', 'modal__content')
  modalHeader.setAttribute('class', 'modal__header');
  modalTitleWrapper.setAttribute('class', 'modal__title-wrapper');
  modalTitle.setAttribute('class', 'modal__title title-h2');
  modalTitle.textContent = "Изменить данные";
  modalIdClient.setAttribute('class', 'modal__id');
  modalIdClient.textContent = `ID: ${person.id}`
  modalClose.setAttribute('href', '#close');
  modalClose.setAttribute('title', 'Close');
  modalClose.setAttribute('class', 'modal__close');
  modalCloseImg.setAttribute('class', 'modal__close-img');
  modalCloseImg.setAttribute('src', '/img/cros.svg');

  modalForm.setAttribute('class', 'modal__form');
  modalForm.setAttribute('id', 'new-client');
  modalBody.setAttribute('class', 'modal__body');
  modalBody.setAttribute('id', 'fio');
  modalSurname.setAttribute('class', 'modal__form-input');
  modalName.setAttribute('class', 'modal__form-input');
  modalLastname.setAttribute('class', 'modal__form-input');
  modalSurname.setAttribute('id', 'surname');
  modalName.setAttribute('id', 'name');
  modalLastname.setAttribute('id', 'lastname');
  modalSurname.setAttribute('type', 'text');
  modalName.setAttribute('type', 'text');
  modalLastname.setAttribute('type', 'text');
  modalSurname.setAttribute('name', 'surname');
  modalName.setAttribute('name', 'name');
  modalLastname.setAttribute('name', 'lastname');
  modalSurname.setAttribute('placeholder', 'Фамилия*');
  modalName.setAttribute('placeholder', 'Имя*');
  modalLastname.setAttribute('placeholder', 'Отчество');

  modalNewContact.setAttribute('class', 'modal__new-client');
  modalNewContact.setAttribute('id', 'new-contact');
  modalNewContactButton.setAttribute('class', 'modal__new-client-span');
  modalNewContactButton.setAttribute('id', 'new-contact-button');
  modalNewContactButton.textContent = "Добавить контакт"

  modalBtnWrapper.setAttribute('class', 'modal__btn-wrapper');
  modalBtn.setAttribute('class', 'modal__btn btn btn-reset');
  modalBtn.setAttribute('id', 'new-contact-add');
  modalBtn.textContent = "Сохранить";
  modalBtnCancel.setAttribute('class', 'modal__cancel');
  modalBtnCancel.setAttribute('href', '#cancel');
  modalBtnCancel.textContent = "Удалить контакт";

  modalName.setAttribute('value', `${person.name}`);
  modalLastname.setAttribute('value', `${person.lastName}`);
  modalSurname.setAttribute('value', `${person.surname}`);

  modalClose.append(modalCloseImg);
  modalTitleWrapper.append(modalTitle, modalIdClient)
  modalHeader.append(modalTitleWrapper, modalClose);
  modalBody.append(modalSurname, modalName, modalLastname);
  modalNewContact.append(modalNewContactButton);
  modalBtnWrapper.append(modalBtn, modalBtnCancel);
  modalForm.append(modalBody, modalNewContact, modalBtnWrapper);
  modalContent.append(modalHeader, modalForm);
  modalDialog.append(modalContent);
  sectionModal.append(modalDialog);


  person.contacts.forEach(contact => {
    newContact(contact)
  });

  modalForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const contactsAll = document.querySelectorAll('.modal__select');

    let contactList = [];
    for (i = 0; i < contactsAll.length; i++) {
      let contact = document.getElementById(`select-input-${i}`)

      let typeContact = contact.name;
      let person = {
        type: typeContact,
        value: contact.value,
      }

      contactList.push(person);
    }

    const responce = await fetch(`http://localhost:3000/api/clients/${person.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            name: stringСonversion(modalName.value.trim()),
            surname: stringСonversion(modalSurname.value.trim()),
            lastName: stringСonversion(modalLastname.value.trim()),
            contacts: contactList,
          }),
          headers: {
            'Content-Type': 'application/json',
          },

      });

      const newPerson = await responce.json();
      let keys = Object.keys(newPerson);



        if (keys.includes('errors')) {
          newPerson.errors.forEach(element => {

            if (element.field === 'name') {

              modalName.setAttribute('placeholder', `${element.message}`);
              delayIntervalRedName = setInterval(() => {
                modalName.style.backgroundColor = "rgba(245, 0, 82, 0.3)";

              }, 500);
              delayIntervalGreenName = setInterval(() => {
                modalName.style.backgroundColor = "transparent";
              }, 1000);
              return;
            }


            if (element.field === 'surname') {

              modalSurname.setAttribute('placeholder', `${element.message}`);
              delayIntervalRedSurname = setInterval(() => {
                modalSurname.style.backgroundColor = "rgba(245, 0, 82, 0.3)";

              }, 500);
              delayIntervalGreenSurname = setInterval(() => {
                modalSurname.style.backgroundColor = "transparent";
              }, 1000);
              return;
            }

          });

          return
        }

      tr.remove();

    renderClient(newPerson)


    e.target.reset();
    modalWindow.style.opacity = '0';
    modalWindow.style.pointerEvents = 'none';
    modalWindow.style.overflowY = 'auto';
    modalDialog.remove();
    idContact = 0;
    return newPerson;
  });

  document.getElementById('new-contact-button').addEventListener('click',function(){
    newContact(null);
    removeButtonNewContact();
  });

  document.querySelector('[href="#close"]').addEventListener('click',function(){
    document.body.style.overflow = 'visible';
    document.querySelector('#openModal').style.marginLeft = '0px';
    modalWindow.style.opacity = '0';
    modalWindow.style.pointerEvents = 'none';
    modalWindow.style.overflowY = 'auto';
    modalDialog.remove();
    idContact = 0;
  });

  document.querySelector('[href="#cancel"]').addEventListener('click',async function(){

    const prob = false;
    document.body.style.overflow = 'visible';
    document.querySelector('#openModal').style.marginLeft = '0px';
    modalWindow.style.opacity = '0';
    modalWindow.style.pointerEvents = 'none';
    modalWindow.style.overflowY = 'auto';
    modalDialog.remove();

    document.body.style.overflow = 'hidden';
    document.querySelector('#openModalAlert').style.marginLeft = scrollbar;
    openModalAlert.style.opacity = '1';
    openModalAlert.style.pointerEvents = 'auto';
    openModalAlert.style.overflowY = 'auto';

    modalDeleteClient(person, tr, prob)

    document.body.style.overflow = 'visible';
    document.querySelector('#openModal').style.marginLeft = '0px';
    modalWindow.style.opacity = '0';
    modalWindow.style.pointerEvents = 'none';
    modalWindow.style.overflowY = 'auto';
    modalDialog.remove();
    idContact = 0;
  });

  }

// Модальное окно "Удаление контакта"
function modalDeleteClient(person, tr, prob) {
  const sectionModal = document.getElementById('openModalAlert')

  const modalDialog = document.createElement('div');
  const modalContent = document.createElement('div');
  const modalHeader = document.createElement('div');
  const modalTitle = document.createElement('h2');
  const modalClose = document.createElement('a');
  const modalCloseImg = document.createElement('img');

  const modalBody = document.createElement('div');
  const modalQuestion = document.createElement('p');
  const modalError = document.createElement('span');

  const modalBtnWrapper = document.createElement('div');
  const modalBtn = document.createElement('button');
  const modalBtnCancel = document.createElement('a');

  modalDialog.setAttribute('class', 'modal__dialog');
  modalDialog.setAttribute('id', 'modal__dialog-alert');
  modalContent.setAttribute('class', 'modal__content');
  modalContent.setAttribute('id', 'modal__content')
  modalHeader.setAttribute('class', 'modal__header');
  modalTitle.setAttribute('class', 'modal__title title-h2');
  modalTitle.textContent = "Удалить клиента";
  modalClose.setAttribute('href', '#close');
  modalClose.setAttribute('title', 'Close');
  modalClose.setAttribute('class', 'modal__close');
  modalCloseImg.setAttribute('class', 'modal__close-img');
  modalCloseImg.setAttribute('src', '/img/cros.svg');
  modalError.setAttribute('class', 'modal__error');
  modalError.textContent = 'Произошла ошибка! повторите попытку позже'

  modalBody.setAttribute('class', 'modal__body-alert');

  modalQuestion.setAttribute('class', 'modal__question')
  modalQuestion.textContent = 'Вы действительно хотите удалить данного клиента?';

  modalBtnWrapper.setAttribute('class', 'modal__btn-wrapper');
  modalBtn.setAttribute('class', 'modal__btn btn btn-reset');
  modalBtn.setAttribute('id', 'new-contact-delete');
  modalBtn.textContent = "Удалить";
  modalBtnCancel.setAttribute('class', 'modal__cancel');
  modalBtnCancel.setAttribute('href', '#cancel');
  modalBtnCancel.textContent = "Отмена";

  modalClose.append(modalCloseImg);
  modalHeader.append(modalTitle, modalClose);

  modalBtnWrapper.append(modalBtn, modalBtnCancel);
  modalBody.append(modalQuestion, modalError, modalBtnWrapper);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  sectionModal.append(modalDialog);

  document.getElementById('new-contact-delete').addEventListener('click',function(){


    fetch(`http://localhost:3000/api/clients/${person.id}`, {
      method: 'DELETE',
    }).then(async(response) => {
      if (response.ok) {
        document.body.style.overflow = 'visible';
        document.querySelector('#openModalAlert').style.marginLeft = scrollbar;
        openModalAlert.style.opacity = '0';
        openModalAlert.style.pointerEvents = 'none';
        openModalAlert.style.overflowY = 'auto';
        modalDialog.remove();
        tr.remove();
      }
      else {
        modalError.style.color = 'red'
      }
  })

  });

  document.querySelector('[href="#close"]').addEventListener('click',function(){
    document.body.style.overflow = 'visible';
    document.querySelector('#openModalAlert').style.marginLeft = '0px';
    openModalAlert.style.opacity = '0';
    openModalAlert.style.pointerEvents = 'none';
    openModalAlert.style.overflowY = 'auto';
    modalDialog.remove();
    idContact = 0;
  });

  document.querySelector('[href="#cancel"]').addEventListener('click',function(){
    document.body.style.overflow = 'visible';
    document.querySelector('#openModalAlert').style.marginLeft = '0px';
    openModalAlert.style.opacity = '0';
    openModalAlert.style.pointerEvents = 'none';
    openModalAlert.style.overflowY = 'auto';
    modalDialog.remove();
    idContact = 0;

    if (!prob) {
      document.body.style.overflow = 'hidden';
      document.querySelector('#openModal').style.marginLeft = scrollbar;
      modalWindow.style.opacity = '1';
      modalWindow.style.pointerEvents = 'auto';
      modalWindow.style.overflowY = 'auto';
      editModalWindow(person, tr);
    }
  });
  }

// Преобразование перврй буквы в заглавную
function stringСonversion(str) {
  let lowStr = str.toLowerCase();
  let firstLetter = lowStr.charAt(0).toUpperCase();
  lowStr = lowStr.slice(1);
  newStr = firstLetter + lowStr;
  return newStr;
  }

// Проверка на числа
function checkForNumber(obj) {
  let prov = /\d/.test(obj)
  return prov;
  }

// Фильтры
async function filterContact(state, key) {
  const responce = await fetch('http://localhost:3000/api/clients');
  const newPersonList = await responce.json();
  const personList = document.querySelectorAll('.clients__table-body-tr')


  if (state === 0) newPersonList.sort((a, b) => a[key] > b[key] ? 1 : -1);
  if (state === 1) newPersonList.sort((a, b) => a[key] < b[key] ? 1 : -1);


  personList.forEach(item => {
    item.remove();
  });

  newPersonList.forEach(newPerson => {
    renderClient(newPerson)
  });

  }

  async function filterContactInput(value) {
    const personList = document.querySelectorAll('.clients__table-body-tr')

    const responce = await fetch(`http://localhost:3000/api/clients/?search=${value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },

  });

    const newPersonList = await responce.json();

    personList.forEach(item => {
      item.remove();
    });

    newPersonList.forEach(person => {
      renderClient(person)
    });

  }

});
