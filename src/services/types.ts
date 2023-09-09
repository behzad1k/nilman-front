export interface IService {
  id: number;
  title: string;
  description: string;
  price: number;
  slug: string;
  section: number;
  attributes?: IService[];
}

export interface IAddress {
  id: number;
  title: string;
  phoneNumber?: string;
  longitude: string;
  latitude: string;
  description: string;
}

export interface IOrder {
  id: number;
  title: string;
  price: number;
  date: string;
  time: string;
  discount: number;
  transportation: number;
  status: 'ACCEPTED' | 'PAID' | 'DONE' | 'CREATED' | 'ASSIGNED' | 'CANCELED';
  worker: IUser;
  service: IService;
  attribute?: IService;
  address?: IAddress;
}
export interface IUser {
  id: number;
  name: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  role: 'USER' | 'WORKER' | 'OPERATOR' | 'SUPER_ADMIN';
}

export interface ISliderCardInfo {
  title: string;
  imgSrc: string;
}
