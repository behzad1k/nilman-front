import {HouseLine, MapTrifold, PhoneDisconnect} from '@phosphor-icons/react';
import React from 'react';
import {IAddress} from '../../../../services/types.ts';

export function AddressRow({address, isSelected, onClick , setSelected}: {address: IAddress, isSelected: boolean, onClick?: (address: IAddress) => void, setSelected: React.Dispatch<React.SetStateAction<IAddress | undefined>>}) {

  return (
    <article className={'addressContainer' + (isSelected ? ' selected' : '')} onClick={() => {
      setSelected(address);
      onClick && onClick(address);
    }}>
      <div className="addressDetails">
        <span className="addressItem">
          <HouseLine />
          <p>{address.title}</p>
        </span>
        <span className="addressItem">
          <PhoneDisconnect />
          <p>{address.phoneNumber}</p>
        </span>
        <span className="addressItem">
          <MapTrifold />
          <p>{address.description}</p>
        </span>
      </div>
      <div className="addressMap">
        <span>
          <img src="/img/map.png" />
        </span>
      </div>
    </article>
  );
}
