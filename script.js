let listInput = [];
let values_list = document.createElement("ul");

function create_to_do_list() {
  let list_to_do = document.createElement("section");
  document.body.appendChild(list_to_do);
}

create_to_do_list();

function create_titre() {
  let titre = document.createElement("h1");
  titre.innerText = "BEHOLD! A TO-DO-LIST!";
  document.querySelector("section").appendChild(titre);
}

function create_to_list() {
  let to_list = document.createElement("div");
  to_list.setAttribute("class", "choice");
  let button = document.createElement("BUTTON");
  button.type = "button";
  button.innerHTML = "I'm a button, click on me! UWU";
  let input = document.createElement("input");

  to_list.appendChild(input);
  to_list.appendChild(button);
  document.querySelector("section").appendChild(to_list);
  button.addEventListener("click", add_to_list);
  document.querySelector("section").appendChild(values_list); 
}

function add_to_list() {
  let div_input = document.createElement("div");
  let time_div = "time_div_" + Date.now();
  div_input.setAttribute("id", time_div);
  let value_list = document.createElement("li");
  let value_input = document.querySelector("input").value;

  let priority = document.createElement("label");
  let priorityText = document.createTextNode("   Urgent ? ");
  let priorityButton = document.createElement("INPUT");
  priorityButton.setAttribute("type", "checkbox");
  priorityButton.addEventListener("click", function () {
    if (priorityButton.checked) {
      value_list.classList.add("priority");
      priorityText ="   Urgent !!! ";
    } else {
      value_list.classList.remove("priority");
    } });
  priority.appendChild(priorityText);
  priority.appendChild(priorityButton);
  let button = document.createElement("button");
  button.type = "button";
  button.innerHTML = "X";
  let terminateButton = document.createElement("input");
  terminateButton.type = "checkbox";
  terminateButton.setAttribute("class", "bullet");
  terminateButton.addEventListener("click", function () {
    if (terminateButton.checked) {
      value_list.classList.add("validate");
    } else {
      value_list.classList.remove("validate");
    }
    updateListInput(time_div, { finish: terminateButton.checked });
  });

  priorityButton.addEventListener("click", function () {
    updateListInput(time_div, { priority: priorityButton.checked });
  });

  if (value_input === "") {
    alert("YOU MUST WRITE SOMETHING !!!");
  } else {
    value_list.innerHTML = value_input;
    div_input.appendChild(terminateButton);
    div_input.appendChild(value_list);
    div_input.appendChild(priority);
    div_input.appendChild(button);

    values_list.appendChild(div_input);

    listInput.push({
      name: value_input,
      id: time_div,
      priority: priorityButton.checked,
      finish: terminateButton.checked,
    });
    save_storage();
  }

  function delete_Div(element) {
    element.remove();
    listInput = listInput.filter((item) => item.id !== time_div);
    save_storage();
    console.log(listInput);
  }

  button.addEventListener("click", function () {
    delete_Div(div_input);
  });
}

function updateListInput(itemId, updates) {
  listInput.forEach((item, index, array) => {
    if (item.id === itemId) {
      array[index] = { ...item, ...updates };
    }
  });
  save_storage();
}

function save_storage() {
  let json_listInput = JSON.stringify(listInput);
  localStorage.setItem("array", json_listInput);
}

function recup_storage() {
  let storage = localStorage.getItem("array");
  let parseInput = JSON.parse(storage);
  if (parseInput && Array.isArray(parseInput)) {
    listInput = parseInput;
    console.log(listInput);
  } else {
    console.log(listInput);
  }
}
function refresh_all() {
  let button = document.createElement("button");
  document.querySelector("section").appendChild(button);
  button.type = "button";
  button.innerHTML = "DELETE ALL";
  button.addEventListener("click", function () {
    listInput = [];
    localStorage.removeItem("array");
    values_list.innerHTML = ""; 
  });
}

function recreate_list() {
  listInput.forEach((item) => {
    let div_input = document.createElement("div");
    div_input.setAttribute("id", item.id);
    
    let value_list = document.createElement("li");
    value_list.innerHTML = item.name;

    let priority = document.createElement("label");
    let priorityText = document.createTextNode("   Urgent ? ");
    let priorityButton = document.createElement("input");
    priorityButton.setAttribute("type", "checkbox");

    priorityButton.addEventListener("click", function () {
      if (priorityButton.checked) {
        value_list.classList.add("priority");
        priorityText = "   Urgent !!! ";
      } else {
        value_list.classList.remove("priority");
      }
      updateListInput(item.id, { priority: priorityButton.checked });
    });

    let terminateButton = document.createElement("input");
    terminateButton.type = "checkbox";
    terminateButton.setAttribute("class", "bullet");

    terminateButton.addEventListener("click", function () {
      if (terminateButton.checked) {
        value_list.classList.add("validate");
      } else {
        value_list.classList.remove("validate");
      }
      updateListInput(item.id, { finish: terminateButton.checked });
    });

    priorityButton.checked = item.priority;

    priority.appendChild(priorityText);
    priority.appendChild(priorityButton);

    let button = document.createElement("BUTTON");
    button.type = "button";
    button.innerHTML = "X";
    
    div_input.appendChild(terminateButton);
    div_input.appendChild(value_list);
    div_input.appendChild(priority);
    div_input.appendChild(button);

    values_list.appendChild(div_input);
    if (item.priority) {
      value_list.classList.add("priority");
    }

    if (item.finish) {
      value_list.classList.add("validate");
    }

    function delete_Div() {
      div_input.remove();
      listInput = listInput.filter((listItem) => listItem.id !== item.id);
      save_storage();
      console.log(listInput);
    }

    button.addEventListener("click", delete_Div);
  });
}

function select_urgency() {
  let new_ul = document.querySelector("ul"); 
  let new_div = document.querySelectorAll("div");

  new_div.forEach((element, index) => {
    if (listInput[index].priority === true) {
      new_ul.insertBefore(element, new_ul.firstChild);
    }
  });
}
create_titre();
create_to_list();
recup_storage();
recreate_list();
refresh_all();
line_finish ();
select_urgency ();





