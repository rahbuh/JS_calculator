(function() {
  const calculator = [
    {
      classInfo: "key single dark memory",
      dataKeyInfo: "mem-clear",
      text: "MC"
    },
    {
      classInfo: "key single dark memory",
      dataKeyInfo: "mem-recall",
      text: "MR"
    },
    {
      classInfo: "key single dark memory",
      dataKeyInfo: "mem-plus",
      text: "M+"
    },
    {
      classInfo: "key single dark memory",
      dataKeyInfo: "mem-minus",
      text: "M-"
    },
    { classInfo: "key single white number", dataKeyInfo: "7", text: "7" },
    { classInfo: "key single white number", dataKeyInfo: "8", text: "8" },
    { classInfo: "key single white number", dataKeyInfo: "9", text: "9" },
    { classInfo: "key single gray operator", dataKeyInfo: "/", text: "/" },
    { classInfo: "key single white number", dataKeyInfo: "4", text: "4" },
    { classInfo: "key single white number", dataKeyInfo: "5", text: "5" },
    { classInfo: "key single white number", dataKeyInfo: "6", text: "6" },
    { classInfo: "key single gray operator", dataKeyInfo: "*", text: "*" },
    { classInfo: "key single white number", dataKeyInfo: "1", text: "1" },
    { classInfo: "key single white number", dataKeyInfo: "2", text: "2" },
    { classInfo: "key single white number", dataKeyInfo: "3", text: "3" },
    { classInfo: "key single gray operator", dataKeyInfo: "+", text: "+" },
    {
      classInfo: "key single white action",
      dataKeyInfo: "negate",
      text: "+/-"
    },
    { classInfo: "key single white number", dataKeyInfo: "0", text: "0" },
    { classInfo: "key single white number", dataKeyInfo: ".", text: "." },
    { classInfo: "key single gray operator", dataKeyInfo: "-", text: "-" },
    { classInfo: "key single white action", dataKeyInfo: "Delete", text: "C" },
    {
      classInfo: "key single white action",
      dataKeyInfo: "Backspace",
      text: "back"
    },
    { classInfo: "key double gray operator", dataKeyInfo: "Enter", text: "=" }
  ];

  const wrapper = document.getElementById("key-wrapper");

  for (const btn of calculator) {
    const divEl = document.createElement("div");
    divEl.classList = btn.classInfo;
    divEl.setAttribute("data-key", btn.dataKeyInfo);
    divEl.textContent = btn.text;
    wrapper.appendChild(divEl);
  }
})();
