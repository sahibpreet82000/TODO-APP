showNotes();
//--------------------------------------------------for adding a note--------------------------------------------------
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  // notesObj.reverse();
  notesObj.forEach(function (element, index) {
    html += `
	   <div class="todo-box">
	   <div class="image-circle">
     <label>
     <input type="checkbox" name="circle" class= "box">
	   </div>
	   <p>${element}</p>
	    <span  id="${index}" onclick="deleting(this.id)" class="cross"></span>
	 </div>
	   `;
  });

  let noteElm = document.getElementById("todo-set");
  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = ``;
  }
  // ---------------------------------------------for item quantity set------------------------------------------------
  let noteEl = document.querySelector(".todo-manage p");

  noteEl.innerHTML = notesObj.length + " item(s) left";
  let itemLength = document.querySelectorAll(".image-circle input");
  let item = localStorage.getItem("item");
  if (item == null) {
    noteEl.innerHTML = notesObj.length + " item(s) left";
  } else {
    noteEl.innerHTML = JSON.parse(item);
  }

  itemLength.forEach((el) => {
    el.addEventListener("click", function (e) {
      if (e.target.checked) {
        noteEl.innerHTML = --notesObj.length + " item(s) left";
      } else {
        noteEl.innerHTML = ++notesObj.length + " item(s) left";
      }

      localStorage.setItem("item", JSON.stringify(noteEl.innerHTML));
    });
  });
  hover();
  select();
  boxChange();
  editNotes();
  checked();
}
//--------------------------------------------------for deleting a note--------------------------------------------------

