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
  id: number;
  title: string;
  description: string;
  price: number;
  slug: string;
  pricePlus: number;
  section: number;
  parent?: IService;
  attributes?: IService[];
  hasColor: boolean;
  isMulti: boolean;
  hasMedia: boolean;
  color?: string;
  media: any,
  sort: number,
  openDrawer: boolean,
  showInList: boolean,
  addOns: IService[]
}

export interface SelectedOptions {
 [slug: string]: {
   colors: string[],
   media: any
 }

}

export interface IAddress {
  id: number;
  title: string;
  phoneNumber?: string;
  longitude: number;
  latitude: number;
  description: string;
}


export type Position = {
  lat: number;
  lng: number;
};


export interface IOrder {
  attributes: IService[];
  id: number;
  title: string;
  price: number;
  date: string;
  time: string;
  code: string;
  discount: number;
  discountAmount: number;
  transportation: number | string;
  status: 'ACCEPTED' | 'PAID' | 'Done' | 'CREATED' | 'ASSIGNED' | 'Canceled';
  worker: IUser;
  service: IService;
  attribute?: IService;
  address?: IAddress;
  fromTime: number;
  toTime: number;
  done: boolean;
  isUrgent: boolean;
}
export interface IUser {
  id: number;
  name: string;
  lastName: string;
  nationalCode: string;
  phoneNumber: string;
  role: 'USER' | 'WORKER' | 'OPERATOR' | 'SUPER_ADMIN';
  profilePic: { url: string}
}

export interface ISliderCardInfo {
  title: string;
  url: string;
}
