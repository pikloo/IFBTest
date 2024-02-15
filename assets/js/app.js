const app = {
  init:function(){
      tasksList.initializeTasksFromDOM();
      addForm.initiliazeSubmitForm();
      // tasksList.loadTasksFromApi();
  },
}

document.addEventListener('DOMContentLoaded', app.init);