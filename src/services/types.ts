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
}

export interface IAddress {
  longitude: string;
  latitude: string;
  description: string;
}

export interface IOrder {
  title: string;
  attributes: [];
  price: string;
  date: string;
  discount: string;
}
export interface IUserData {
  name: string;
  phoneNumber: string;
  role: 'USER' | 'WORKER' | 'OPERATOR' | 'SUPERADMIN';
  addresses: IAddress[];
  orders: IOrder[];
}

export interface IUserCompact {
  displayName: string;
  username: string;
}

export interface IService {
  title: string;
  details: string[];
  date: string;
  discount: number;
  price: number;
  status?: number;
  address: string;
  employee: IUserData;
}

export interface ISliderCardInfo {
  title: string;
  imgSrc: string;
}
