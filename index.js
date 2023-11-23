var input = require("prompt-sync")();

let tasks = [];

function menu() {
    console.log(`
Escolha uma opção:
[1] Adicionar tarefa
[2] Listar tarefas
[3] Excluir tarefa pelo Id
[4] Editar tarefa pelo Id
[5] Capturar Tarefa
[0] Sair
`);

    let user = input("Escolha: ");

    if (user) {
        userInput(user);
    } else {
        throw new Error("Nenhuma opção escolhida");
    }
}

// adicionar tarefa
function addTask(task) {
    let incrementId = tasks.length + 1;

    if (task != undefined || task != null) {
        tasks.push({ id: incrementId, description: task });
    } else {
        throw new Error("Descreva sua tarefa");
    }
}

// remover tarefa
function removeTask(taskId) {
    if (captureTaskById(taskId) != -1) {
        tasks.splice(taskId, 1);
    } else {
        throw new Error("Id informado não foi encontrado");
    }
}

// editar tarefa
function editTask(taskId) {
    if (captureTaskById(taskId) != -1) {
        let newDescription = input("Escreva a nova descrição: ");

        tasks[taskId].description = newDescription;
    } else {
        throw new Error("Id informado não foi encontrado");
    }
}

// obter tarefa pelo id
function showTaskById(taskId) {
    if (captureTaskById(taskId) != -1) {
        console.log(
            `A tarefa é: ${tasks[taskId].description} de número: ${tasks[taskId].id} `
        );
    } else {
        throw new Error("Nenhuma tarefa encontrada!");
    }
}

// capturar id
function captureTaskById(taskId) {
    return tasks.findIndex((task) => task.id == taskId);
}

// retorno de opção
function userInput(userSelect) {
    try {
        switch (userSelect) {
            case "1":
                let newTask = input("Descreva sua tarefa: ");

                try {
                    if (newTask) {
                        addTask(newTask);

                        menu();
                    } else {
                        console.log("Você não descreveu uma tarefa!");
                        let newTaskTry = input("Faça isso agora: ");
                        addTask(newTaskTry);

                        menu();
                    }
                } catch (error) {
                    console.log(error);
                }
                break;

            case "2":
                console.log("Lista de tarefas:");

                tasks.forEach((task) => {
                    return console.log(`${task.id} - ${task.description}`);
                });

                menu();
                break;

            case "3":
                let inputTaskIdRemove = input(
                    "Qual Id da tarefa a ser removida? "
                );

                removeTask(inputTaskIdRemove);

                menu();
                break;

            case "4":
                let inputTaskIdEdite = input(
                    "Qual Id da tarefa a ser editada? "
                );

                editTask(inputTaskIdEdite);

                menu();
                break;

            case "5":
                let inputTaskIdCap = input(
                    "Qual Id da tarefa a ser capturada? "
                );

                showTaskById(inputTaskIdCap);

                menu();
                break;
            case "0":
                console.clear();
                break;

            default:
                menu();
                break;
        }
    } catch (error) {
        console.log(error);
    }
}

menu();
