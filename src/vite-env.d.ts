/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_RECAPTCHA_SITE_KEY: string;
  readonly VITE_SKIP_RECAPTCHA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
