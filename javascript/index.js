function change() {
  let set = document.querySelector(".img-light");
  let background = document.querySelector(".background-image");
  let body = document.getElementsByTagName("body")[0];
  let box = document.querySelector(".taskpane");
  let box2 = document.querySelector(".todo-box");
  let box3 = document.querySelector(".todo-content");
  let text = document.querySelector(".task-text");
  let text2 = document.querySelector('.todo-box p');
  if (set.style.zIndex != -2) {
    set.style.zIndex = "-2";
    background.style.background =
      "url('/images/bg-desktop-light.jpg') no-repeat";
    body.style.background = "white";
    box.style.background = "white";
    box2.style.background = "white";
    box3.style.background = "white";
    text.style.color = "black";
    text2.style.color = "black";
  } else {
    set.style.zIndex = "2";
    background.style.background =
      "url('/images/bg-desktop-dark.jpg') no-repeat";
    body.style.background = "#171823";
    box.style.background = "#25273d";
    box2.style.background = "#25273d";
    box3.style.background = "#25273d";
    text.style.color = "white";
    text2.style.color = "#c8cbe7";

  }
  let dark = document.querySelector(".img-dark");
  if (dark.style.zIndex != 2) {
    dark.style.zIndex = "2";
  } else {
    dark.style.zIndex = "-2";
  }
}

document.querySelector(".todo-box").addEventListener("mouseover", function () {
  let hover = document.querySelector(".cross");

  hover.style.display = "block";
});

document.querySelector(".todo-box").addEventListener("mouseout", function () {
  let hover = document.querySelector(".cross");

  hover.style.display = "none";
});
