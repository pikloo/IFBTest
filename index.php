<?php 
session_start();

$configData = parse_ini_file(__DIR__.'./config.ini');


?>

<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">lpb_admin
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.1/css/bulma.min.css" />
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link
    href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Roboto+Mono:ital,wght@0,400;0,500;1,400&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">

  <title>TODOLIST - IFB</title>
</head>

<body>
  <div class="container">
    <header class="header">
      <div class="logo">
        <a href=".">
          <h1 class="logo__title title is-3">TodoList</h1>
        </a>
      </div>
    </header>


    <main>
      <!------------ADD FORM--------->
      <div class="task task--add">
        <form method="POST">
          <div class="task__content">
            <div class="task__name">
              <p class="task__name-display"></p>
              <p class="task__desc-display"></p>
              <input class="task__name-edit input" type="text" placeholder="Nom de la tâche" name="name" />
              <textarea class="task__desc-edit input" placeholder="Description de la tâche" name="name"></textarea>
            </div>
            <div class="task__buttons">
              <button class="task__button task__button--add button is-info">
                <span class="icon is-small">
                  <i class="fa fa-plus"></i>
                </span>
                <span>Ajouter</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!------------TASKS LIST--------->
      <div class="tasks">
      </div>
    </main>
  </div>

  <template id="new-task">
    <div class="task task--todo" data-task-id="">
      <div class="task__content">
        <div class="task__name">
          <p class="task__name-display"></p>
          <input class="task__name-edit input" type="text" value="" placeholder="Nom de la tâche" name="name" />
          <textarea class="task__desc-edit input" placeholder="Description de la tâche" name="name"></textarea>
        </div>
        <div class="task__buttons">
          <button class="task__button task__button--incomplete button is-success is-small">
            <span class="icon is-small">
              <i class="fa fa-step-backward"></i>
            </span>
          </button>
          <button class="task__button task__button--desarchive button is-success is-small">
            <span class="icon is-small">
              <i class="fa fa-undo"></i>
            </span>
          </button>
          <button class="task__button task__button--validate button is-success is-small">
            <span class="icon is-small">
              <i class="fa fa-check-square-o"></i>
            </span>
          </button>
          <button class="task__button task__button--modify button is-warning is-small">
            <span class="icon is-small">
              <i class="fa fa-pencil-square-o"></i>
            </span>
          </button>
          <button class="task__button task__button--archive button is-danger is-small">
            <span class="icon is-small">
              <i class="fa fa-archive"></i>
            </span>
          </button>
          <button class="task__button task__button--delete button is-danger is-small">
            <span class="icon is-small">
              <i class="fa fa-trash"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  </template>

  <script defer src="https://use.fontawesome.com/releases/v5.14.0/js/all.js"></script>
  <script src="./assets/js/app.js"></script>
  <script src="./assets/js/tasksList.js"></script>
  <script src="./assets/js/task.js"></script>
  <script src="./assets/js/addForm.js"></script>
  <script src="./assets/js/apiClient.js"></script>
</body>

</html>