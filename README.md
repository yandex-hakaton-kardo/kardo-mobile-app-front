## Описание

Фронтенд часть для [kargo-mobile-app](https://github.com/yandex-hakaton-kardo/kardo-mobile-app)

## Запуск

### Через NodeJS и pnpm

1. Установить [NodeJS 20+](https://nodejs.org/en)
2. Установить [pnpm](https://pnpm.io/installation#using-npm)

```shell
npm install -g pnpm
```

3. Поставить зависимости командой `pnpm i`
4. Запустить dev-server командой `pnpm dev`
5. Приложение можно открыть по адресу http://localhost:3000

### Через Docker Compose

1. Установить [Docker](https://docs.docker.com/get-docker/)
2. Запустить контейнер

```shell
docker-compose up
```

4. Приложение можно открыть по адресу http://localhost:3000

## Доступные команды

- `pnpm i` - установка зависимостей
- `pnpm dev` - запуск dev-сервера
- `pnpm build` - сборка проекта
- `pnpm build:dev` - сборка dev-версии проекта, код не минифицируется
- `pnpm preview` - запуск сервера с production версией
- `pnpm typecheck` - проверка типизации в проекте
- `pnpm lint` - проверка кода линтерами eslint, stylelint
- `pnpm lint:fix` - проверка и автоисправление кода линтерами eslint, stylelint
- `pnpm format` - проверка форматирования кода
- `pnpm format:fix` - автоисправление форматирования кода
