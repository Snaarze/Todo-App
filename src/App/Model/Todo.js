class Todo {
  constructor(projectName) {
    this.Storage = JSON.parse(localStorage.getItem("data"));
    this.id =
      this.Storage === null ? 0 : this.Storage[this.Storage.length - 1].id;
    this.projectName = projectName;
    this.projectArray = [
      {
        id: 0,
        title: "Project 1",
        todo: [
          {
            id: 0,
            title: "Setup Project Repository",
            description:
              "Initialize the Git repository and set up the basic folder structure.",
            dueDate: "2024-12-05",
            priority: "High",
            notes: "Don't forget to add a README and .gitignore file.",
            completed: false,
          },
          {
            id: 1,
            title: "Research Requirements",
            description:
              "Gather information and details for the project specifications.",
            dueDate: "2024-12-10",
            priority: "Medium",
            notes: "Discuss with the client and team to finalize details.",
            completed: false,
          },
        ],
      },
      {
        id: 1,
        title: "Project 2",
        todo: [
          {
            id: 0,
            title: "Design Wireframes",
            description:
              "Create wireframes for the main pages of the application.",
            dueDate: "2024-12-12",
            priority: "High",
            notes:
              "Focus on simplicity and usability. Use Figma for the designs.",
            completed: false,
          },
          {
            id: 1,
            title: "Set Up Development Environment",
            description: "Prepare the tools and environment for development.",
            dueDate: "2024-12-07",
            priority: "Low",
            notes:
              "Ensure all team members use the same versions of dependencies.",
            completed: false,
          },
        ],
      },
    ];
  }
  // render the data as initial
  renderData() {
    this.updateData();
    this.projectArray = this.Storage ? this.Storage : this.projectArray;
  }

  // update the localstorage everytime project or list is added.
  updateData() {
    return localStorage.setItem("data", JSON.stringify(this.projectArray));
  }

  // increment the id everytime a project is created
  incrementProjectId() {
    return this.id++;
  }

  // create Project that increment the id.
  createProject(projectName) {
    this.incrementProjectId();
    const project = new CreateTodo(this.id, projectName);
    this.projectArray.push(project);
  }

  // return the array
  getProjectArray() {
    return this.projectArray;
  }
}

function CreateTodo(id, title) {
  this.id = id;
  this.title = title;
  this.todo = [];
}

export const todo = new Todo("ProjectName");
