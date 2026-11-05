const dashBtn = document.querySelector(".dashboardBtn");
const anaBtn = document.querySelector(".analyticsBtn");
const repBtn = document.querySelector(".reportsBtn");
const setBtn = document.querySelector(".settingsBtn");

const buttons = [dashBtn, anaBtn, repBtn, setBtn];

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("activeBtn"));
    btn.classList.add("activeBtn");
  });
});
