import { api } from './api';

export const addTagTypes = [
  '\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438',
  '\u041F\u043E\u0441\u0442\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439',
  '\u0413\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043B\u043E\u043A\u0430\u0446\u0438\u0438',
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      addFriend: build.mutation<AddFriendApiResponse, AddFriendApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}/friends/${queryArg.friendId}`, method: 'PUT' }),
        invalidatesTags: ['\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'],
      }),
      deleteFriend: build.mutation<DeleteFriendApiResponse, DeleteFriendApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}/friends/${queryArg.friendId}`, method: 'DELETE' }),
        invalidatesTags: ['\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'],
      }),
      addLikeToPost: build.mutation<AddLikeToPostApiResponse, AddLikeToPostApiArg>({
        query: queryArg => ({ url: `/posts/${queryArg.postId}/like`, method: 'PUT' }),
        invalidatesTags: [
          '\u041F\u043E\u0441\u0442\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439',
        ],
      }),
      getUserProfilePicture: build.query<GetUserProfilePictureApiResponse, GetUserProfilePictureApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}/avatar` }),
        providesTags: ['\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'],
      }),
      uploadProfilePicture: build.mutation<UploadProfilePictureApiResponse, UploadProfilePictureApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}/avatar`, method: 'POST', body: queryArg.body }),
        invalidatesTags: ['\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'],
      }),
      deleteProfilePicture: build.mutation<DeleteProfilePictureApiResponse, DeleteProfilePictureApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}/avatar`, method: 'DELETE' }),
        invalidatesTags: ['\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'],
      }),
      createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
        query: queryArg => ({ url: `/users/register`, method: 'POST', body: queryArg.newUserRequest }),
        invalidatesTags: ['\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'],
      }),
      getAllPostByUser: build.query<GetAllPostByUserApiResponse, GetAllPostByUserApiArg>({
        query: queryArg => ({ url: `/posts`, params: { userId: queryArg.userId } }),
        providesTags: [
          '\u041F\u043E\u0441\u0442\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439',
        ],
      }),
      createPost: build.mutation<CreatePostApiResponse, CreatePostApiArg>({
        query: queryArg => ({
          url: `/posts`,
          method: 'POST',
          body: queryArg.body,
          params: { content: queryArg.content },
        }),
        invalidatesTags: [
          '\u041F\u043E\u0441\u0442\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439',
        ],
      }),
      addCommentToPost: build.mutation<AddCommentToPostApiResponse, AddCommentToPostApiArg>({
        query: queryArg => ({
          url: `/posts/${queryArg.postId}/comment`,
          method: 'POST',
          body: queryArg.commentRequest,
        }),
        invalidatesTags: [
          '\u041F\u043E\u0441\u0442\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439',
        ],
      }),
      findUserById: build.query<FindUserByIdApiResponse, FindUserByIdApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}` }),
        providesTags: ['\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'],
      }),
      deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}`, method: 'DELETE' }),
        invalidatesTags: ['\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'],
      }),
      updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}`, method: 'PATCH', body: queryArg.userUpdateRequest }),
        invalidatesTags: ['\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'],
      }),
      getPostById: build.query<GetPostByIdApiResponse, GetPostByIdApiArg>({
        query: queryArg => ({ url: `/posts/${queryArg.postId}` }),
        providesTags: [
          '\u041F\u043E\u0441\u0442\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439',
        ],
      }),
      deletePost: build.mutation<DeletePostApiResponse, DeletePostApiArg>({
        query: queryArg => ({ url: `/posts/${queryArg.postId}`, method: 'DELETE' }),
        invalidatesTags: [
          '\u041F\u043E\u0441\u0442\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439',
        ],
      }),
      updatePost: build.mutation<UpdatePostApiResponse, UpdatePostApiArg>({
        query: queryArg => ({
          url: `/posts/${queryArg.postId}`,
          method: 'PATCH',
          body: queryArg.body,
          params: { content: queryArg.content },
        }),
        invalidatesTags: [
          '\u041F\u043E\u0441\u0442\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439',
        ],
      }),
      deleteComment: build.mutation<DeleteCommentApiResponse, DeleteCommentApiArg>({
        query: queryArg => ({ url: `/posts/${queryArg.postId}/comment/${queryArg.commentId}`, method: 'DELETE' }),
        invalidatesTags: [
          '\u041F\u043E\u0441\u0442\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439',
        ],
      }),
      updateComment: build.mutation<UpdateCommentApiResponse, UpdateCommentApiArg>({
        query: queryArg => ({
          url: `/posts/${queryArg.postId}/comment/${queryArg.commentId}`,
          method: 'PATCH',
          body: queryArg.commentRequest,
        }),
        invalidatesTags: [
          '\u041F\u043E\u0441\u0442\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439',
        ],
      }),
      findAllUsers: build.query<FindAllUsersApiResponse, FindAllUsersApiArg>({
        query: queryArg => ({
          url: `/users`,
          params: { filter: queryArg.filter, page: queryArg.page, size: queryArg.size },
        }),
        providesTags: ['\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'],
      }),
      getFriendsList: build.query<GetFriendsListApiResponse, GetFriendsListApiArg>({
        query: queryArg => ({ url: `/users/${queryArg.userId}/friends` }),
        providesTags: ['\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'],
      }),
      findUserByUsername: build.query<FindUserByUsernameApiResponse, FindUserByUsernameApiArg>({
        query: queryArg => ({ url: `/users/info`, params: { username: queryArg.username } }),
        providesTags: ['\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438'],
      }),
      getRecommendations: build.query<GetRecommendationsApiResponse, GetRecommendationsApiArg>({
        query: queryArg => ({
          url: `/posts/recommendations`,
          params: { page: queryArg.page, size: queryArg.size, sort: queryArg.sort },
        }),
        providesTags: [
          '\u041F\u043E\u0441\u0442\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439',
        ],
      }),
      getPostsFeed: build.query<GetPostsFeedApiResponse, GetPostsFeedApiArg>({
        query: queryArg => ({ url: `/posts/feed`, params: { page: queryArg.page, size: queryArg.size } }),
        providesTags: [
          '\u041F\u043E\u0441\u0442\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439',
        ],
      }),
      getAllCountries: build.query<GetAllCountriesApiResponse, GetAllCountriesApiArg>({
        query: () => ({ url: `/countries` }),
        providesTags: [
          '\u0413\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043B\u043E\u043A\u0430\u0446\u0438\u0438',
        ],
      }),
      getCountryById: build.query<GetCountryByIdApiResponse, GetCountryByIdApiArg>({
        query: queryArg => ({ url: `/countries/${queryArg.countryId}` }),
        providesTags: [
          '\u0413\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043B\u043E\u043A\u0430\u0446\u0438\u0438',
        ],
      }),
      getRegionById: build.query<GetRegionByIdApiResponse, GetRegionByIdApiArg>({
        query: queryArg => ({ url: `/countries/${queryArg.countryId}/regions/${queryArg.regionId}` }),
        providesTags: [
          '\u0413\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043B\u043E\u043A\u0430\u0446\u0438\u0438',
        ],
      }),
      getAllRegionsByCountryId: build.query<GetAllRegionsByCountryIdApiResponse, GetAllRegionsByCountryIdApiArg>({
        query: queryArg => ({ url: `/countries/${queryArg.countryId}/regions/` }),
        providesTags: [
          '\u0413\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043B\u043E\u043A\u0430\u0446\u0438\u0438',
        ],
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
  id?: number;
  /** Содержание комментария */
  text?: string;
  /** Идентификатор автора комментария */
  authorId?: number;
}
export interface PostDto {
  /** Идентификатор поста */
  id?: number;
  /** Имя поста */
  title?: string;
  author?: ShortUserDto;
  file?: DataFileDto;
  /** Количество лайков */
  likes?: number;
  /** Количество просмотров */
  views?: number;
  /** Комментарии к посту */
  comments?: CommentDto[];
}
export interface CommentRequest {
  /** Содержание комментария */
  text: string;
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
  id?: number;
  /** Никнейм пользователя */
  username?: string;
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
export interface UserSearchFilter {
  /** Поиск данного значения в никнейме или электронной почте */
  name?: string;
}
export interface CountryDto {
  /** Идентификатор страны */
  id?: number;
  /** Название страны */
  name?: string;
}
export interface RegionDto {
  /** Идентификатор региона */
  id?: number;
  /** Название региона */
  name?: string;
  /** Идентификатор страны, в которой находится регион */
  countryId?: number;
}
export const {
  useAddFriendMutation,
  useDeleteFriendMutation,
  useAddLikeToPostMutation,
  useGetUserProfilePictureQuery,
  useLazyGetUserProfilePictureQuery,
  useUploadProfilePictureMutation,
  useDeleteProfilePictureMutation,
  useCreateUserMutation,
  useGetAllPostByUserQuery,
  useLazyGetAllPostByUserQuery,
  useCreatePostMutation,
  useAddCommentToPostMutation,
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
  useFindAllUsersQuery,
  useLazyFindAllUsersQuery,
  useGetFriendsListQuery,
  useLazyGetFriendsListQuery,
  useFindUserByUsernameQuery,
  useLazyFindUserByUsernameQuery,
  useGetRecommendationsQuery,
  useLazyGetRecommendationsQuery,
  useGetPostsFeedQuery,
  useLazyGetPostsFeedQuery,
  useGetAllCountriesQuery,
  useLazyGetAllCountriesQuery,
  useGetCountryByIdQuery,
  useLazyGetCountryByIdQuery,
  useGetRegionByIdQuery,
  useLazyGetRegionByIdQuery,
  useGetAllRegionsByCountryIdQuery,
  useLazyGetAllRegionsByCountryIdQuery,
} = injectedRtkApi;
