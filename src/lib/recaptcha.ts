/** .env dan site key (bo'shliq/enter yo'q). Faqat SITE key, secret emas. */
export function getRecaptchaSiteKey(): string {
  return (import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "").trim();
}

export function isRecaptchaEnabled(): boolean {
  if (import.meta.env.VITE_SKIP_RECAPTCHA === "true") return false;
  return getRecaptchaSiteKey().length > 0;
}
