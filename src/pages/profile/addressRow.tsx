import { DotsThree } from '@phosphor-icons/react';
import React from 'react';
import comp from 'src/types/comp.ts';

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
        <span className="addressItem">
          {/* <HouseLine /> */}
          <h4>{address.title}</h4>
        </span>
        <span className="addressItem">
          {/* <MapTrifold width={30} height={30}/> */}
          <p>{address.description}</p>
        </span>
        {editable &&
            <span className="addressDots">
          <DotsThree width={40} height={40} onClick={() => setModal && setModal({
            open: true,
            content: address
          })}/>
        </span>
        }
      </div>
    </article>
  );
}
