import { todo } from "../Model/Todo";
import { List } from "../Model/todoList";
import { todoView } from "../View/TodoView";
import { ControllerTodo } from "./TodoController";
import { getSpanIndex } from "./TodoController";
import { findArrayTodoId } from "./TodoController";
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

  markCompleteTodo(card, index) {
    todo.getProjectArray()[index].todo[
      findArrayTodoId(getSpanIndex(card), index)
    ].completed =
      !todo.getProjectArray()[index].todo[
        findArrayTodoId(getSpanIndex(card), index)
      ].completed;
    ControllerTodo.viewTodoList(index);
  }

  markCompleteTodoOnAllProjects(card, index) {
    todo.getProjectArray()[index].todo[card].completed =
      !todo.getProjectArray()[index].todo[card].completed;
    todoView.displayAllProjectList();
  }

  deleteTodo(card, index) {
    todo
      .getProjectArray()
      [index].todo.splice(findArrayTodoId(getSpanIndex(card), index), 1);
    ControllerTodo.viewTodoList(index);
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
