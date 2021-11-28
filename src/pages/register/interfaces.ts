export interface RegisterForm {
  username: string;
  password: string;
  name: string;
  address: string;
  cityId: number;
}

export interface RegisterErrors {
  username?: string;
  password?: string;
}
