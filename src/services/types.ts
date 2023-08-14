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
    name: string,
    username: string,
    email: string,
    imageUrl: string
}

export interface IUserCompact {
    displayName: string,
    username: string
}

export interface IService {
  title: string,
  details: string[],
  date: string,
  discount: number,
  price: number,
  status?: number,
  address: string,
  employee: IUserData
}