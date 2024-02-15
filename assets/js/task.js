const task = {

  addAllEventListeners: function (taskElement) {
      let taskNameElement = taskElement.querySelector('.task__name-display');
      let taskInputNameElement = taskElement.querySelector('.task__name-edit');
      let taskEditButtonElement = taskElement.querySelector('.task__button--modify');
      let taskCompletedButtonElement = taskElement.querySelector('.task__button--validate');
      let taskArchivedButtonElement = taskElement.querySelector('.task__button--archive');
      let taskDesarchivedButtonElement = taskElement.querySelector('.task__button--desarchive');
      let taskIncompletedButtonElement = taskElement.querySelector('.task__button--incomplete');
      let taskDeleteButtonElement = taskElement.querySelector('.task__button--delete');


      taskNameElement.addEventListener('click', task.handleClickEditName);
      taskInputNameElement.addEventListener('blur', task.handleBlurOnTaskInputName);
      taskInputNameElement.addEventListener('keyup', task.handleKeyUptaskInputName);
      taskEditButtonElement.addEventListener('click', task.handleClickEditName);
      taskCompletedButtonElement.addEventListener('click', task.handleClickOnCompletedButton);
      taskArchivedButtonElement.addEventListener('click', task.handleClickOnArchivedButton);
      taskDesarchivedButtonElement.addEventListener('click', task.handleClickOnDesarchivedButton);
      taskIncompletedButtonElement.addEventListener('click', task.handleClickOnIncompleteButton);
      taskDeleteButtonElement.addEventListener('click', task.handleClickOnDeleteButton);

  },



  handleClickEditName: function (evt) {
      let taskNameElement = evt.currentTarget;
      let taskElement = taskNameElement.closest('.task');

      taskElement.classList.add('task--edit');

      let taskInputNameElement = taskElement.querySelector('.task__name-edit');
      taskInputNameElement.focus();

      let length = taskInputNameElement.value.length
      taskInputNameElement.setSelectionRange(length, length);
  },

  handleBlurOnTaskInputName: function (evt) {
      // récupération de la valeur saisie par l'utilisateur
      let taskInputNameElement = evt.currentTarget;
      let taskNewName = taskInputNameElement.value;

      // récupération de l'élément parent ayant la classe task
      let taskElement = taskInputNameElement.closest('.task');

      // ciblage de l'élément affichant le nom de la tâche
      let taskNameElement = taskElement.querySelector('.task__name-display');

      //On stocke le titre initial avant de le changer
      let initialTaskName = taskNameElement.textContent;

      // mise à jour de du contenu texte de la l'élément affichant le nom de la tâche
      taskNameElement.textContent = taskNewName;

      // on retire la classe CSS task--edit de l'élément task
      taskElement.classList.remove('task--edit');

      const taskId = task.getId(taskElement);
      // =======================================================================================
      // appel à l'api pour mettre à jour(patcher) le niveau de completion de la tache
      // récupération de l'id de la tâche

      //! ENVOI DE DONNEES AU SERVEUR
      const url = apiClient.rootURL + '/tasks/' + taskId;
      
      let data = {
          'title': taskNewName,
      };

      apiClient.sendRequest('PATCH', url, data).then(function (response) {
          if (response.id) {
              console.log('La modification a été enregistrée')

          } else {
              if (taskNewName !== initialTaskName) {
                  alert("Une tâche ayant la même titre existe déja");
                  //On remte le titre initial
                  taskNameElement.textContent = initialTaskName;
                  taskInputNameElement.value = initialTaskName;
              }

          }
          return response;
      });

  },

  handleKeyUptaskInputName: function (evt) {
      if (evt.key === 'Enter') {
          //! handleBlurOnTaskInputName semble être éxécuté 2 fois ??
          let taskInputNameElement = evt.currentTarget;
          let taskElement = taskInputNameElement.closest('.task');
          taskElement.classList.remove('task--edit');
      }
  },

  handleClickOnCompletedButton: function (evt) {
      let taskCompletedButtonElement = evt.currentTarget;
      let taskElement = taskCompletedButtonElement.closest('.task');
      taskElement.classList.remove('task--todo');
      taskElement.classList.add('task--complete');

      task.setCompletion(taskElement, 100);

      const taskId = taskElement.dataset.taskId;

      //! ENVOI DE DONNEES AU SERVEUR
      const url = apiClient.rootURL + '/tasks/' + taskId;
      let data = {
          'completion': 100,
      };

      apiClient.sendRequest('PATCH', url, data);
  },

  handleClickOnArchivedButton: function (evt) {

      if (window.confirm("Voulez-vous vraiment archiver cette tâche?")) {
          let taskArchivedButtonElement = evt.currentTarget;
          let taskElement = taskArchivedButtonElement.closest('.task');
          taskElement.classList.remove('task--todo');
          taskElement.classList.remove('task--complete');
          taskElement.classList.add('task--archive');

          const taskId = taskElement.dataset.taskId;

          //! ENVOI DE DONNEES AU SERVEUR
          const url = apiClient.rootURL + '/tasks/' + taskId;
          let data = {
              'status': 2,
          };

          apiClient.sendRequest('PATCH', url, data);
      }

  },

  handleClickOnDesarchivedButton: function(evt) {
      if (window.confirm("Voulez-vous vraiment désarchiver cette tâche?")) {
          let taskArchivedButtonElement = evt.currentTarget;
          let taskElement = taskArchivedButtonElement.closest('.task');
          taskElement.classList.add('task--todo');
          taskElement.classList.remove('task--archive');

          const taskId = taskElement.dataset.taskId;

          //! ENVOI DE DONNEES AU SERVEUR
          const url = apiClient.rootURL + '/tasks/' + taskId;
          let data = {
              'status': 1,
          };

          apiClient.sendRequest('PATCH', url, data);
      }


  },


  handleClickOnIncompleteButton: function (evt) {
      let taskIncompletedButtonElement = evt.currentTarget;
      let taskElement = taskIncompletedButtonElement.closest('.task');
      taskElement.classList.remove('task--complete');
      taskElement.classList.add('task--todo');

      task.setCompletion(taskElement, 0);

      // appel à l'api pour mettre à jour(patcher) le niveau de completion de la tache
      // récupération de l'id de la tâche
      const taskId = taskElement.dataset.taskId;

      //! ENVOI DE DONNEES AU SERVEUR
      const url = apiClient.rootURL + '/tasks/' + taskId;

      let data = {
          'completion': 0,
      };

      apiClient.sendRequest('PATCH', url, data);

  },


  handleClickOnDeleteButton: function (evt) {
      if (window.confirm("Voulez-vous vraiment supprimer cette tâche?")) {
          let taskDeleteButtonElement = evt.currentTarget;
          let taskElement = taskDeleteButtonElement.closest('.task');

          const taskId = taskElement.dataset.taskId;

          //! ENVOI DE DONNEES AU SERVEUR
          const url = apiClient.rootURL + '/tasks/' + taskId;

          apiClient.sendRequest('DELETE', url).then(function(){
              taskElement.style.display = 'none';
          });
          

      }
  },
  //=========================================================
  // Méthodes getter/setter 
  //=========================================================
  setStatus: function (taskElement, status) {
      taskElement.classList.add('task--' + status);
      taskElement.classList.remove('task--todo');
      return status;

  },

  setCompletion: function (taskElement, completion) {
      taskElement.querySelector('.progress-bar__level').style.width = completion + '%';

      return taskElement;
  },


  setId: function (taskElement, id) {
      taskElement.dataset.taskId = id
      return id;
  },

  getId: function (taskElement) {
      return taskElement.dataset.taskId;
  },

  //=======================================================================
  // Méthodes utilitaires pour construire le DOM correspondant à une tache
  //========================================================================

  createDOMElement: function (taskName, taskCategoryName) {
      let template = document.getElementById('new-task');

      let templateForNewTask = template.content.cloneNode(true);
      templateForNewTask.querySelector('.task').dataset.category = taskCategoryName;
    //   templateForNewTask.querySelector('.task__category p').textContent = taskCategoryName;

      templateForNewTask.querySelector('.task__name-display').textContent = taskName;
      templateForNewTask.querySelector('.task__name-edit').setAttribute('value', taskName);
      templateForNewTask.querySelector('.task__name-edit').value = taskName;

      let taskElement = templateForNewTask.firstElementChild;

      task.addAllEventListeners(taskElement);

      return taskElement;
  },

}