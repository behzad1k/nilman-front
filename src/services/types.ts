// export interface SignUpParams {
//   displayName: string;
//   username: string;
//   email: string;
//   password: string;
// }

// export interface LoginParams {
//   email: string;
//   password: string;
// }

export interface IService {
  title: string;
  description: string;
  price: number;
  slug: string;
  attributes?: IService[]
}

export interface IAddress {
  title: string;
  phoneNumber?: string;
  longitude: string;
  latitude: string;
  description: string;
}

export interface IOrder {
  title: string;
  price: number;
  date: string;
  discount: number;
  transportation: number;
  status: 'PAID' | 'DONE' | 'CREATED' | 'ASSIGNED' | 'CANCELED';
  worker: IUser,
  service?: IService,
  attribute?: IService
}
export interface IUser {
  name: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  role: 'USER' | 'WORKER' | 'OPERATOR' | 'SUPERADMIN';
}

export interface ISliderCardInfo {
  title: string;
  imgSrc: string;
}
