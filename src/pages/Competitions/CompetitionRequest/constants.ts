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

export const direction = [
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

export const getActivityByName = (name: string) => direction.find(d => d.label === name);

export const gender = [
  { value: 'MALE', label: 'Мужской' },
  { value: 'FEMALE', label: 'Женский' },
];
