import { Locales } from "./i18n";

import es from "./es.json";
import en from "./en.json";

export const messages = {
  [Locales.ES]: es,
  [Locales.EN]: en,
};

export const defaultLocale = Locales.ES;