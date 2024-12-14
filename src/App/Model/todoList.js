import { todo } from "./Todo";

class TodoList {
  constructor() {
    this.id = 0;
  }

  incrementIdList() {
    this.id++;
  }

  getCurrentId() {
    return console.log(this.id);
  }

  selectedProject(index) {
    return this.updateCurrentId(index);
  }

  updateCurrentId(index) {
    let currentId = JSON.parse(localStorage.getItem("data"))[
      index === undefined ? 0 : index
    ];
    let updatedId = currentId.todo[currentId.todo.length - 1].id;
    return (this.id = updatedId);
  }

  createTodoList(title, description, dueDate, priority, notes, checklist) {
    this.incrementIdList();
    const newList = new CreateList(
      this.id,
      prompt("Title"),
      prompt("Description"),
      prompt("Due"),
      prompt("Priority"),
      prompt("Notes"),
      prompt("checkList")
    );

    // const newList = new CreateList(this.id,title, description, dueDate, priority, notes, checklist);
    return newList;
  }
}

function CreateList(
  id,
  title,
  description,
  dueDate,
  priority,
  notes,
  checklist
) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.notes = notes;
  this.checklist = checklist;
}

export const List = new TodoList();
