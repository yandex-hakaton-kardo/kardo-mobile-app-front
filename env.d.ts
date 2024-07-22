interface ImportMetaEnv {
  /** Порт, на котором запускается фронт */
  readonly FRONT_PORT?: string;
  /** Адрес сервера к которому выполнять запросы */
  readonly FRONT_HOST?: string;
}

interface ImportMeta {
  readonly env?: ImportMetaEnv;
}
