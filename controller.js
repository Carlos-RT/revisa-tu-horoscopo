// controller.js
import { getZodiacSign, fetchHoroscope } from "./model.js";
import {
  disableButton,
  enableButton,
  clearView,
  renderHoroscope,
  renderError,
  fadeOut,
  isValidDateFormat,
  onDateInput,
  onConsultClick,
  getInputDate,
} from "./view.js";

let fadeTimeout;
let clearTimeoutID;

function handleInput() {
  const value = getInputDate();
  if (isValidDateFormat(value)) {
    enableButton();
  } else {
    disableButton();
  }
}

async function handleConsult() {
  disableButton();
  clearTimeout(fadeTimeout);
  clearTimeout(clearTimeoutID);
  clearView();

  const birthdate = getInputDate();
  const zodiacSign = getZodiacSign(birthdate);

  if (!zodiacSign) {
    renderError("No se pudo determinar el signo zodiacal.");
    enableButton();
    return;
  }

  const message = await fetchHoroscope(zodiacSign);
  if (!message) {
    renderError("No se pudo obtener el horóscopo.");
    enableButton();
    return;
  }

  renderHoroscope(message);

  // Fade-out después de 15s
  fadeTimeout = setTimeout(fadeOut, 15000);
  // Limpiar vista y reactivar botón después de fade
  clearTimeoutID = setTimeout(() => {
    clearView();
    enableButton();
  }, 16000);
}

onDateInput(handleInput);
onConsultClick(handleConsult);