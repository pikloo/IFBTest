const addForm = {

  initiliazeSubmitForm: function () {
      let formElement = document.querySelector('.task--add form');
      formElement.addEventListener('submit', addForm.handleAddTaskFormSubmit);
  },

  handleAddTaskFormSubmit: function (evt) {
      evt.preventDefault();


      //On récupère ce qui a dans le form
      let taskInputNameElement = evt.currentTarget.querySelector('.input');
      let taskInputNameContent = taskInputNameElement.value;

      let taskInputDescriptionElement = evt.currentTarget.querySelector('textarea');
      let taskInputDescriptionContent = taskInputDescriptionElement.value;

      //Validation du formulaire 
      let isValid = addForm.formValidation(taskInputNameContent, taskInputDescriptionContent);

      if (isValid) {

          //! ENVOI DE DONNEES AU SERVEUR
          const url = apiClient.rootURL + '/tasks/';
          let data = {
              'title': taskInputNameContent,
              'description': taskInputDescriptionContent,
              'status': 1,
          };

          apiClient.sendRequest('POST', url, data).then((function (newTaskData) {

              if (newTaskData.id) {
                  // appel de la méthode permettant de créer le DOM pour une nouvelle tâche
                  let taskElement = task.createDOMElement(taskInputNameContent, taskcategoryData.name);

                  task.setId(taskElement, newTaskData.id)

                  document.querySelector('.task__name-edit').value = "";
                  document.querySelector('.task__name-edit').focus();;


                  tasksList.addTaskInDOM(taskElement);


              } else {
                  alert("Une tâche ayant la même titre existe déja");
                  document.querySelector('.task__name-edit').focus();
              }
              return newTaskData;
          }));

      }

  },

  formValidation: function (taskName, taskDescription) {
      if (taskName === "") {
          alert("Le nom de la tâche doit être renseigné");
          document.querySelector('.task__name-edit').focus();
          return false;
      }
      if (taskDescription === "") {
        alert("La descrtiption de la tâche doit être renseigné");
        document.querySelector('.task__description-edit').focus();
        return false;
    }
  },


}