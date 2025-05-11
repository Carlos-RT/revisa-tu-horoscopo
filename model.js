// model.js

const API_URL = "https://horosco-api.vercel.app/horoscope/{SIGN}";

/**
 * Dado un string de fecha en formato DD-MM-AAAA,
 * devuelve el signo zodiacal correspondiente.
 */
export function getZodiacSign(dateStr) {
  const [day, month, year] = dateStr.split("-").map(Number);

  const signs = [
    { sign: "capricorn", from: "22-12", to: "19-01" },
    { sign: "aquarius", from: "20-01", to: "18-02" },
    { sign: "pisces", from: "19-02", to: "20-03" },
    { sign: "aries", from: "21-03", to: "19-04" },
    { sign: "taurus", from: "20-04", to: "20-05" },
    { sign: "gemini", from: "21-05", to: "20-06" },
    { sign: "cancer", from: "21-06", to: "22-07" },
    { sign: "leo", from: "23-07", to: "22-08" },
    { sign: "virgo", from: "23-08", to: "22-09" },
    { sign: "libra", from: "23-09", to: "22-10" },
    { sign: "scorpio", from: "23-10", to: "21-11" },
    { sign: "sagittarius", from: "22-11", to: "21-12" },
  ];

  const date = new Date(year, month - 1, day);

  for (let { sign, from, to } of signs) {
    const [fromDay, fromMonth] = from.split("-").map(Number);
    const [toDay, toMonth] = to.split("-").map(Number);

    const fromDate = new Date(year, fromMonth - 1, fromDay);
    const toDate = new Date(
      year + (fromMonth > toMonth ? 1 : 0),
      toMonth - 1,
      toDay
    );

    if (date >= fromDate && date <= toDate) {
      return sign;
    }
  }

  return null;
}

export async function fetchHoroscope(sign) {
  try {
    const response = await fetch(API_URL.replace("{SIGN}", sign), {
      method: "POST",
    });

    if (!response.ok) throw new Error("Error en la API");

    const data = await response.json();

    const emojis = {
      aries: "🐏", taurus: "🐂", gemini: "👯", cancer: "🦀",
      leo: "🦁", virgo: "👩", libra: "⚖️", scorpio: "🦂",
      sagittarius: "🏹", capricorn: "🐐", aquarius: "🏺", pisces: "🐟"
    };

    return `${data.description} ${emojis[sign]}`;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
