import { DotsThree, HouseLine, MapTrifold, PencilLine, PhoneDisconnect } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map } from '../../../../components';
import { MapView } from '../../../../components/common/map.tsx';
import { IAddress, Position } from '../../../../services/types.ts';

export function AddressRow({ address, isSelected, onClick , setSelected, editable = false, mini = false }: {address: IAddress, isSelected: boolean, onClick?: (address: IAddress) => void, setSelected: React.Dispatch<React.SetStateAction<IAddress | undefined>>, editable?: boolean, mini?: boolean}) {
  const navigate = useNavigate();
const [position, setPosition] = useState<Position>({ lat: address.latitude, lng: address.longitude });
  return (
    <article className={'addressContainer' + (isSelected ? ' selected' : '')} onClick={() => {
      setSelected(address);
      onClick && onClick(address);
    }}>
      {/* {isSelected && <i className="tick"></i>} */}
      <div className="addressDetails">
        <span className="addressItem">
          {/* <HouseLine /> */}
          <h4>{address.title}</h4>
        </span>
        <span className="addressItem">
          {/* <MapTrifold width={30} height={30}/> */}
          <p>{address.description}</p>
        </span>
        {editable &&
        <span className='addressDots'>
          <DotsThree width={40} height={40} onClick={() => navigate(`/address/edit/${address.id}`)}/>
        </span>
        }
      </div>
    </article>
  );
}