function deleting(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
// --------------------------------------------------for Changing the text--------------------------------------------------
function editNotes() {
  let changeText = document.querySelectorAll(".todo-box");
  changeText.forEach((el) => {
    el.children[1].addEventListener("dblclick", function (e) {
      let noText = e.target.innerHTML;
      if (noText) {
        let html = e.target.innerHTML;
        e.target.innerHTML = `<textarea id ="textarea">${html}</textarea>`;
      }

      let textarea = document.querySelectorAll("#textarea");
      textarea.forEach((el) => {
        el.addEventListener("blur", function (e) {
          const updatedNotes = [];
          e.target.parentElement.innerHTML = el.value;
          const allTaskPara = document.querySelectorAll(".todo-box p");
          allTaskPara.forEach((task) => {
            updatedNotes.push(task.textContent);
          });

          localStorage.setItem("notes", JSON.stringify(updatedNotes));
        });
      });
    });
  });
}
// --------------------------------------------------for background and text change (switching light to dark)--------------------------------------------------

function change() {
  let set = document.querySelector(".img-light");
  let background = document.querySelector(".background-image");
  let footer = document.querySelector(".attribution");
  let body = document.getElementsByTagName("body")[0];
  let box = document.querySelector(".taskpane");
  let box2 = document.querySelectorAll(".todo-box");
  let box3 = document.querySelector(".todo-content");
  let text = document.querySelector(".task-text");
  let text2 = document.querySelectorAll(".todo-box p");
  // --------------------------------------------------for background and text change switching light --------------------------------------------------

  if (set.style.zIndex != -2) {
    set.style.zIndex = "-2";
    background.style.background =
      "url('/images/bg-desktop-light.jpg') no-repeat";
    body.style.background = "white";
    box.style.background = "white";
    box3.style.background = "white";
    footer.style.color = "black";
    text.style.color = "black";
  } else {
    set.style.zIndex = "2";
    background.style.background =
      "url('/images/bg-desktop-dark.jpg') no-repeat";
    body.style.background = "#171823";
    box.style.background = "#25273d";
    box3.style.background = "#25273d";
    footer.style.color = "white";
    text.style.color = "rgb(200, 203, 231)";
  }
  // --------------------------------------------------for background and text change (switching to dark)--------------------------------------------------

  let dark = document.querySelector(".img-dark");
  if (dark.style.zIndex != 2) {
    dark.style.zIndex = "2";
    box2.forEach((el) => {
      el.style.background = "white";
    });
    text2.forEach((el) => {
      el.style.color = "grey";
    });
  } else {
    dark.style.zIndex = "-2";
    box2.forEach((el) => {
      el.style.background = "#25273d";
    });
    text2.forEach((el) => {
      el.style.color = "#c8cbe7";
    });
  }
}
// --------------------------------------------------for background and text change (switching light to dark)--------------------------------------------------
function boxChange() {
  let box2 = document.querySelectorAll(".todo-box");
  let lineThrough = document.querySelectorAll(".line-through");
  let dark = document.querySelector(".img-dark");
  let text2 = document.querySelectorAll(".todo-box p");
  if (dark.style.zIndex != 2) {
    box2.forEach((el) => {
      el.style.background = "#25273d";
    });
    text2.forEach((el) => {
      el.style.color = "#c8cbe7";
    });
    lineThrough.forEach((el) => {
      el.style.color = "black";
    });
  } else {
    box2.forEach((el) => {
      el.style.background = "white";
    });
    text2.forEach((el) => {
      el.style.color = "grey";
    });
    lineThrough.forEach((el) => {
      el.style.color = "#4d5067";
    });
  }
}
//--------------------------------------------------for tick selection--------------------------------------------------

function select() {
  const imageCircles = document.querySelectorAll(".image-circle");
  imageCircles.forEach((el, i) => {
    el.children[0].addEventListener("click", function (e) {
      if (
        e.target.parentElement.parentElement.children[0].children[0].checked
      ) {
        e.target.parentElement.parentElement.parentElement.children[1].classList.add(
          "line-through"
        );
      } else {
        e.target.parentElement.parentElement.parentElement.children[1].classList.remove(
          "line-through"
        );
      }
    });
  });
}
//--------------------------------------------------for clear completed --------------------------------------------------
function removeItems(item) {
  item.remove();
}

function clearAll() {
  const imageCircles = document.querySelectorAll(".image-circle input");
  imageCircles.forEach((el, i) => {
    if (el.checked) {
      removeItems(el.parentElement.parentElement.parentElement);
      const updatedNotes = [];
      const allTaskPara = document.querySelectorAll(".todo-box p");
      allTaskPara.forEach((task) => {
        updatedNotes.push(task.textContent);
      });
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  });
}

//--------------------------------------------------for corss hover--------------------------------------------------
function hover() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.forEach(function () {
    document.querySelectorAll(".todo-box").forEach((el) => {
      el.addEventListener("mouseover", function (e) {
        if (e.target.children[2]) {
          e.target.children[2].style.display = "block";
        }
      });
    });
    document.querySelectorAll(".todo-box").forEach((el) => {
      el.addEventListener("mouseleave", function (e) {
        if (e.target.children[2]) {
          e.target.children[2].style.display = "none";
        }
      });
    });
  });
  localStorage.setItem("notes", JSON.stringify(notesObj));
}

//--------------------------------------------------for active task--------------------------------------------------
function active() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  const imageCircles = document.querySelectorAll(".image-circle");

  imageCircles.forEach((el) => {
    if (el.children[0].children[0].checked) {
      console.log(el.children[0].parentElement.parentElement);
      el.children[0].parentElement.parentElement.classList.toggle("none");
    }
  });
}
//--------------------------------------------------for complete task--------------------------------------------------

function complete() {}

//-------------------------------------------------------------------------------------------
// imageCircles.forEach((el) => {
//   if (el.children[0].classList.contains("hidden")) {
//     console.log(el.children[0].parentElement.parentElement);
//     el.children[0].parentElement.parentElement.classList.toggle("none");
//   }
//--------------------------------------------------for checking complete task--------------------------------------------------
function checked() {
  jQuery(($) => {
    var arr = JSON.parse(localStorage.getItem("checked")) || [];
    arr.forEach((c, i) => $(".box").eq(i).prop("checked", c));

    $(".box").click(() => {
      var arr = $(".box")
        .map((i, el) => el.checked)
        .get();
      localStorage.setItem("checked", JSON.stringify(arr));
    });
  });
}
//-----------------------------------------------for Drag & Drop---------------------------------------------------------
let todo = document.getElementById("todo-set");
Sortable.create(todo);
