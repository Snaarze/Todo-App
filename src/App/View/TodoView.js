import { ControllerTodo } from "../Controller/TodoController";
import { listController } from "../Controller/TodoListController";
import { todo } from "../Model/Todo";
import { List } from "../Model/todoList";
class TodoView {
  constructor() {}

  DisplayProjectList() {
    // re-render All
    while (this.htmlCache().containerList.firstChild) {
      this.htmlCache().containerList.firstChild.remove();
    }
    this.htmlCache().containerList.classList.add("flex", "flex-col", "gap-2");
    this.createAllProject();
    todo.renderData();

    // this functions create new element that are display by the lenght of the array.
    todo.getProjectArray().forEach((array) => {
      //   list Class
      const list = document.createElement("li");

      list.classList.add("flex", "gap-2", "projectList");

      //   span Title Classes
      const spanList = document.createElement("span");
      spanList.setAttribute("data-index", array.id);
      spanList.textContent = array.title;
      spanList.classList.add("flex-1", "w-20", "span-title", "text-wrap");
      list.appendChild(spanList);

      //container buttons
      const containerBtn = document.createElement("div");
      containerBtn.classList.add(
        "flex",
        "items-center",
        "justify-center",
        "gap-2"
      );
      list.appendChild(containerBtn);

      //   create a button that can edit and delete the  selected Project
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add(
        "text-xs",
        "bg-green",
        "py-1",
        "px-3",
        "text-white",
        "edit-btn"
      );
      containerBtn.appendChild(editBtn);

      //   Delete Button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add(
        "text-xs",
        "bg-red",
        "py-1",
        "px-3",
        "text-white",
        "delete-btn"
      );
      containerBtn.appendChild(deleteBtn);
      this.htmlCache().containerList.appendChild(list);
    });
    ControllerTodo.deleteProject();
    ControllerTodo.updateProject();
  }

  createAllProject() {
    const list = document.createElement("li");

    list.classList.add("flex", "gap-2", "projectList", "test-center");

    //   span Title Classes
    const spanList = document.createElement("span");
    spanList.setAttribute("data-index", "allProjects");
    spanList.textContent = "All Projects";
    spanList.classList.add("flex-1", "w-20", "span-title", "text-wrap");
    list.appendChild(spanList);

    this.htmlCache().containerList.appendChild(list);
  }

  // display all the active all todo ists
  displayAllProjectList() {
    this.removeChildOfContainerList();

    // this method or variable removes all the null todo to prevent errors of undefined properties such as id, title etc..
    const arrayMapped = todo
      .getProjectArray()
      .map((element) => element.todo || null)
      .filter(Boolean);

    // run dynamically that depends on the length of the current array
    for (let i = 0; i < todo.getProjectArray().length; i++) {
      console.log(arrayMapped[i]);
      // runs through occupied todos that create card for list of arrays
      for (let j = 0; j < arrayMapped[i].length; j++) {
        const card = document.createElement("div");
        card.setAttribute("data-index", arrayMapped[i][j].id);
        card.setAttribute("project-index", i);

        card.classList.add(
          "border",
          `border-gray-300`,
          "flex",
          "flex-1",
          "flex-col",
          "justify-center",
          "items-center",
          "h-full",
          "min-w-24",
          "cursor-pointer",
          "relative"
        );
        this.viewListDetailBtn(
          card,
          parseInt(card.getAttribute("project-index"))
        );
        const todoTitle = document.createElement("p");
        todoTitle.classList.add("text-sm");
        todoTitle.textContent = arrayMapped[i][j].title;
        card.appendChild(todoTitle);
        const todoDue = document.createElement("p");
        todoDue.textContent = arrayMapped[i][j].dueDate;
        card.appendChild(todoDue);
        this.htmlCache().todoContainerList.appendChild(card);
      }
    }
  }

  removeChildOfContainerList() {
    // remove every child if exist to re-render the items of the array
    while (this.htmlCache().todoContainerList.firstChild) {
      this.htmlCache().todoContainerList.firstChild.remove();
    }
  }
  displayTodoList(array, index) {
    // close the dialog form if it open
    this.closeDialogFunction();

    // remove all the todo List card
    this.removeChildOfContainerList();
    // stop foreach if the array doesnt have any value

    // checks if the current array is true, then create card.
    if (array) {
      array.forEach((element) => {
        const card = document.createElement("div");
        card.setAttribute("data-index", element.id);
        card.classList.add(
          "border",
          `border-gray-300`,
          "flex",
          "flex-1",
          "flex-col",
          "justify-center",
          "items-center",
          "h-full",
          "min-w-24",
          "cursor-pointer",
          "relative"
        );
        this.viewListDetailBtn(card, index);
        const todoTitle = document.createElement("p");
        todoTitle.classList.add("text-sm");
        todoTitle.textContent = element.title;
        card.appendChild(todoTitle);

        const todoDue = document.createElement("p");
        todoDue.textContent = element.dueDate;
        card.appendChild(todoDue);
        this.htmlCache().todoContainerList.appendChild(card);
      });
      List.selectedProject(index);
    }

    // create a add button everytime use click other projects
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add(
      "flex",
      "justify-center",
      "items-center",
      "min-w-60"
    );
    const addTodoBtn = document.createElement("button");

    addTodoBtn.setAttribute("data-index", !index ? 0 : index);
    // append button to todoListContainer
    addTodoBtn.classList.add(
      "fa-solid",
      "fa-plus",
      "text-4xl",
      "addTodoBtn",
      "text-center"
    );
    buttonContainer.appendChild(addTodoBtn);
    this.htmlCache().todoContainerList.appendChild(buttonContainer);
    listController.addTodoListBtn();
  }

  // view details as modal and binding the button.
  viewListDetailBtn(element, index) {
    element.addEventListener("click", () => {
      this.viewListDetails(element, index);
    });
  }

  viewListDetails(element, index) {
    const subArrayId = todo
      .getProjectArray()
      [index].todo.findIndex(
        (data) => data.id === parseInt(element.getAttribute("data-index"))
      );
    console.log(subArrayId);
    this.openDialogFunction();
    const array = todo.getProjectArray()[index ? index : 0].todo[subArrayId];
    console.log(array);

    this.htmlCache().title.textContent = `${!array ? 0 : array.title}`;
    this.htmlCache().description.textContent = `Description : ${array.description}`;
    this.htmlCache().due.textContent = `Due Date : ${array.dueDate}`;
    this.htmlCache().priority.textContent = `Priority : ${array.priority}`;
    this.htmlCache().notes.textContent = `Notes : ${array.notes}`;
  }

  openDialogFunction() {
    this.htmlCache().dialogForm.classList.remove("hidden");
    this.htmlCache().dialogForm.classList.add("flex");
  }

  closeDialogFunction() {
    todoView.htmlCache().dialogForm.classList.remove("flex");
    todoView.htmlCache().dialogForm.classList.add("hidden");
  }

  htmlCache() {
    const containerList = document.querySelector(".project-ul");
    const todoContainerList = document.querySelector(".todo-list");
    const SelectedProject = document.querySelectorAll(".projectList");
    const spanData = document.querySelector(".span-title");
    const editBtn = document.querySelectorAll(".edit-btn");
    const deleteBtn = document.querySelectorAll(".delete-btn");
    const addTodoBtn = document.querySelector(".addTodoBtn");
    const cardContainer = document.querySelectorAll(".card");
    const dialogForm = document.querySelector(".dialogForm");
    const title = document.querySelector(".title-todo");
    const description = document.querySelector(".todoDescription");
    const due = document.querySelector(".todoDue");
    const priority = document.querySelector(".todoPriority");
    const notes = document.querySelector(".todoNotes");
    const closeDialogBtn = document.querySelector(".closeBtn");
    const AllProjectBtn = document.querySelector(".allProjects");
    const addNewProject = document.querySelector(".newProject");
    return {
      containerList,
      todoContainerList,
      spanData,
      editBtn,
      deleteBtn,
      SelectedProject,
      addTodoBtn,
      cardContainer,
      title,
      description,
      due,
      priority,
      notes,
      dialogForm,
      closeDialogBtn,
      AllProjectBtn,
      addNewProject,
    };
  }

  initialLoadData(i) {
    todo.renderData();
    this.DisplayProjectList();
    ControllerTodo.viewTodoList(0);
    ControllerTodo.eventCache();
  }
}

export const todoView = new TodoView();
