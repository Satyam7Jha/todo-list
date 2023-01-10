window.addEventListener("load", () => {
  const FORM = document.getElementById("input-task-form");
  const INPUT = document.getElementById("input");
  const BUTTON = document.getElementById("submit-button");
  const TABLE = document.getElementById("Table");
  const VISIBLE_BTN = document.getElementById("add-task-visible");

  window.addEventListener("resize", handleResize);

  function handleResize() {
    var w = document.documentElement.clientWidth;
    const body = document.getElementById("body");

    if (w < 600) {
      body.classList.remove("p");
      body.classList.remove("p-14");
      body.classList.add("p-1");
      INPUT.classList.add("w-[95px]");
    }

    if (w > 600) {
      body.classList.remove("p");
      body.classList.remove("p-1");
      body.classList.add("p-14");
      INPUT.classList.remove("w-[95px]");
    }
  }

  function showAddTask() {
    FORM.classList.remove("hidden");
    VISIBLE_BTN.classList.add("hidden");
  }

  VISIBLE_BTN.addEventListener("click", showAddTask);
  function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key));

    if (savedValue) return savedValue;

    if (initialValue instanceof Function) return initialValue();

    return initialValue;
  }

  function saveValue(value) {
    localStorage.setItem("todo-list", JSON.stringify(value));
  }

  const row_item_style = [
    "flex",
    "flex-grow",
    "justify-between",
    "items-center",
  ];

  const row_style = [
    "flex",
    "flex-row",
    "border-grey-300",
    "border-b-2",
    "font-sans",
    "text-grey-300",
    "font-bold",
    "h-[50px]",
  ];

  const icon_style = [
    "fa-solid",
    "cursor-pointer",
    "text-[#0dcaf0]",
    "hover:text-[rgb(128,128,128)]",
    "text-2xl",
    "active:text-[#0dcaf0]",
    "active:border-[#0dcaf0]",
  ];
  function renderTasks(task_list) {
    task_list.sort((a, b) => {
      if (a["status"] > b["status"]) return -1;
      return 1;
    });
    saveValue(task_list);
    TABLE.innerHTML = "";

    for (let i = 0; i < task_list.length; i++) {
      const row = document.createElement("div");
      const col1 = document.createElement("div");
      const col2 = document.createElement("div");
      const col3 = document.createElement("div");
      const col4 = document.createElement("div");
      const col5 = document.createElement("div");

      const col3_border_div = document.createElement("div");
      col3_border_div.innerText = task_list[i]["status"];
      col3.classList.add("min-w-[100px]");

      if (task_list[i].status == "Todo") {
        col3_border_div.classList.add(
          "border-2",
          "px-[8px]",
          "p-[2px]",
          "border-[#b2b7bb]",
          "rounded",
          "text-gray-800",
          "font-bold",
          "text-[#b2b7bb]"
        );
      } else if (task_list[i].status == "Complete") {
        col3_border_div.classList.add(
          "border-2",
          "px-[8px]",
          "p-[2px]",
          "border-green-500",
          "text-green-500",
          "rounded",
          "font-bold"
        );
      } else {
        col3_border_div.classList.add(
          "bg-[#ffc006]",
          "rounded",
          "border-2",
          "p-[2px]",
          "border-[#ffc006]",
          "font-bold"
        );
      }

      row.classList.add(...row_style);

      const editIcon = document.createElement("i");
      editIcon.classList.add("fa-pen-to-square", ...icon_style);

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add(
        "fa-trash",
        ...icon_style,
        "text-[rgb(128,128,128)]",
        "p-1",
        "border-2",
        "border-[rgb(128,128,128)]",
        "rounded",
        "text-[20px]",
        "p-x-[15px]"
      );

      editIcon.addEventListener("click", () => handleEdit(i));
      deleteIcon.addEventListener("click", () => handleDelete(i));

      col1.innerText = i;
      col2.innerText = task_list[i]["task"];
      col3.append(col3_border_div);
      col4.append(editIcon);
      col5.append(deleteIcon);

      col1.classList.add("items");
      col2.classList.add("items", "r");
      col3.classList.add("items");
      col4.classList.add("items");
      col5.classList.add("items");

      row.append(col1);
      row.append(col2);
      row.append(col3);
      row.append(col4);
      row.append(col5);

      TABLE.append(row);
    }
  }

  function handleDelete(ind) {
    task_list = task_list.filter((item, i) => ind != i);
    document.getElementById("Table").innerHTML = "";
    renderTasks(task_list);
  }

  function handleSubmit(e) {
    e.preventDefault();

    FORM.classList.add("hidden");
    VISIBLE_BTN.classList.remove("hidden");

    const task = INPUT.value;
    if (!task) {
      alert("Please Fill out the task");
      return;
    }

    task_list.push({
      task: task,
      status: document.getElementById("status").value,
    });

    renderTasks(task_list);
    INPUT.value = "";
  }

  function handleChange(e, ind) {
    task_list[ind]["status"] = e.target.value;
    renderTasks(task_list);
  }

  function handleEdit(ind) {
    const item = TABLE.childNodes[ind];
    item.childNodes[3].innerHTML = "";

    const editStatus = document.createElement("select");

    editStatus.setAttribute("value", task_list[ind].status);
    const opt0 = document.createElement("option");
    opt0.innerText = "Select";
    const opt1 = document.createElement("option");
    opt1.innerText = "Todo";
    opt1.setAttribute("value", "Todo");
    const opt2 = document.createElement("option");
    opt2.innerText = "Pending";
    opt2.setAttribute("value", "Pending");
    const opt3 = document.createElement("option");
    opt3.innerText = "Complete";
    opt3.setAttribute("value", "Complete");

    editStatus.append(opt0);
    editStatus.append(opt1);
    editStatus.append(opt2);
    editStatus.append(opt3);

    item.childNodes[3].append(editStatus);

    editStatus.addEventListener("change", (e) => handleChange(e, ind));
  }

  var task_list = getSavedValue("todo-list", []);
  renderTasks(task_list);

  FORM.addEventListener("submit", (e) => handleSubmit(e));
});
