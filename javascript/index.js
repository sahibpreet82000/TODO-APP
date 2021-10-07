showNotes();

/* TO DO
1. double on a note to edit it and save it in the location of same previous local storage value.
2. see code from 92 to 123.
*/

/* 
	updated code from line 92 to 115 
	you can also check changes with git diff command
 */

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
  itemLength.forEach((el) => {
    el.addEventListener("click", function (e) {
      if (e.target.parentElement.parentElement.parentElement.children[1].classList.contains("line-through")) {
        noteEl.innerHTML = ++notesObj.length + " item(s) left";
      } else {
        noteEl.innerHTML = --notesObj.length + " item(s) left";
      }
      localStorage.setItem("item", JSON.stringify(noteEl.innerHTML));
    });
  });
  document.querySelector(".todo-manage p").innerHTML = JSON.parse(item);
  hover();
  select();
  boxChange();
  editNotes();
  checked();
}
//--------------------------------------------------for deletion a note--------------------------------------------------
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
      console.log(typeof e.target.innerHTML);
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
  let tickBg = document.querySelectorAll(".hidden2");
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
    tickBg.forEach((el) => {
      el.style.background =
        "linear-gradient(to right, rgb(129 0 248), #f89999)";
    });
  } else {
    set.style.zIndex = "2";
    background.style.background =
      "url('/images/bg-desktop-dark.jpg') no-repeat";
    body.style.background = "#171823";
    box.style.background = "#25273d";
    box3.style.background = "#25273d";
    footer.style.color = "white";
    text.style.color = "rgb(200, 203, 231)";
    tickBg.forEach((el) => {
      el.style.background = "linear-gradient(45deg, #de06bc, transparent)";
    });
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
//--------------------------------------------------for clear all --------------------------------------------------

function clearAll() {
  const imageCircles = document.querySelectorAll(".image-circle");
  var arr = JSON.parse(localStorage.getItem("checked"));
  // arr.splice("checked", "true");
  //--------------------------------------------------for paragraph toggle after tick selection--------------------------------------------------
  imageCircles.forEach((el, i) => {
    el.children[0].addEventListener("click", function (e) {
      if (e.target.classList.contains("box")) {
      }
    });
    localStorage.setItem("checked", JSON.stringify(arr));
  });
  localStorage.clear();
  location.reload();
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

// function completing() {
// let imageCircles = document.querySelectorAll(".image-circle");
// let completedTasks = localStorage.getItem("completed");
// completedTasks = JSON.parse(completedTasks);
// console.log(completedTasks);
// let notes = localStorage.getItem("notes");

// if (completedTasks) {
//   document.querySelector(".todo-box").innerHTML =
//     `
//   <p>${completedTasks}</p>
// `;

// localStorage.setItem("completed", JSON.stringify(completedTasks));
// }

//-------------------------------------------------------------------------------------------
// imageCircles.forEach((el) => {
//   if (el.children[0].classList.contains("hidden")) {
//     console.log(el.children[0].parentElement.parentElement);
//     el.children[0].parentElement.parentElement.classList.toggle("none");
//   }
//   else{
//     // location.reload();
//     el.children[0].parentElement.parentElement.style.display="flex";
//   }
// });
// this.addEventListener("mouseleave", function () {
//   location.reload();
//   // console.log(this.children);
// });
// }
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
