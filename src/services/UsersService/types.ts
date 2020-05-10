export type Credentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type User = {
  id: number;
  email: string;
};

export type MeResponse = {
  user: User;
};
