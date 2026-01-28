/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CREDIT_ENGINE_ADDRESS: string
  readonly VITE_MOCK_LENDER_ADDRESS: string
  readonly VITE_NETWORK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
