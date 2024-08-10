#!/usr/bin/env sh
source .env

echo $VITE_HOST_USER
echo $VITE_HOST_PASSWORD
echo $VITE_HOST

token="$(echo -n 'admin:P@$$w0rd' | base64)"
openapiPath=./openapi.json

curl -k -H "Authorization: Basic $token" "$VITE_HOST/v3/api-docs" -o $openapiPath

sed -i -e 's/"Посты пользователей"/"POSTS"/g' \
       -e 's/"Географические локации"/"LOCATIONS"/g' \
       -e 's/"Мероприятия"/"EVENTS"/g' \
       -e 's/"Пользователи"/"USERS"/g' $openapiPath

npx @rtk-query/codegen-openapi ./scripts/openapi-config.cjs
