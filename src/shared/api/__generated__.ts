import { api } from './api';

export const addTagTypes = [
  'USERS',
  'POSTS',
  'participation-admin-controller',
  'participation-controller',
  'EVENTS',
  'LOCATIONS',
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      addFriend: build.mutation<AddFriendApiResponse, AddFriendApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}/friends/${queryArg.friendId}`, method: 'PUT' }),
        invalidatesTags: ['USERS'],
      }),
      deleteFriend: build.mutation<DeleteFriendApiResponse, DeleteFriendApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}/friends/${queryArg.friendId}`, method: 'DELETE' }),
        invalidatesTags: ['USERS'],
      }),
      addLikeToPost: build.mutation<AddLikeToPostApiResponse, AddLikeToPostApiArg>({
        query: queryArg => ({ url: `/posts/${queryArg.postId}/like`, method: 'PUT' }),
        invalidatesTags: ['POSTS'],
      }),
      changeParticipationStatus: build.mutation<ChangeParticipationStatusApiResponse, ChangeParticipationStatusApiArg>({
        query: queryArg => ({
          url: `/admin/participations/${queryArg.participationId}/status`,
          method: 'PUT',
          params: { status: queryArg.status },
        }),
        invalidatesTags: ['participation-admin-controller'],
      }),
      getUserProfilePicture: build.query<GetUserProfilePictureApiResponse, GetUserProfilePictureApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}/avatar` }),
        providesTags: ['USERS'],
      }),
      uploadProfilePicture: build.mutation<UploadProfilePictureApiResponse, UploadProfilePictureApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}/avatar`, method: 'POST', body: queryArg.body }),
        invalidatesTags: ['USERS'],
      }),
      deleteProfilePicture: build.mutation<DeleteProfilePictureApiResponse, DeleteProfilePictureApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}/avatar`, method: 'DELETE' }),
        invalidatesTags: ['USERS'],
      }),
      createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
        query: queryArg => ({ url: `/users/register`, method: 'POST', body: queryArg.newUserRequest }),
        invalidatesTags: ['USERS'],
      }),
      getAllPostByUser: build.query<GetAllPostByUserApiResponse, GetAllPostByUserApiArg>({
        query: queryArg => ({ url: `/posts`, params: { userId: queryArg.userId } }),
        providesTags: ['POSTS'],
      }),
      createPost: build.mutation<CreatePostApiResponse, CreatePostApiArg>({
        query: queryArg => ({
          url: `/posts`,
          method: 'POST',
          body: queryArg.body,
          params: { content: queryArg.content },
        }),
        invalidatesTags: ['POSTS'],
      }),
      addCommentToPost: build.mutation<AddCommentToPostApiResponse, AddCommentToPostApiArg>({
        query: queryArg => ({
          url: `/posts/${queryArg.postId}/comment`,
          method: 'POST',
          body: queryArg.commentRequest,
        }),
        invalidatesTags: ['POSTS'],
      }),
      rateParticipation: build.mutation<RateParticipationApiResponse, RateParticipationApiArg>({
        query: queryArg => ({
          url: `/participations/${queryArg.participationId}/score`,
          method: 'POST',
          body: queryArg.newScoreRequest,
        }),
        invalidatesTags: ['participation-controller'],
      }),
      addParticipation: build.mutation<AddParticipationApiResponse, AddParticipationApiArg>({
        query: queryArg => ({
          url: `/events/${queryArg.eventId}/participation/${queryArg.userId}`,
          method: 'POST',
          body: queryArg.participationRequest,
        }),
        invalidatesTags: ['EVENTS'],
      }),
      createEvent: build.mutation<CreateEventApiResponse, CreateEventApiArg>({
        query: queryArg => ({ url: `/admin/events`, method: 'POST', body: queryArg.newEventRequest }),
        invalidatesTags: ['EVENTS'],
      }),
      createSubEvent: build.mutation<CreateSubEventApiResponse, CreateSubEventApiArg>({
        query: queryArg => ({
          url: `/admin/events/${queryArg.masterEventId}`,
          method: 'POST',
          body: queryArg.newSubEventRequest,
        }),
        invalidatesTags: ['EVENTS'],
      }),
      findUserById: build.query<FindUserByIdApiResponse, FindUserByIdApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}` }),
        providesTags: ['USERS'],
      }),
      deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}`, method: 'DELETE' }),
        invalidatesTags: ['USERS'],
      }),
      updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}`, method: 'PATCH', body: queryArg.userUpdateRequest }),
        invalidatesTags: ['USERS'],
      }),
      getPostById: build.query<GetPostByIdApiResponse, GetPostByIdApiArg>({
        query: queryArg => ({ url: `/posts/${queryArg.postId}` }),
        providesTags: ['POSTS'],
      }),
      deletePost: build.mutation<DeletePostApiResponse, DeletePostApiArg>({
        query: queryArg => ({ url: `/posts/${queryArg.postId}`, method: 'DELETE' }),
        invalidatesTags: ['POSTS'],
      }),
      updatePost: build.mutation<UpdatePostApiResponse, UpdatePostApiArg>({
        query: queryArg => ({
          url: `/posts/${queryArg.postId}`,
          method: 'PATCH',
          body: queryArg.body,
          params: { content: queryArg.content },
        }),
        invalidatesTags: ['POSTS'],
      }),
      deleteComment: build.mutation<DeleteCommentApiResponse, DeleteCommentApiArg>({
        query: queryArg => ({ url: `/posts/${queryArg.postId}/comment/${queryArg.commentId}`, method: 'DELETE' }),
        invalidatesTags: ['POSTS'],
      }),
      updateComment: build.mutation<UpdateCommentApiResponse, UpdateCommentApiArg>({
        query: queryArg => ({
          url: `/posts/${queryArg.postId}/comment/${queryArg.commentId}`,
          method: 'PATCH',
          body: queryArg.commentRequest,
        }),
        invalidatesTags: ['POSTS'],
      }),
      findParticipationById: build.query<FindParticipationByIdApiResponse, FindParticipationByIdApiArg>({
        query: queryArg => ({ url: `/participations/${queryArg.participationId}` }),
        providesTags: ['participation-controller'],
      }),
      deleteParticipation: build.mutation<DeleteParticipationApiResponse, DeleteParticipationApiArg>({
        query: queryArg => ({ url: `/participations/${queryArg.participationId}`, method: 'DELETE' }),
        invalidatesTags: ['participation-controller'],
      }),
      updateParticipation: build.mutation<UpdateParticipationApiResponse, UpdateParticipationApiArg>({
        query: queryArg => ({
          url: `/participations/${queryArg.participationId}`,
          method: 'PATCH',
          body: queryArg.participationUpdateRequest,
        }),
        invalidatesTags: ['participation-controller'],
      }),
      deleteEvent: build.mutation<DeleteEventApiResponse, DeleteEventApiArg>({
        query: queryArg => ({ url: `/admin/events/${queryArg.eventId}`, method: 'DELETE' }),
        invalidatesTags: ['EVENTS'],
      }),
      updateEvent: build.mutation<UpdateEventApiResponse, UpdateEventApiArg>({
        query: queryArg => ({
          url: `/admin/events/${queryArg.eventId}`,
          method: 'PATCH',
          body: queryArg.eventUpdateRequest,
        }),
        invalidatesTags: ['EVENTS'],
      }),
      findAllUsers: build.query<FindAllUsersApiResponse, FindAllUsersApiArg>({
        query: queryArg => ({
          url: `/users`,
          params: { filter: queryArg.filter, page: queryArg.page, size: queryArg.size },
        }),
        providesTags: ['USERS'],
      }),
      getFriendsList: build.query<GetFriendsListApiResponse, GetFriendsListApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}/friends` }),
        providesTags: ['USERS'],
      }),
      findUserByUsername: build.query<FindUserByUsernameApiResponse, FindUserByUsernameApiArg>({
        query: queryArg => ({ url: `/users/info`, params: { username: queryArg.username } }),
        providesTags: ['USERS'],
      }),
      searchPosts: build.query<SearchPostsApiResponse, SearchPostsApiArg>({
        query: queryArg => ({
          url: `/posts/search`,
          params: { searchFilter: queryArg.searchFilter, page: queryArg.page, size: queryArg.size },
        }),
        providesTags: ['POSTS'],
      }),
      getRecommendations: build.query<GetRecommendationsApiResponse, GetRecommendationsApiArg>({
        query: queryArg => ({
          url: `/posts/recommendations`,
          params: { page: queryArg.page, size: queryArg.size, sort: queryArg.sort },
        }),
        providesTags: ['POSTS'],
      }),
      getPostsFeed: build.query<GetPostsFeedApiResponse, GetPostsFeedApiArg>({
        query: queryArg => ({ url: `/posts/feed`, params: { page: queryArg.page, size: queryArg.size } }),
        providesTags: ['POSTS'],
      }),
      findUsersParticipations: build.query<FindUsersParticipationsApiResponse, FindUsersParticipationsApiArg>({
        query: queryArg => ({ url: `/participations/users/${queryArg.userId}`, params: { type: queryArg.type } }),
        providesTags: ['participation-controller'],
      }),
      searchEvents: build.query<SearchEventsApiResponse, SearchEventsApiArg>({
        query: queryArg => ({
          url: `/events`,
          params: { searchFilter: queryArg.searchFilter, page: queryArg.page, size: queryArg.size },
        }),
        providesTags: ['EVENTS'],
      }),
      findEventById: build.query<FindEventByIdApiResponse, FindEventByIdApiArg>({
        query: queryArg => ({ url: `/events/${queryArg.eventId}` }),
        providesTags: ['EVENTS'],
      }),
      findAllActivities: build.query<FindAllActivitiesApiResponse, FindAllActivitiesApiArg>({
        query: () => ({ url: `/events/activities` }),
        providesTags: ['EVENTS'],
      }),
      getAllCountries: build.query<GetAllCountriesApiResponse, GetAllCountriesApiArg>({
        query: () => ({ url: `/countries` }),
        providesTags: ['LOCATIONS'],
      }),
      getCountryById: build.query<GetCountryByIdApiResponse, GetCountryByIdApiArg>({
        query: queryArg => ({ url: `/countries/${queryArg.countryId}` }),
        providesTags: ['LOCATIONS'],
      }),
      getRegionById: build.query<GetRegionByIdApiResponse, GetRegionByIdApiArg>({
        query: queryArg => ({ url: `/countries/${queryArg.countryId}/regions/${queryArg.regionId}` }),
        providesTags: ['LOCATIONS'],
      }),
      getAllRegionsByCountryId: build.query<GetAllRegionsByCountryIdApiResponse, GetAllRegionsByCountryIdApiArg>({
        query: queryArg => ({ url: `/countries/${queryArg.countryId}/regions/` }),
        providesTags: ['LOCATIONS'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type AddFriendApiResponse = /** status 200 OK */ FriendshipDto;
export interface AddFriendApiArg {
  /** Идентификатор пользователя */
  userId: number;
  /** Идентификатор друга */
  friendId: number;
}
export type DeleteFriendApiResponse = /** status 200 OK */ void;
export interface DeleteFriendApiArg {
  /** Идентификатор пользователя */
  userId: number;
  /** Идентификатор друга */
  friendId: number;
}
export type AddLikeToPostApiResponse = /** status 200 OK */ number;
export interface AddLikeToPostApiArg {
  /** Идентификатор поста */
  postId: number;
}
export type ChangeParticipationStatusApiResponse = /** status 200 OK */ ParticipationDto;
export interface ChangeParticipationStatusApiArg {
  participationId: number;
  status: 'CREATED' | 'APPROVED' | 'DECLINED';
}
export type GetUserProfilePictureApiResponse = /** status 200 OK */ DataFileDto;
export interface GetUserProfilePictureApiArg {
  /** Идентификатор пользователя */
  userId: number;
}
export type UploadProfilePictureApiResponse = /** status 200 OK */ DataFileDto;
export interface UploadProfilePictureApiArg {
  userId: number;
  body: {
    /** Файл фотографии */
    avatar: Blob;
  };
}
export type DeleteProfilePictureApiResponse = /** status 204 No Content */ void;
export interface DeleteProfilePictureApiArg {
  /** Идентификатор пользователя */
  userId: number;
}
export type CreateUserApiResponse = /** status 201 Created */ NewUserResponse;
export interface CreateUserApiArg {
  newUserRequest: NewUserRequest;
}
export type GetAllPostByUserApiResponse = /** status 200 OK */ PostDto[];
export interface GetAllPostByUserApiArg {
  /** Идентификатор поста */
  userId: number;
}
export type CreatePostApiResponse = /** status 201 Created */ PostDto;
export interface CreatePostApiArg {
  /** Имя поста */
  content: string;
  body: {
    /** Файл */
    file: Blob;
  };
}
export type AddCommentToPostApiResponse = /** status 200 OK */ CommentDto;
export interface AddCommentToPostApiArg {
  /** Идентификатор поста */
  postId: number;
  commentRequest: CommentRequest;
}
export type RateParticipationApiResponse = /** status 200 OK */ ParticipationDto;
export interface RateParticipationApiArg {
  /** Идентификатор заявки */
  participationId: number;
  newScoreRequest: NewScoreRequest;
}
export type AddParticipationApiResponse = /** status 200 OK */ ParticipationDto;
export interface AddParticipationApiArg {
  /** Идентификатор мероприятия */
  eventId: number;
  /** Идентификатор пользователя */
  userId: number;
  participationRequest: ParticipationRequest;
}
export type CreateEventApiResponse = /** status 201 Created */ EventDto;
export interface CreateEventApiArg {
  newEventRequest: NewEventRequest;
}
export type CreateSubEventApiResponse = /** status 200 OK */ EventDto;
export interface CreateSubEventApiArg {
  /** Идентификатор родительского мероприятия */
  masterEventId: number;
  newSubEventRequest: NewSubEventRequest;
}
export type FindUserByIdApiResponse = /** status 200 OK */ UserDto;
export interface FindUserByIdApiArg {
  /** Идентификатор пользователя */
  userId: number;
}
export type DeleteUserApiResponse = /** status 204 No Content */ void;
export interface DeleteUserApiArg {
  /** Идентификатор пользователя */
  userId: number;
}
export type UpdateUserApiResponse = /** status 200 OK */ UserDto;
export interface UpdateUserApiArg {
  /** Идентификатор пользователя */
  userId: number;
  userUpdateRequest: UserUpdateRequest;
}
export type GetPostByIdApiResponse = /** status 200 OK */ PostDto;
export interface GetPostByIdApiArg {
  /** Идентификатор поста */
  postId: number;
}
export type DeletePostApiResponse = /** status 200 OK */ void;
export interface DeletePostApiArg {
  /** Идентификатор поста */
  postId: number;
}
export type UpdatePostApiResponse = /** status 200 OK */ PostDto;
export interface UpdatePostApiArg {
  /** Идентификатор поста */
  postId: number;
  /** Имя поста */
  content?: string;
  body: {
    /** Файл */
    files?: Blob;
  };
}
export type DeleteCommentApiResponse = /** status 200 OK */ void;
export interface DeleteCommentApiArg {
  /** Идентификатор поста */
  postId: number;
  /** Идентификатор комментария */
  commentId: number;
}
export type UpdateCommentApiResponse = /** status 200 OK */ CommentDto;
export interface UpdateCommentApiArg {
  /** Идентификатор поста */
  postId: number;
  /** Идентификатор комментария */
  commentId: number;
  commentRequest: CommentRequest;
}
export type FindParticipationByIdApiResponse = /** status 200 OK */ ParticipationDto;
export interface FindParticipationByIdApiArg {
  /** Идентификатор заявки */
  participationId: number;
}
export type DeleteParticipationApiResponse = /** status 200 OK */ void;
export interface DeleteParticipationApiArg {
  /** Идентификатор заявки */
  participationId: number;
}
export type UpdateParticipationApiResponse = /** status 200 OK */ ParticipationDto;
export interface UpdateParticipationApiArg {
  /** Идентификатор заявки */
  participationId: number;
  participationUpdateRequest: ParticipationUpdateRequest;
}
export type DeleteEventApiResponse = /** status 204 No Content */ void;
export interface DeleteEventApiArg {
  /** Идентификатор мероприятия */
  eventId: number;
}
export type UpdateEventApiResponse = /** status 200 OK */ EventDto;
export interface UpdateEventApiArg {
  /** Идентификатор мероприятия */
  eventId: number;
  eventUpdateRequest: EventUpdateRequest;
}
export type FindAllUsersApiResponse = /** status 200 OK */ UserDto[];
export interface FindAllUsersApiArg {
  /** Фильтр поиска */
  filter: UserSearchFilter;
  /** Номер страницы */
  page?: number;
  /** Количество элементов на странице */
  size?: number;
}
export type GetFriendsListApiResponse = /** status 200 OK */ ShortUserDto[];
export interface GetFriendsListApiArg {
  /** Идентификатор пользователя */
  userId: number;
}
export type FindUserByUsernameApiResponse = /** status 200 OK */ UserDto;
export interface FindUserByUsernameApiArg {
  /** Идентификатор пользователя */
  username: string;
}
export type SearchPostsApiResponse = /** status 200 OK */ PostDto[];
export interface SearchPostsApiArg {
  /** Фильтр поиска */
  searchFilter: PostSearchFilter;
  /** Номер страницы */
  page?: number;
  /** Количество постов на странице */
  size?: number;
}
export type GetRecommendationsApiResponse = /** status 200 OK */ PostDto[];
export interface GetRecommendationsApiArg {
  /** Номер страницы */
  page?: number;
  /** Количество постов на странице */
  size?: number;
  /** Параметр сортировки */
  sort?: 'VIEWS' | 'LIKES';
}
export type GetPostsFeedApiResponse = /** status 200 OK */ PostDto[];
export interface GetPostsFeedApiArg {
  /** Номер страницы */
  page?: number;
  /** Количество постов на странице */
  size?: number;
}
export type FindUsersParticipationsApiResponse = /** status 200 OK */ ParticipationDto[];
export interface FindUsersParticipationsApiArg {
  /** Идентификатор пользователя */
  userId: number;
  /** Роль пользователя в мероприятии */
  type?: 'PARTICIPANT' | 'JUDGE' | 'SPECTATOR' | 'SPONSOR';
}
export type SearchEventsApiResponse = /** status 200 OK */ EventDto[];
export interface SearchEventsApiArg {
  /** Фильтр поиска */
  searchFilter: EventSearchFilter;
  /** Номер страницы */
  page?: number;
  /** Количество постов на странице */
  size?: number;
}
export type FindEventByIdApiResponse = /** status 200 OK */ EventDto;
export interface FindEventByIdApiArg {
  /** Идентификатор мероприятия */
  eventId: number;
}
export type FindAllActivitiesApiResponse = /** status 200 OK */ ActivityDto[];
export type FindAllActivitiesApiArg = void;
export type GetAllCountriesApiResponse = /** status 200 OK */ CountryDto[];
export type GetAllCountriesApiArg = void;
export type GetCountryByIdApiResponse = /** status 200 OK */ CountryDto;
export interface GetCountryByIdApiArg {
  /** Идентификатор страны */
  countryId: number;
}
export type GetRegionByIdApiResponse = /** status 200 OK */ RegionDto;
export interface GetRegionByIdApiArg {
  /** Идентификатор страны */
  countryId: number;
  /** Идентификатор региона */
  regionId: number;
}
export type GetAllRegionsByCountryIdApiResponse = /** status 200 OK */ RegionDto[];
export interface GetAllRegionsByCountryIdApiArg {
  /** Идентификатор страны */
  countryId: number;
}
export interface FriendshipDto {
  /** Статус дружбы между пользователями */
  status?: 'SUBSCRIBER' | 'FRIEND';
}
export interface ErrorResponse {
  errors?: Record<string, string>;
  status?: number;
  timestamp?: string;
}
export interface ParticipationDto {
  /** Идентификатор заявка */
  id?: number;
  /** Идентификатор мероприятия, на которое подана заявка */
  eventId?: number;
  /** Идентификатор пользователя, который подал заявку */
  userId?: number;
  /** Роль пользователя в мероприятии */
  participantType?: 'PARTICIPANT' | 'JUDGE' | 'SPECTATOR' | 'SPONSOR';
  /** Статус заявки */
  status?: 'CREATED' | 'APPROVED' | 'DECLINED';
  /** Средняя оценка */
  avgRating?: number;
}
export interface DataFileDto {
  /** Идентификатор файла */
  id?: number;
  /** Имя файла */
  fileName?: string;
  /** Путь до файла */
  filePath?: string;
}
export interface NewUserResponse {
  /** Идентификатор пользователя */
  id?: number;
  /** Никнейм пользователя */
  username?: string;
  /** Электронная почта */
  email?: string;
}
export interface NewUserRequest {
  /** Никнейм пользователя */
  username: string;
  /** Электронная почта */
  email: string;
  /** Пароль */
  password: string;
}
export interface ShortUserDto {
  /** Идентификатор пользователя */
  id?: number;
  /** Никнейм пользователя */
  username?: string;
  profilePicture?: DataFileDto;
}
export interface CommentDto {
  /** Идентификатор комментария */
  id: number;
  /** Содержание комментария */
  text: string;
  /** Идентификатор автора комментария */
  authorId: number;
}
export interface PostDto {
  /** Идентификатор поста */
  id: number;
  /** Имя поста */
  title: string;
  author: ShortUserDto;
  file: DataFileDto;
  /** Количество лайков */
  likes: number;
  /** Количество просмотров */
  views: number;
  /** Комментарии к посту */
  comments: CommentDto[];
  likedByUser: boolean;
}
export interface CommentRequest {
  /** Содержание комментария */
  text: string;
}
export interface NewScoreRequest {
  /** Первая оценка */
  scoreType1: number;
  /** Вторая оценка */
  scoreType2: number;
  /** Третья оценка */
  scoreType3: number;
}
export interface ParticipationRequest {
  /** Имя пользователя */
  name?: string;
  /** Отчество пользователя */
  secondName?: string;
  /** Фамилия пользователя */
  surname?: string;
  /** Электронная почта пользователя */
  email?: string;
  /** Пол */
  gender?: 'MALE' | 'FEMALE';
  /** Страна проживания */
  countryId?: number;
  /** Регион проживания */
  regionId?: number;
  /** Город проживания */
  city?: string;
  /** Дата рождения пользователя */
  dateOfBirth?: string;
  /** Номер телефона */
  phoneNumber?: string;
  /** О себе */
  overview?: string;
  /** Ссылка на соцсети */
  website?: string;
  /** Ссылка на на файл для участия в соревновании */
  linkToContestFile?: string;
  /** Роль пользователя в мероприятии */
  type: 'PARTICIPANT' | 'JUDGE' | 'SPECTATOR' | 'SPONSOR';
}
export interface EventDto {
  /** Идентификатор мероприятия */
  id?: number;
  /** Название мероприятия */
  eventName?: string;
  /** Описание мероприятия */
  description?: string;
  /** Дата начала мероприятия */
  eventStart?: string;
  /** Дата окончания мероприятия */
  eventEnd?: string;
  /** Направление мероприятия */
  activity?: string;
  /** Тип мероприятия */
  eventType?: string;
  /** Идентификатор главного мероприятия */
  masterEvent?: number;
  /** Награда мероприятия */
  prize?: number;
  /** Страна проживания */
  country?: string;
  /** Регион страны проживания */
  region?: string;
  /** Город проживания */
  city?: string;
}
export interface NewEventRequest {
  /** Название мероприятия */
  eventName: string;
  /** Описание мероприятия */
  description: string;
  /** Дата начала мероприятия */
  eventStart: string;
  /** Дата окончания мероприятия */
  eventEnd: string;
  /** Идентификатор направления мероприятия */
  activityId: number;
  /** Тип мероприятия */
  eventType: 'PREMIUM' | 'VIDEO_CONTEST' | 'PROJECT' | 'CHILDREN';
  /** Призовой фонд */
  prize: number;
  /** Страна проживания */
  countryId?: number;
  /** Регион проживания */
  regionId?: number;
  /** Город проживания */
  city?: string;
}
export interface NewSubEventRequest {
  /** Название мероприятия */
  eventName: string;
  /** Описание мероприятия */
  description: string;
  /** Дата начала мероприятия */
  eventStart: string;
  /** Дата окончания мероприятия */
  eventEnd: string;
  /** Страна проживания */
  countryId?: number;
  /** Регион проживания */
  regionId?: number;
  /** Город проживания */
  city?: string;
}
export interface Country {
  id?: number;
  name?: string;
}
export interface Region {
  id?: number;
  country?: Country;
  name?: string;
}
export interface City {
  id?: number;
  country?: Country;
  region?: Region;
  name?: string;
}
export interface User {
  id?: number;
  username?: string;
  name?: string;
  secondName?: string;
  surname?: string;
  dateOfBirth?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  country?: Country;
  region?: Region;
  city?: City;
  gender?: 'MALE' | 'FEMALE';
  profilePicture?: DataFile;
  overview?: string;
  website?: string;
  role?: 'USER' | 'ADMIN';
}
export interface Comment {
  id?: number;
  text?: string;
  post?: Post;
  author?: User;
  created?: string;
}
export interface Post {
  id?: number;
  author?: User;
  title?: string;
  createdOn?: string;
  file?: DataFile;
  likes?: number;
  views?: number;
  comments?: Comment[];
}
export interface DataFile {
  id?: number;
  fileName?: string;
  fileType?: string;
  filePath?: string;
  post?: Post;
}
export interface UserDto {
  /** Идентификатор пользователя */
  id: number;
  /** Никнейм пользователя */
  username: string;
  /** Имя пользователя */
  name?: string;
  /** Отчество пользователя */
  secondName?: string;
  /** Фамилия пользователя */
  surname?: string;
  /** Дата рождения пользователя */
  dateOfBirth?: string;
  /** Электронная почта пользователя */
  email?: string;
  /** Страна проживания */
  country?: string;
  /** Регион страны проживания */
  region?: string;
  /** Город проживания */
  city?: string;
  /** Пол */
  gender?: 'MALE' | 'FEMALE';
  profilePicture?: DataFile;
  /** Номер телефона */
  phoneNumber?: string;
  /** О себе */
  overview?: string;
  /** Ссылка на соцсети */
  website?: string;
}
export interface UserUpdateRequest {
  /** Никнейм пользователя */
  username?: string;
  /** Имя пользователя */
  name?: string;
  /** Отчество пользователя */
  secondName?: string;
  /** Фамилия пользователя */
  surname?: string;
  /** Электронная почта пользователя */
  email?: string;
  /** Пол */
  gender?: 'MALE' | 'FEMALE';
  /** Пароль */
  password?: string;
  /** Страна проживания */
  countryId?: number;
  /** Регион проживания */
  regionId?: number;
  /** Город проживания */
  city?: string;
  /** Дата рождения пользователя */
  dateOfBirth?: string;
  /** Номер телефона */
  phoneNumber?: string;
  /** О себе */
  overview?: string;
  /** Ссылка на соцсети */
  website?: string;
}
export interface ParticipationUpdateRequest {
  /** Ссылка на на файл для участия в соревновании */
  linkToContestFile?: string;
}
export interface EventUpdateRequest {
  /** Название мероприятия */
  eventName?: string;
  /** Описание мероприятия */
  description?: string;
  /** Дата начала мероприятия */
  eventStart?: string;
  /** Дата окончания мероприятия */
  eventEnd?: string;
  /** Идентификатор направления мероприятия */
  activityId?: number;
  /** Тип мероприятия */
  eventType?: 'PREMIUM' | 'VIDEO_CONTEST' | 'PROJECT' | 'CHILDREN';
  /** Призовой фонд */
  prize: number;
  /** Страна проживания */
  countryId?: number;
  /** Регион проживания */
  regionId?: number;
  /** Город проживания */
  city?: string;
}
export interface UserSearchFilter {
  /** Поиск данного значения в никнейме или электронной почте */
  name?: string;
}
export interface PostSearchFilter {
  /** Поиск данного значения в названии поста */
  title?: string;
}
export interface EventSearchFilter {
  /** Список искомых типов мероприятий */
  types?: ('PREMIUM' | 'VIDEO_CONTEST' | 'PROJECT' | 'CHILDREN')[];
  /** Поиск по названию направления */
  activity?: string;
  /** Стартовая дата поиска для начала мероприятия */
  startDate?: string;
  /** Конечная дата поиска для окончания мероприятия */
  endDate?: string;
  /** Поиск по названию или описанию мероприятия */
  text?: string;
  /** Поиск по названию страны */
  country?: string;
  /** Поиск по названию региона */
  region?: string;
  /** Поиск по названию города */
  city?: string;
  /** Виды сортировок мероприятий */
  sort?: 'EVENT_START' | 'PRIZE';
}
export interface ActivityDto {
  /** Идентификатор направления */
  id?: number;
  /** Название направления */
  name?: string;
  /** Описание направления */
  description?: string;
}
export interface CountryDto {
  /** Идентификатор страны */
  id: number;
  /** Название страны */
  name: string;
}
export interface RegionDto {
  /** Идентификатор региона */
  id: number;
  /** Название региона */
  name: string;
  /** Идентификатор страны, в которой находится регион */
  countryId: number;
}
export const {
  useAddFriendMutation,
  useDeleteFriendMutation,
  useAddLikeToPostMutation,
  useChangeParticipationStatusMutation,
  useGetUserProfilePictureQuery,
  useLazyGetUserProfilePictureQuery,
  useUploadProfilePictureMutation,
  useDeleteProfilePictureMutation,
  useCreateUserMutation,
  useGetAllPostByUserQuery,
  useLazyGetAllPostByUserQuery,
  useCreatePostMutation,
  useAddCommentToPostMutation,
  useRateParticipationMutation,
  useAddParticipationMutation,
  useCreateEventMutation,
  useCreateSubEventMutation,
  useFindUserByIdQuery,
  useLazyFindUserByIdQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useFindParticipationByIdQuery,
  useLazyFindParticipationByIdQuery,
  useDeleteParticipationMutation,
  useUpdateParticipationMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useFindAllUsersQuery,
  useLazyFindAllUsersQuery,
  useGetFriendsListQuery,
  useLazyGetFriendsListQuery,
  useFindUserByUsernameQuery,
  useLazyFindUserByUsernameQuery,
  useSearchPostsQuery,
  useLazySearchPostsQuery,
  useGetRecommendationsQuery,
  useLazyGetRecommendationsQuery,
  useGetPostsFeedQuery,
  useLazyGetPostsFeedQuery,
  useFindUsersParticipationsQuery,
  useLazyFindUsersParticipationsQuery,
  useSearchEventsQuery,
  useLazySearchEventsQuery,
  useFindEventByIdQuery,
  useLazyFindEventByIdQuery,
  useFindAllActivitiesQuery,
  useLazyFindAllActivitiesQuery,
  useGetAllCountriesQuery,
  useLazyGetAllCountriesQuery,
  useGetCountryByIdQuery,
  useLazyGetCountryByIdQuery,
  useGetRegionByIdQuery,
  useLazyGetRegionByIdQuery,
  useGetAllRegionsByCountryIdQuery,
  useLazyGetAllRegionsByCountryIdQuery,
} = injectedRtkApi;
