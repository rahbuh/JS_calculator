function getKeyInfo(e) {
  const key = document.querySelector(`.key[data-key="${e.key}"]`);
  if (key) {
    console.log(key);
  }
  const keys = document.querySelectorAll(".key");
  //   console.log(keys);
}

// keys.forEach(key => {
//   key.addEventListener("click", e => {
//     key.classList.add("key-clicked");
//   });
//   keys.forEach(key => key.addEventListener("transitionend", removeTransition));
// });

// window.addEventListener("keyup", e => {
//     const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
//   console.log(e.key);
// });

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("key-clicked");
}

window.addEventListener("keyup", getKeyInfo);
window.addEventListener("click", getKeyInfo);
