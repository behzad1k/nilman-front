import {HouseLine, MapTrifold, PhoneDisconnect} from '@phosphor-icons/react';
import {IAddress} from '../../../../services/types.ts';

export function AddressRow({address}: {address: IAddress}) {
  return (
    <article className="addressContainer">
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
