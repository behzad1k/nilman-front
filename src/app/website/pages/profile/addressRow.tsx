import { HouseLine, MapTrifold, PencilLine, PhoneDisconnect } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map } from '../../../../components';
import { MapView } from '../../../../components/common/map.tsx';
import { IAddress, Position } from '../../../../services/types.ts';

export function AddressRow({ address, isSelected, onClick , setSelected, editable = false }: {address: IAddress, isSelected: boolean, onClick?: (address: IAddress) => void, setSelected: React.Dispatch<React.SetStateAction<IAddress | undefined>>, editable?: boolean}) {
  const navigate = useNavigate();
const [position, setPosition] = useState<Position>({ lat: address.latitude, lng: address.longitude });
  return (
    <article className={'addressContainer' + (isSelected ? ' selected' : '')} onClick={() => {
      setSelected(address);
      onClick && onClick(address);
    }}>
      {isSelected && <i className="tick"></i>}
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
        {editable &&
          <span onClick={() => navigate(`/address/edit/${address.id}`)} className="addressItem pencil">
            <PencilLine/>
            <p>ویرایش</p>
          </span>
        }
      </div>
      <div className="addressMap">
        <MapView position={position} />
      </div>
    </article>
  );
}
