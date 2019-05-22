function keyAction(e) {
  const key = document.querySelector(`.key[data-key="${e.key}"]`);
  if (key) {
    key.classList.add("key-clicked");
    key.addEventListener("transitionend", removeTransition);
  }
}

function clickAction(e) {
  e.target.classList.add("key-clicked");
  e.target.addEventListener("transitionend", removeTransition);
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("key-clicked");
}

window.addEventListener("keyup", keyAction);
window.addEventListener("click", clickAction);
