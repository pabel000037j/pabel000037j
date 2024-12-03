/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOT_TOKEN: string
  readonly VITE_CHANNEL_ID: string
  readonly VITE_BOT_USERNAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}