import { todo } from "../Model/Todo";
import { List } from "../Model/todoList";
import { todoView } from "../View/TodoView";
import { ControllerTodo } from "./TodoController";

class TodoListController {
  constructor() {
    this.currentArrayed = "";
  }

  addShowModal() {
    todoView.htmlCache().confirmBtn.addEventListener("click", () => {
      const array = todo.getProjectArray();
      array[this.currentArrayed].todo.push(
        List.createTodoList(
          todoView.htmlCache().titleInput.value,
          todoView.htmlCache().descriptionInput.value,
          todoView.htmlCache().dueInput.value,
          todoView.htmlCache().priorityInput.value,
          todoView.htmlCache().notesInput.value
        )
      );
      this.clearAddingTodoInput();
      todoView.htmlCache().ProjectForms.close();
      ControllerTodo.viewTodoList(this.currentArrayed);
    });
  }

  clearAddingTodoInput() {
    todoView.htmlCache().titleInput.value =
      todoView.htmlCache().descriptionInput.value =
      todoView.htmlCache().dueInput.value =
      todoView.htmlCache().priorityInput.value =
      todoView.htmlCache().notesInput.value =
        "";
  }
  addTodoListBtn() {
    todoView.htmlCache().addTodoBtn.addEventListener("click", (event) => {
      let index = parseInt(event.target.getAttribute("data-index"));

      todoView.htmlCache().ProjectForms.showModal();
      this.currentArrayed = index;
    });
  }
}

export const listController = new TodoListController();
