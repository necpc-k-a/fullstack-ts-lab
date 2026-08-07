export interface User {
  id: number;
  name: string;
  email: string;
}

// レスポンスやリクエスト用の共通型が必要な場合もここに追加していきます
export type CreateUserDto = Omit<User, 'id'>;
export type UpdateUserDto = Partial<CreateUserDto>;