const container = document.getElementById("quote-container");
const button = document.getElementById("consultar");

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

export function renderHoroscope({ horoscope, emoji }) {
  container.innerHTML = `<p>${emoji} ${horoscope}</p>`;
  container.classList.remove("fade-out");
  container.classList.add("visible");
}

export function renderError(message) {
  container.textContent = message;
  container.classList.add("visible");
}

export function fadeOut() {
  container.classList.add("fade-out");
}
