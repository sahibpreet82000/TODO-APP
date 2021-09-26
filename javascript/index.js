showNotes();

/* debug changes
1) removed taskDone() event from image-circle
2) rewrite logic for showing and removing tick
3) logic to add completed task to local storage
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

  notesObj.forEach(function (element, index) {
    html += `
	   <div class="todo-box">
	   <div class="image-circle">
	     <img src="./images/icon-check.svg" alt="img" class="hidden"/>
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
  let noteEl = document.querySelector(".todo-manage p");
  noteEl.innerHTML = notesObj.length + " item(s) left";
  hover();
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
// --------------------------------------------------for background and text change (switching light to dark)--------------------------------------------------

function change() {
  // --------------------------------------------------for background and text change switching light --------------------------------------------------

  let set = document.querySelector(".img-light");
  let background = document.querySelector(".background-image");
  let body = document.getElementsByTagName("body")[0];
  let box = document.querySelector(".taskpane");
  let box2 = document.querySelectorAll(".todo-box");
  let box3 = document.querySelector(".todo-content");
  let text = document.querySelector(".task-text");
  let text2 = document.querySelectorAll(".todo-box p");
  let tickBg = document.querySelectorAll(".image-circle img");
  let lineThrough = document.querySelectorAll(".line-through");

  if (set.style.zIndex != -2) {
    set.style.zIndex = "-2";
    background.style.background =
      "url('/images/bg-desktop-light.jpg') no-repeat";
    body.style.background = "white";
    box.style.background = "white";
    box3.style.background = "white";
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
    lineThrough.forEach((el) => {
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
    lineThrough.forEach((el) => {
      el.style.color = "#4d5067";
    });
  }
}
//--------------------------------------------------for tick selection--------------------------------------------------

const imageCircles = document.querySelectorAll(".image-circle");
const completedTasks = [];

imageCircles.forEach((el, i) => {
  el.children[0].addEventListener("click", function (e) {
    // if (e.target.classList.contains('hidden')) {
    // 	const text = el.parentElement.children[1].innerText;44
    // 	completedTasks.push(text);
    // 	localStorage.setItem('completed', JSON.stringify(completedTasks));
    // }

    e.target.classList.toggle("hidden");
  });
});
imageCircles.forEach((el, i) => {
  el.children[0].addEventListener("click", function (e) {
    e.target.classList.toggle("hidden2");
  });
});
//--------------------------------------------------for paragraph toggle after tick selection--------------------------------------------------

imageCircles.forEach((el, i) => {
  el.children[0].addEventListener("click", function (e) {
    // console.log(e.target.parentElement.parentElement.children[1]);
    e.target.parentElement.parentElement.children[1].classList.toggle(
      "line-through"
    );
  });
});
3;
//--------------------------------------------------for clear all --------------------------------------------------

function clearAll() {
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
    if (el.children[0].classList.contains("hidden2")) {
      console.log(el.children[0].parentElement.parentElement);
      el.children[0].parentElement.parentElement.classList.toggle("none");
    }
  });
}
//--------------------------------------------------for complete task--------------------------------------------------

function complete() {
  let imageCircles = document.querySelectorAll(".image-circle");

  imageCircles.forEach((el) => {
    if (el.children[0].classList.contains("hidden")) {
      console.log(el.children[0].parentElement.parentElement);
      el.children[0].parentElement.parentElement.classList.toggle("none");
    }
  });
  this.addEventListener("mouseleave", function () {
    location.reload();
    // console.log(this.children);
  });
}
