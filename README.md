## Описание

Фронтенд часть для [kargo-mobile-app](https://github.com/yandex-hakaton-kardo/kardo-mobile-app)

![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=plastic) ![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=plastic) ![Redux Badge](https://img.shields.io/badge/RTK%20query-764ABC?logo=redux&logoColor=fff&style=plastic) ![React Router Badge](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=plastic) ![Sass Badge](https://img.shields.io/badge/Sass-C69?logo=sass&logoColor=fff&style=plastic) ![CSS Modules Badge](https://img.shields.io/badge/CSS%20Modules-000?logo=cssmodules&logoColor=fff&style=plastic) ![React Hook Form Badge](https://img.shields.io/badge/React%20Hook%20Form-EC5990?logo=reacthookform&logoColor=fff&style=plastic) ![Zod Badge](https://img.shields.io/badge/Zod-000?logo=zod&logoColor=fff&style=plastic)
![Docker Badge](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff&style=plastic) ![NGINX Badge](https://img.shields.io/badge/NGINX-009639?logo=nginx&logoColor=fff&style=plastic) ![Vite Badge](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=plastic) ![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=fff&style=plastic) ![DotEnv Badge](https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=fff&style=plastic) ![Git Badge](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff&style=plastic) ![ESLint Badge](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=plastic) ![stylelint Badge](https://img.shields.io/badge/stylelint-263238?logo=stylelint&logoColor=fff&style=plastic) ![Prettier Badge](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=plastic)

## Сборка приложения

1. Установить [NodeJS 20+](https://nodejs.org/en)
2. Поставить зависимости командой `npm i`
3. Запустить сборку командой `npm run build`

После сборки билд будет лежать в `./dist`

## Запуск devServer с фронтендом

Перед запуском необходимо создать файл `.env` в корне репозитория (пример в `.env.example`), где указать адрес сервера с бэкендом

### Через NodeJS и npm

1. Установить [NodeJS 20+](https://nodejs.org/en)
2. Поставить зависимости командой `npm i`
3. Запустить dev-server командой `npm run start`
4. Приложение можно открыть по адресу http://localhost:3000

### Через Docker Compose

1. Установить и запустить [Docker](https://docs.docker.com/get-docker/)
2. Запустить контейнер

```shell
docker-compose up
```

4. Приложение можно открыть по адресу http://localhost:3000

## Запуск всего приложения

1. Установить и запустить [Docker](https://docs.docker.com/get-docker/)
2. Выполнить команду в bash-терминале.

```bash
curl -sSL https://gist.githubusercontent.com/AVor0n/2a3053bbe206abe499741ee49c67e90d/raw/run.sh | bash
```

Данная команда скачает `docker-compose.yml` и `nginx.conf` после чего запустит 4 докер-контейнера

3. Приложение будет доступно по адресу http://localhost

## Доступные команды

- `npm i` - установка зависимостей
- `npm run start` - запуск dev-сервера
- `npm run preview` - запуск dev-сервера с production версией
- `npm run build` - сборка проекта
- `npm run build:dev` - сборка dev-версии проекта, код не минифицируется
- `npm run storybook` - запуск devServer со storybook
- `npm run build-storybook` - сборка storybook

- `npm run typecheck` - проверка типизации в проекте
- `npm run lint` - проверка кода линтерами eslint, stylelint
- `npm run lint:fix` - проверка и автоисправление кода линтерами eslint, stylelint
- `npm run format` - проверка форматирования кода
- `npm run format:fix` - автоисправление форматирования кода
- `npm run generate:icons` - генерация интерфейсов и хуков для выполнения выполнения запросов на бэк
- `npm run generate:icons` - генерация реакт-компонентов из svg-иконок в `src/components/icons`
