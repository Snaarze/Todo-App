import { todo } from "../Model/Todo";
import { List } from "../Model/todoList";
import { todoView } from "../View/TodoView";
import { listController } from "./TodoListController";

class TodoController {
  constructor() {}

  addProject() {
    // adding projects
    const addButton = document.querySelector(".add-btn");

    addButton.addEventListener("click", () => {
      if (!todoView.htmlCache().addNewProject.value)
        return alert("Fields cannot be empty!, Action aborted");
      todo.createProject(todoView.htmlCache().addNewProject.value);
      todo.updateData();
      todoView.DisplayProjectList(todoView.htmlCache().addNewProject.value);
      todoView.htmlCache().addNewProject.value = "";
    });
  }

  eventCache() {
    // initial rendering
    this.closeDialog();
    this.addProject();
    listController.addTodoListBtn();
    List.getCurrentId();
    todo.getCurrentProjectId();
  }

  updateProject() {
    // update the selected Row
    todoView.htmlCache().editBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const titleProject = prompt();
        const array = todo.getProjectArray();
        array[getDataIndex(btn)].title = titleProject;
        todoView.DisplayProjectList();
      });
    });
  }

  viewTodoList(dataIndex) {
    todo.renderData();
    console.log(dataIndex);
    todoView.displayTodoList(todo.getProjectArray()[dataIndex].todo, dataIndex);
    // view the todo list depending on the selected row and fetch the todo List.
    todoView.htmlCache().containerList.addEventListener("click", (event) => {
      if (event.target.tagName === "SPAN") {
        if (event.target.getAttribute("data-index") === "allProjects") {
          todoView.displayAllProjectList();
        } else {
          const index = findArrayId(getSpanIndex(event.target));
          const data =
            todo.getProjectArray()[findArrayId(getSpanIndex(event.target))]
              .todo;

          todoView.displayTodoList(data, index);
        }
      }
    });
  }

  deleteProject() {
    // delete the selected row
    todoView.htmlCache().deleteBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const array = todo.getProjectArray();
        if (array.length <= 1) {
          return alert("Cannot Delete, Todo Notes should have one as Default");
        }
        array.splice(findArrayId(getDataIndex(btn)), 1);
        todo.updateData();
        todoView.DisplayProjectList();
      });
    });
  }

  closeDialog() {
    todoView
      .htmlCache()
      .closeDialogBtn.addEventListener("click", todoView.closeDialogFunction);
  }

  viewAllProjectEvent() {
    todoView
      .htmlCache()
      .AllProjectBtn.addEventListener("click", todoView.viewAllProject);
  }
}

export function getDataIndex(btn) {
  return parseInt(
    btn.parentElement.previousElementSibling.getAttribute("data-index")
  );
}

export function getSpanIndex(btn) {
  return parseInt(btn.getAttribute("data-index"));
}

export function findArrayId(btn) {
  const array = todo.getProjectArray();
  return array.findIndex((data) => data.id === btn);
}

export const ControllerTodo = new TodoController();
