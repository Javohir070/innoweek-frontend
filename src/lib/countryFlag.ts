/**
 * Bayroqlar: API `country.flag` va `state_code` maydonlarini `null` qaytaradi,
 * shuning uchun bayroqni `country_id` bo'yicha aniqlaymiz — `id` tilga bog'liq
 * emas, `name` esa so'ralgan tilga qarab o'zgaradi.
 *
 * Quyidagi xarita API'ning o'z ma'lumotnomasidan
 * (`/api/v1.0/json/countries?lang=en`, 267 ta yozuv) to'liq generatsiya qilingan:
 * inglizcha nom → ISO 3166-1 alpha-2 kodi. Ro'yxatga kirmagan 35 ta yozuv —
 * tarixiy yoki davlat bo'lmagan birliklar (Soviet Union, Yugoslavia, Sabah,
 * "World", "Unspecified" va h.k.); ularda bayroq bo'lmaydi va `null` qaytadi.
 */
const COUNTRY_ISO: Record<number, string> = {
  1: "uz", // Uzbekistan
  2: "af", // Afghanistan
  3: "al", // Albania
  4: "dz", // Algeria
  5: "us", // United States of America
  6: "ad", // Andorra
  7: "ao", // Angola
  8: "ai", // Anguila
  9: "ag", // Antigua and Barbuda
  10: "ar", // Argentina
  11: "am", // Armenia
  12: "aw", // Aruba
  13: "au", // Australia
  14: "at", // Austria
  15: "az", // Azerbaijan
  16: "bs", // Bahamas, The
  17: "bh", // Bahrain
  18: "bd", // Bangladesh
  19: "bb", // Barbados
  20: "by", // Belarus
  21: "be", // Belgium
  23: "bz", // Belize
  24: "bj", // Benin
  25: "bm", // Bermuda
  26: "bt", // Bhutan
  27: "bo", // Bolivia
  28: "ba", // Bosnia and Herzegovina
  29: "bw", // Botswana
  31: "br", // Brazil
  32: "io", // British Indian Ocean Ter.
  33: "vg", // British Virgin Islands
  34: "bn", // Brunei
  35: "bg", // Bulgaria
  36: "bf", // Burkina Faso
  37: "bi", // Burundi
  38: "kh", // Cambodia
  39: "cm", // Cameroon
  40: "ca", // Canada
  41: "cv", // Cape Verde
  42: "ky", // Cayman Islands
  43: "cf", // Central African Republic
  44: "td", // Chad
  45: "cl", // Chile
  46: "cn", // China
  47: "cx", // Christmas Island
  48: "cc", // Cocos (Keeling) Islands
  49: "co", // Colombia
  50: "km", // Comoros
  51: "cd", // Congo, Dem. Rep.
  52: "cg", // Congo, Rep.
  53: "ck", // Cook Islands
  54: "cr", // Costa Rica
  55: "ci", // Cote d'Ivoire
  56: "hr", // Croatia
  57: "cu", // Cuba
  58: "cy", // Cyprus
  59: "cz", // Czech Republic
  61: "dk", // Denmark
  62: "dj", // Djibouti
  63: "dm", // Dominica
  64: "do", // Dominican Republic
  65: "tl", // East Timor
  66: "ec", // Ecuador
  67: "eg", // Egypt, Arab Rep.
  68: "sv", // El Salvador
  69: "gq", // Equatorial Guinea
  70: "er", // Eritrea
  71: "ee", // Estonia
  75: "fo", // Faeroe Islands
  76: "fk", // Falkland Island
  77: "fj", // Fiji
  78: "fi", // Finland
  85: "tf", // Fr. So. Ant. Tr
  86: "fr", // France
  88: "gf", // French Guiana
  89: "pf", // French Polynesia
  90: "ga", // Gabon
  91: "gm", // Gambia, The
  92: "ps", // Gaza Strip
  93: "ge", // Georgia
  95: "de", // Germany
  96: "gh", // Ghana
  97: "gi", // Gibraltar
  98: "gr", // Greece
  99: "gl", // Greenland
  100: "gd", // Grenada
  101: "gp", // Guadeloupe
  102: "gu", // Guam
  103: "gt", // Guatemala
  104: "gn", // Guinea
  105: "gw", // Guinea-Bissau
  106: "gy", // Guyana
  107: "ht", // Haiti
  108: "va", // Holy See
  109: "hn", // Honduras
  110: "hk", // Hong Kong, China
  111: "hu", // Hungary
  112: "is", // Iceland
  113: "in", // India
  114: "id", // Indonesia
  115: "ir", // Iran, Islamic Rep.
  116: "iq", // Iraq
  117: "ie", // Ireland
  118: "il", // Israel
  119: "it", // Italy
  120: "jm", // Jamaica
  121: "jp", // Japan
  123: "jo", // Jordan
  124: "kz", // Kazakhstan
  125: "ke", // Kenya
  126: "ki", // Kiribati
  127: "kp", // Korea, Dem. Rep.
  128: "kr", // Korea, Rep.
  129: "kw", // Kuwait
  130: "kg", // Kyrgyz Republic
  131: "la", // Lao PDR
  132: "lv", // Latvia
  133: "lb", // Lebanon
  134: "ls", // Lesotho
  135: "lr", // Liberia
  136: "ly", // Libya
  137: "li", // Liechtenstein
  138: "lt", // Lithuania
  139: "lu", // Luxembourg
  140: "mo", // Macao
  141: "mk", // Macedonia, FYR
  142: "mg", // Madagascar
  143: "mw", // Malawi
  144: "my", // Malaysia
  145: "mv", // Maldives
  146: "ml", // Mali
  147: "mt", // Malta
  148: "mh", // Marshall Islands
  149: "mq", // Martinique
  150: "mr", // Mauritania
  151: "mu", // Mauritius
  152: "mx", // Mexico
  153: "fm", // Micronesia, Fed. Sts.
  155: "md", // Moldova
  156: "mc", // Monaco
  157: "mn", // Mongolia
  158: "ms", // Montserrat
  159: "ma", // Morocco
  160: "mz", // Mozambique
  161: "mm", // Myanmar
  162: "na", // Namibia
  163: "nr", // Nauru
  164: "np", // Nepal
  165: "nl", // Netherlands
  168: "nc", // New Caledonia
  169: "nz", // New Zealand
  170: "ni", // Nicaragua
  171: "ne", // Niger
  172: "ng", // Nigeria
  173: "nu", // Niue
  174: "nf", // Norfolk Island
  175: "mp", // Northern Mariana Islands
  176: "no", // Norway
  177: "om", // Oman
  179: "pk", // Pakistan
  180: "pw", // Palau
  181: "pa", // Panama
  182: "pg", // Papua New Guinea
  183: "py", // Paraguay
  185: "pe", // Peru
  186: "ph", // Philippines
  187: "pn", // Pitcairn
  188: "pl", // Poland
  189: "pt", // Portugal
  190: "pr", // Puerto Rico
  191: "qa", // Qatar
  192: "re", // Reunion
  193: "ro", // Romania
  194: "ru", // Russian Federation
  195: "rw", // Rwanda
  198: "sh", // Saint Helena
  200: "pm", // Saint Pierre and Miquelon
  201: "ws", // Samoa
  202: "sm", // San Marino
  203: "st", // Sao Tome and Principe
  205: "sa", // Saudi Arabia
  206: "sn", // Senegal
  207: "sc", // Seychelles
  208: "sl", // Sierra Leone
  210: "sg", // Singapore
  211: "sk", // Slovak Republic
  212: "si", // Slovenia
  213: "sb", // Solomon Islands
  214: "so", // Somalia
  215: "za", // South Africa
  217: "es", // Spain
  219: "lk", // Sri Lanka
  220: "kn", // St. Kitts and Nevis
  221: "lc", // St. Lucia
  222: "vc", // St. Vincent and the Grenadines
  223: "sd", // Sudan
  224: "sr", // Suriname
  225: "sj", // Svalbard and Jan Mayen Is
  226: "sz", // Swaziland
  227: "se", // Sweden
  228: "ch", // Switzerland
  229: "sy", // Syrian Arab Republic
  230: "tw", // Taiwan
  231: "tj", // Tajikistan
  232: "tz", // Tanzania
  233: "th", // Thailand
  234: "tg", // Togo
  235: "tk", // Tokelau
  236: "to", // Tonga
  237: "tt", // Trinidad and Tobago
  238: "tn", // Tunisia
  239: "tr", // Turkey
  240: "tm", // Turkmenistan
  241: "tc", // Turks and Caicos Isl.
  242: "tv", // Tuvalu
  243: "ug", // Uganda
  244: "ua", // Ukraine
  245: "ae", // United Arab Emirates
  246: "gb", // United Kingdom
  247: "us", // United States
  249: "uy", // Uruguay
  252: "vu", // Vanuatu
  253: "ve", // Venezuela
  254: "vn", // Vietnam
  255: "vi", // Virgin Islands (U.S.)
  257: "wf", // Wallis and Futura Isl.
  258: "eh", // Western Sahara
  261: "ye", // Yemen, Rep.
  264: "zm", // Zambia
  265: "zw", // Zimbabwe
  266: "mn", // Mongolia
  267: "gb", // United Kingdom
};

/** Bayroq rasmining kengligi (px) — flagcdn qo'llab-quvvatlaydigan o'lchamlar */
const FLAG_WIDTH = 80;

/**
 * Bayroq rasmi manzili. Noma'lum davlat uchun `null` — chaqiruvchi shunda
 * bayroqni umuman ko'rsatmaydi (karta buzilmaydi).
 */
export function flagUrl(countryId?: number | null): string | null {
  if (countryId == null) return null;
  const iso = COUNTRY_ISO[countryId];
  return iso ? `https://flagcdn.com/w${FLAG_WIDTH}/${iso}.png` : null;
}
