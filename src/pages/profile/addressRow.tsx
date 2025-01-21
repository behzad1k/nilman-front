import { DotsThree, Pencil } from '@phosphor-icons/react';
import React from 'react';
import comp from '../../types/comp';

export function AddressRow({
                             address,
                             isSelected,
                             onClick,
                             setSelected,
                             editable = false,
                             setModal = undefined
                           }: comp.IAddressRow) {

  return (
    <article className={'addressContainer' + (isSelected ? ' selected' : '')} onClick={() => {
      setSelected(address);
      onClick && onClick(address);
    }}>
      {/* {isSelected && <i className="tick"></i>} */}
      <div className="addressDetails">
        <div className="addressHeader">
        <span className="addressItem">
          {/* <HouseLine /> */}
          <h4>{address.title}</h4>
        </span>
        {editable &&
            <span className="addressDots">
          <Pencil width={20} height={20} onClick={() => setModal && setModal({
            open: true,
            content: address
          })}/>
        </span>
        }
        </div>
        <span className="addressItem">
          {/* <MapTrifold width={30} height={30}/> */}
          <p>{address.description}</p>
        </span>
      </div>
    </article>
  );
}
