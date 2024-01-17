/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXAMPLE_API_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
