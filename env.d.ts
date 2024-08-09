interface ImportMetaEnv {
  /** Порт, на котором запускается фронт */
  readonly VITE_PORT?: string;
  /** Адрес сервера к которому выполнять запросы */
  readonly VITE_HOST?: string;
}

interface ImportMeta {
  readonly env?: ImportMetaEnv;
}

declare namespace NodeJS {
  interface Process {
    readonly env?: ProcessEnv & ImportMetaEnv;
  }
}
