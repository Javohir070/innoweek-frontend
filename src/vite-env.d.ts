/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_RECAPTCHA_SITE_KEY: string;
  readonly VITE_SKIP_RECAPTCHA?: string;
  readonly VITE_IXTIRO_API_URL?: string;
  readonly VITE_TIJORAT_API_URL?: string;
  readonly VITE_IXTIRO_SITE_URL?: string;
  readonly VITE_TIJORAT_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
