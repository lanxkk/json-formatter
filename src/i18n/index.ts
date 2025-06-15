export const languages = {
  'zh-cn': '简体中文',
  'en': 'English',
  'ja': '日本語',
  'zh-tw': '繁體中文'
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export function getLanguageFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

export function getTranslatedUrl(currentUrl: URL, targetLang: Language): string {
  const currentLang = getLanguageFromUrl(currentUrl);
  const path = currentUrl.pathname.replace(`/${currentLang}`, '');
  return targetLang === defaultLang ? path || '/' : `/${targetLang}${path || '/'}`;
} 