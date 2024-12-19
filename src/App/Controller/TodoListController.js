import { todo } from "../Model/Todo";
import { List } from "../Model/todoList";
import { todoView } from "../View/TodoView";
import { ControllerTodo } from "./TodoController";

class TodoListController {
  constructor() {}
  addTodoListBtn() {
    todoView.htmlCache().addTodoBtn.addEventListener("click", (event) => {
      const array = todo.getProjectArray();
      let index = parseInt(event.target.getAttribute("data-index"));
      array[index].todo.push(List.createTodoList());
      ControllerTodo.viewTodoList(index);
    });
  }
}

export const listController = new TodoListController();
