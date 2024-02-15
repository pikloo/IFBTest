const tasksList = {
  initializeTasksFromDOM: function(){
    let tasksElementsList = document.querySelectorAll('.tasks .task');
    
    for(let taskElement of tasksElementsList){
        task.addAllEventListeners(taskElement);
    }
  },
    
  loadTasksFromApi : function(){
    const url = apiClient.rootURL + '/tasks';
   
    let fetchCall= apiClient.sendRequest('GET',url).then(tasksList.displayTasks);
    return fetchCall;
  },

  displayTasks: function(tasksListing){

    for(let taskData of tasksListing){
      let taskElement =  task.createDOMElement(taskData.title, taskData.category.name);
      if(taskData.status == 2)  {
        task.setStatus(taskElement, 'archive');
      }
      else if(taskData.status == 1 && taskData.completion == 100) {
        task.setStatus(taskElement, 'complete');
      }

      task.setCompletion(taskElement,taskData.completion);

      //Mise à jour de l'id dans le DOM
      task.setId(taskElement,taskData.id)
      
      tasksList.addTaskInDOM(taskElement);
    }

    
    
    return tasksListing
  },

  addTaskInDOM: function(taskElement) {
    let taskListElement = document.querySelector('.tasks');
    taskListElement.prepend(taskElement);
  }
}