window.addEventListener("load", () => {
  const form = document.getElementById("input-task-form");
  const input = document.getElementById("input");
  const button = document.getElementById("submit-button");
  const table = document.getElementById("Table");

  const getList = () => {
    console.log("hii", localStorage.getItem("todo"));
    if (localStorage.getItem("todo") === null) {
      return [];
    }
    console.log(JSON.parse(localStorage.getItem("todo")), "hii2");
    return localStorage.getItem("todo");
  };

  var task_list = getList();

  for (let i = 0; i < task_list.length; i++) {
    const row = document.createElement("row");
    const col1 = document.createElement("div");
    const col2 = document.createElement("div");
    const col3 = document.createElement("div");
    const col4 = document.createElement("div");
    const col5 = document.createElement("div");

    row.classList.add("row");
    col1.classList.add("table-content");
    col2.classList.add("table-content");
    col2.classList.add("r");
    col4.classList.add("table-content");
    col3.classList.add("table-content");

    col5.classList.add("table-content");

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-pen-to-square");
    editIcon.classList.add("Icon");
    editIcon.classList.add("edit");

    col4.append(editIcon);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid");
    deleteIcon.classList.add("fa-trash");
    deleteIcon.classList.add("Icon");
    deleteIcon.classList.add("delete");

    col5.append(deleteIcon);

    const col3div = document.createElement("div");

    col1.innerText = i;
    col2.innerText = task_list[i].task;
    col3div.innerText = task_list[i].status;

    col3.append(col3div);
    col3div.classList.add("status-");

    if (task_list[i] == "Pending") {
      col3div.classList.add("pending");
    } else if (task_list[i] == "Todo") {
      col3div.classList.add("todo");
    } else {
      col3div.classList.add("complete");
    }

    col5.addEventListener("click", () => handleDelete(i));

    row.append(col1);
    row.append(col2);
    row.append(col3);
    row.append(col4);
    row.append(col5);
    table.append(row);
  }

  const handleDelete = (ind) => {
    console.log("function");
    let temp = [];
    for (let i = 0; i < task_list.length; i++) {
      if (i != ind) temp.push(task_list[i]);
    }
    task_list = [];
    task_list = temp;
    console.log(task_list);

    document.getElementById("Table").innerHTML = "";

    for (let i = 0; i < task_list.length; i++) {
      const row = document.createElement("row");
      const col1 = document.createElement("div");
      const col2 = document.createElement("div");
      const col3 = document.createElement("div");
      const col4 = document.createElement("div");
      const col5 = document.createElement("div");

      row.classList.add("row");
      col1.classList.add("table-content");
      col2.classList.add("table-content");
      col2.classList.add("r");
      col4.classList.add("table-content");
      col3.classList.add("table-content");

      col5.classList.add("table-content");

      const editIcon = document.createElement("i");
      editIcon.classList.add("fa-solid");
      editIcon.classList.add("fa-pen-to-square");
      editIcon.classList.add("Icon");
      editIcon.classList.add("edit");

      col4.append(editIcon);

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid");
      deleteIcon.classList.add("fa-trash");
      deleteIcon.classList.add("Icon");
      deleteIcon.classList.add("delete");

      col5.append(deleteIcon);

      const col3div = document.createElement("div");

      col1.innerText = i;
      col2.innerText = task_list[i].task;
      col3div.innerText = task_list[i].status;

      col3.append(col3div);
      col3div.classList.add("status-");

      if (task_list[i] == "Pending") {
        col3div.classList.add("pending");
      } else if (task_list[i] == "Todo") {
        col3div.classList.add("todo");
      } else {
        col3div.classList.add("complete");
      }

      col5.addEventListener("click", () => handleDelete(i));

      row.append(col1);
      row.append(col2);
      row.append(col3);
      row.append(col4);
      row.append(col5);
      table.append(row);
    }

    localStorage.setItem("todo", task_list);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;
    console.log("submit form", task);
    if (!task) {
      alert("Please Fill out the task");
      return;
    }

    task_list.push({
      task: task,
      status: document.getElementById("status").value,
    });

    document.getElementById("Table").innerHTML = "";

    for (let i = 0; i < task_list.length; i++) {
      const row = document.createElement("row");
      const col1 = document.createElement("div");
      const col2 = document.createElement("div");
      const col3 = document.createElement("div");
      const col4 = document.createElement("div");
      const col5 = document.createElement("div");

      row.classList.add("row");
      col1.classList.add("table-content");
      col2.classList.add("table-content");
      col2.classList.add("r");
      col4.classList.add("table-content");
      col3.classList.add("table-content");

      col5.classList.add("table-content");

      const editIcon = document.createElement("i");
      editIcon.classList.add("fa-solid");
      editIcon.classList.add("fa-pen-to-square");
      editIcon.classList.add("Icon");

      col4.append(editIcon);

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid");
      deleteIcon.classList.add("fa-trash");
      deleteIcon.classList.add("Icon");

      col5.append(deleteIcon);

      const col3div = document.createElement("div");

      col1.innerText = i;
      col2.innerText = task_list[i].task;
      col3div.innerText = task_list[i].status;

      col3.append(col3div);
      col3div.classList.add("status-");

      col5.addEventListener("click", () => handleDelete(i));

      row.append(col1);
      row.append(col2);
      row.append(col3);
      row.append(col4);
      row.append(col5);
      table.append(row);
    }

    localStorage.setItem("todo", task_list);

    document.getElementById("input").innerText = "";
  });
});
