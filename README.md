## Описание

Фронтенд часть для [kargo-mobile-app](https://github.com/yandex-hakaton-kardo/kardo-mobile-app)

## Запуск

### Через NodeJS и npm

1. Установить [NodeJS 20+](https://nodejs.org/en)
2. Поставить зависимости командой `npm i`
3. Запустить dev-server командой `npm run start`
4. Приложение можно открыть по адресу http://localhost:3000

### Через Docker Compose

1. Установить [Docker](https://docs.docker.com/get-docker/)
2. Запустить контейнер

```shell
docker-compose up
```

4. Приложение можно открыть по адресу http://localhost:3000

## Доступные команды

- `npm i` - установка зависимостей
- `npm run start` - запуск dev-сервера
- `npm run build` - сборка проекта
- `npm run build:dev` - сборка dev-версии проекта, код не минифицируется
- `npm run preview` - запуск сервера с production версией
- `npm run typecheck` - проверка типизации в проекте
- `npm run lint` - проверка кода линтерами eslint, stylelint
- `npm run lint:fix` - проверка и автоисправление кода линтерами eslint, stylelint
- `npm run format` - проверка форматирования кода
- `npm run format:fix` - автоисправление форматирования кода
- `npm run generate:icons` - автоматическая генерация реакт-компонентов из svg-иконок в `src/components/icons`
