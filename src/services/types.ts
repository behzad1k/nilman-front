export interface SignUpParams {
  displayName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginParams {
  email: string;
  password: string;
}
export interface IUserData {
    displayName: string,
    username: string,
    email: string
}

export interface IUserCompact {
    displayName: string,
    username: string
}
