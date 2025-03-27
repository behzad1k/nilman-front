import globalType from './globalType';

namespace comp {

  export interface IAddress {
    onClick?: (address: globalType.Address) => void,
    editable: boolean,
  }


  export interface IUserSlice {
    data: globalType.User;
    addresses: globalType.Address[];
    isLoggedIn: boolean;
  }

  export interface ICartItem {
    item: globalType.Order;
  }

  export interface ServiceStep {
    index: number;
    name: 'service' | 'attribute' | 'address' | 'worker';
  }



  export interface IAddressRow {
    address: globalType.Address,
    isSelected: boolean,
    onClick?: (address: globalType.Address) => void,
    setSelected: React.Dispatch<React.SetStateAction<globalType.Address | undefined>>,
    editable?: boolean,
    setModal?: React.Dispatch<React.SetStateAction<any>>,
    selectable?: boolean
  }

  export interface ICalenderStep {
    selected: globalType.Form;
    setSelected: (val: (prev: globalType.Form) => globalType.Form) => void;
    setStep: React.Dispatch<React.SetStateAction<comp.ServiceStep>>;
  }


  export interface IOrderCardProps {
    item: globalType.Order;
  }

  export interface IAttributeStep {
    selected: globalType.Form;
    setSelected: (value: (prev: globalType.Form) => globalType.Form) => void;
    setIsNextStepAllowed: (val: boolean) => void;
  };

  export interface IAttrDrawer {
    open: boolean;
    setOpen: (val: boolean) => void;
    parent: globalType.Service;
    selected: globalType.Form;
    setSelected: (value: (prev: globalType.Form) => globalType.Form) => void;
    setIsNextStepAllowed: any
  }
  export interface IServiceStep {
    selected: globalType.Form;
    setSelected: (val: (prev: globalType.Form) => globalType.Form) => void;
    setStep: (val: any) => void;
  }



}

export default comp;
