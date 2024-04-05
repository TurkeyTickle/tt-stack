/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXAMPLE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
