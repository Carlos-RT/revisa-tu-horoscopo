// view.js
const container = document.getElementById("quote-container");
const button = document.getElementById("get-quote");
const input = document.getElementById("birthdate");

export function disableButton() {
  button.disabled = true;
}

export function enableButton() {
  button.disabled = false;
}

export function clearView() {
  container.innerHTML = "";
  container.classList.remove("visible", "fade-out");
}

export function renderHoroscope(message) {
  container.textContent = message;
  container.classList.remove("fade-out");
  container.classList.add("visible");
}

export function renderError(msg = "Error al obtener el horóscopo.") {
  container.textContent = msg;
  container.classList.add("visible");
}

export function fadeOut() {
  container.classList.add("fade-out");
}

export function isValidDateFormat(dateStr) {
  return /^\d{2}-\d{2}-\d{4}$/.test(dateStr);
}

export function onDateInput(callback) {
  input.addEventListener("input", callback);
}

export function onConsultClick(callback) {
  button.addEventListener("click", callback);
}

export function getInputDate() {
  return input.value;
}
