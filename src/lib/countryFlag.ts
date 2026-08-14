/**
 * API bayroq qaytarmaydi (`country.flag` va `state_code` — null), shuning uchun
 * bayroqni `country.id` bo'yicha aniqlaymiz. `id` tilga bog'liq emas, `name` esa
 * so'ralgan tilga qarab o'zgaradi — shuning uchun nom emas, id bo'yicha.
 *
 * Yangi davlat qo'shilsa — bu yerga bitta qator: `<country_id>: "<ISO-3166-1 alpha-2>"`.
 */
const COUNTRY_ISO: Record<number, string> = {
  1: "uz", // O'zbekiston
  21: "be", // Belgiya
  86: "fr", // Fransiya
  114: "id", // Indoneziya
  119: "it", // Italiya
  121: "jp", // Yaponiya
  124: "kz", // Qozog'iston
  128: "kr", // Koreya, Rep.
  188: "pl", // Polsha
  217: "es", // Ispaniya
  267: "gb", // Buyuk Britaniya
};

/**
 * Bayroq rasmi manzili. Noma'lum davlat uchun `null` — chaqiruvchi shunda
 * bayroqni umuman ko'rsatmaydi (karta buzilmaydi).
 */
export function flagUrl(countryId?: number | null): string | null {
  if (countryId == null) return null;
  const iso = COUNTRY_ISO[countryId];
  return iso ? `https://flagcdn.com/w80/${iso}.png` : null;
}
