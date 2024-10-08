/** Ключи для сохранения значений в localeStorage */
export const enum LsKeys {
  USERNAME = 'username',
  ACCESS_TOKEN = 'access_token',
  ACCESS_TOKEN_EXPIRED = 'access_token_expired',
  REFRESH_TOKEN = 'refresh_token',
  PASS_INTRO = 'pass_intro',
}

export const countries = [
  { id: 12, name: 'Аргентина' },
  { id: 2, name: 'Беларусь' },
  { id: 16, name: 'Бразилия' },
  { id: 8, name: 'Венесуэла' },
  { id: 3, name: 'Ирак' },
  { id: 4, name: 'Киргизия' },
  { id: 23, name: 'Китай' },
  { id: 11, name: 'Колумбия' },
  { id: 7, name: 'Коста-Рика' },
  { id: 6, name: 'Марокко' },
  { id: 9, name: 'Мексика' },
  { id: 13, name: 'Новая Зеландия' },
  { id: 15, name: 'Перу' },
  { id: 1, name: 'Российская Федерация' },
  { id: 17, name: 'Сальвадор' },
  { id: 18, name: 'Страны Азии' },
  { id: 19, name: 'Страны Арабского мира' },
  { id: 20, name: 'Страны Африки и Океании' },
  { id: 21, name: 'Страны Европы' },
  { id: 22, name: 'Страны Северной и Южной Америки' },
  { id: 5, name: 'Таджикистан' },
  { id: 10, name: 'Уругвай' },
  { id: 14, name: 'Чили' },
];

export const regions = [
  { id: 1, name: 'Алтайский край' },
  { id: 2, name: 'Амурская область' },
  { id: 4, name: 'Брянская область' },
  { id: 3, name: 'Владимирская область' },
  { id: 7, name: 'Воронежская область' },
  { id: 8, name: 'Забайкальский край' },
  { id: 5, name: 'Ивановская область' },
  { id: 9, name: 'Иркутская область' },
  { id: 10, name: 'Калининградская область' },
  { id: 6, name: 'Калужская область' },
  { id: 11, name: 'Камчатский край' },
  { id: 12, name: 'Кировская область' },
  { id: 13, name: 'Ленинградская область' },
  { id: 14, name: 'Липецкая область' },
  { id: 53, name: 'Луганская Народная Республика' },
  { id: 17, name: 'Московская область' },
  { id: 18, name: 'Ненецкий АО' },
  { id: 19, name: 'Нижегородская область' },
  { id: 20, name: 'Новгородская область' },
  { id: 21, name: 'Новосибирская область' },
  { id: 22, name: 'Омская область' },
  { id: 23, name: 'Оренбургская область' },
  { id: 24, name: 'Орловская область' },
  { id: 25, name: 'Пермский край' },
  { id: 26, name: 'Приморский край' },
  { id: 27, name: 'Республика Адыгея' },
  { id: 28, name: 'Республика Башкортостан' },
  { id: 29, name: 'Республика Кабардино-Балкария' },
  { id: 30, name: 'Республика Коми' },
  { id: 31, name: 'Республика Крым' },
  { id: 32, name: 'Республика Марий Эл' },
  { id: 33, name: 'Республика Мордовия' },
  { id: 34, name: 'Республика Татарстан' },
  { id: 35, name: 'Республика Тыва' },
  { id: 36, name: 'Республика Хакасия' },
  { id: 37, name: 'Ростовская область' },
  { id: 16, name: 'Рязанская область' },
  { id: 39, name: 'Самарская область' },
  { id: 40, name: 'Саратовская область' },
  { id: 41, name: 'Сахалинская область' },
  { id: 42, name: 'Свердловская область' },
  { id: 43, name: 'Ставрапольский край' },
  { id: 44, name: 'Тверская область' },
  { id: 45, name: 'Томская область' },
  { id: 46, name: 'Тульская область' },
  { id: 47, name: 'Тюменская область' },
  { id: 48, name: 'Удмуртская республика' },
  { id: 49, name: 'Ульяновская область' },
  { id: 50, name: 'Ханты-Мансийский АО - Югра' },
  { id: 51, name: 'Ямало-Ненецкий АО' },
  { id: 52, name: 'Ярославская область' },
  { id: 15, name: 'г.Москва' },
  { id: 38, name: 'г.Санкт-Петербург' },
];

export const getRegionByName = (name: string) => regions.find(region => region.name === name);
export const getCountryByName = (name: string) => countries.find(country => country.name === name);

export const roles = [
  { value: 'PARTICIPANT', label: 'Участник' },
  { value: 'SPECTATOR', label: 'Зритель' },
  { value: 'JUDGE', label: 'Эксперт' },
  { value: 'SPONSOR', label: 'Спонсор' },
];

export const competitionTypes = [
  { value: 'PREMIUM', label: 'Премия' },
  { value: 'VIDEO_CONTEST', label: 'Видео-конкурс' },
  { value: 'PROJECT', label: 'Проекты' },
  { value: 'CHILDREN', label: 'Дети' },
];

export const competitionDirections = [
  { value: '1', label: 'Брейкинг' },
  { value: '2', label: 'Воркаут' },
  { value: '3', label: 'Граффити' },
  { value: '4', label: 'Диджеинг' },
  { value: '5', label: 'Паркур' },
  { value: '6', label: 'Скейтбординг' },
  { value: '7', label: 'Трюковой самокат' },
  { value: '8', label: 'Трикинг' },
  { value: '9', label: 'Фриран' },
  { value: '10', label: 'Хип-хоп' },
];

export const getCompetitionTypeByKey = (key: string) => competitionTypes.find(d => d.value === key);
export const getActivityByName = (name: string) => competitionDirections.find(d => d.label === name);

export const gender = [
  { value: 'MALE', label: 'Мужской' },
  { value: 'FEMALE', label: 'Женский' },
];
