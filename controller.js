import { fetchHoroscope } from "./model.js";
import {
  disableButton,
  enableButton,
  clearView,
  renderHoroscope,
  renderError,
  fadeOut,
} from "./view.js";

function getSignFromDate(dateStr) {
  const [day, month] = dateStr.split("-").map(Number);
  const zodiac = [
    { sign: "capricorn", from: [12, 22], to: [1, 19] },
    { sign: "aquarius", from: [1, 20], to: [2, 18] },
    { sign: "pisces", from: [2, 19], to: [3, 20] },
    { sign: "aries", from: [3, 21], to: [4, 19] },
    { sign: "taurus", from: [4, 20], to: [5, 20] },
    { sign: "gemini", from: [5, 21], to: [6, 20] },
    { sign: "cancer", from: [6, 21], to: [7, 22] },
    { sign: "leo", from: [7, 23], to: [8, 22] },
    { sign: "virgo", from: [8, 23], to: [9, 22] },
    { sign: "libra", from: [9, 23], to: [10, 22] },
    { sign: "scorpio", from: [10, 23], to: [11, 21] },
    { sign: "sagittarius", from: [11, 22], to: [12, 21] },
  ];
  for (let { sign, from, to } of zodiac) {
    if (
      (month === from[0] && day >= from[1]) ||
      (month === to[0] && day <= to[1])
    ) {
      return sign;
    }
  }
  return "capricorn";
}

document.getElementById("birthdate").addEventListener("input", (e) => {
  const value = e.target.value.trim();
  const valid = /^\d{2}-\d{2}-\d{4}$/.test(value);
  document.getElementById("consultar").disabled = !valid;
});

document.getElementById("consultar").addEventListener("click", async () => {
  const date = document.getElementById("birthdate").value.trim();
  const sign = getSignFromDate(date);

  disableButton();
  clearView();

  const data = await fetchHoroscope(sign);
  if (!data) {
    renderError("Error al obtener el horóscopo.");
    enableButton();
    return;
  }

  renderHoroscope(data);

  setTimeout(() => {
    fadeOut();
    setTimeout(() => {
      clearView();
      enableButton();
    }, 1000);
  }, 15000);
});
