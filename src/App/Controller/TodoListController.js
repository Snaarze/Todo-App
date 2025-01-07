import { todo } from "../Model/Todo";
import { List } from "../Model/todoList";
import { todoView } from "../View/TodoView";
import { ControllerTodo } from "./TodoController";
import { getSpanIndex } from "./TodoController";
import { findArrayTodoId } from "./TodoController";
class TodoListController {
  constructor() {
    this.currentArrayed = "";
    this.currentArrayedTodo = "";
    this.isAllProject = false;
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
    todo.getProjectArray()[index].todo[findArrayTodoId(card, index)].completed =
      !todo.getProjectArray()[index].todo[findArrayTodoId(card, index)]
        .completed;

    todoView.displayAllProjectList();
  }

  deleteTodoOnAllProjects(card, index) {
    todo.getProjectArray()[index].todo.splice(findArrayTodoId(card, index), 1);
    todoView.displayAllProjectList();
  }

  deleteTodo(card, index) {
    todo
      .getProjectArray()
      [index].todo.splice(findArrayTodoId(getSpanIndex(card), index), 1);
    ControllerTodo.viewTodoList(index);
  }

  confirmEditTodo() {
    todoView.htmlCache().confirmBtnEdit.addEventListener("click", (event) => {
      this.currentArrayedTodo.title = todoView.htmlCache().titleInputEdit.value;
      this.currentArrayedTodo.description =
        todoView.htmlCache().descriptionInputEdit.value;
      this.currentArrayedTodo.dueDate = todoView.htmlCache().dueInputEdit.value;
      this.currentArrayedTodo.priority =
        todoView.htmlCache().priorityInputEdit.value;
      this.currentArrayedTodo.notes = todoView.htmlCache().notesInputEdit.value;

      // this.clearAddingTodoInput();
      this.closeEditModal();
      console.log(this.isAllProject);
      if (this.isAllProject) {
        todoView.displayAllProjectList();
        return;
      }
      ControllerTodo.viewTodoList(this.currentArrayed);
    });
  }

  editShowModal(index, arrayIndex, card) {
    todoView.htmlCache().editForms.showModal();
    this.currentArrayed = arrayIndex;
    this.currentArrayedTodo = index;
    return (this.isAllProject = card.hasAttribute("project-index"));
  }

  closeEditModal() {
    todoView.htmlCache().editForms.close();
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
