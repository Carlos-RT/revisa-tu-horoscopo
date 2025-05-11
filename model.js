const API_URL = "https://aztro.sameerkumar.website/";
const CORS_PROXY = "https://corsproxy.io/?";

export async function fetchHoroscope(sign) {
  try {
    const url = `${CORS_PROXY}${API_URL}?sign=${sign}&day=today`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();

    const emojiMap = {
      aries: "♈️", taurus: "♉️", gemini: "♊️", cancer: "♋️",
      leo: "♌️", virgo: "♍️", libra: "♎️", scorpio: "♏️",
      sagittarius: "♐️", capricorn: "♑️", aquarius: "♒️", pisces: "♓️",
    };

    return {
      horoscope: data.description,
      emoji: emojiMap[sign] || "🔮",
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
