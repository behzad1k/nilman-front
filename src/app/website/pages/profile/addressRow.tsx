import React from "react";
import { HouseLine, MapTrifold, PhoneDisconnect } from "@phosphor-icons/react";

export function AddressRow() {
  return (
      <article className="addressContainer">
        <div className="addressDetails">
          <span className="orderItem">
            <HouseLine/>
            <p>خانه محمود</p>
          </span>
          <span className="orderItem">
            <PhoneDisconnect/>
            <p>۰۲۱-۲۱۳۳۲۵۲</p>
          </span>
          <span className="orderItem">
            <MapTrifold/>
            <p>فرمانیه فرمانیه فرمانیه فرمانیه فرمانیه فرمانیه فرمانیه فرمانیه فرمانیه فرمانیه </p>
          </span>
        </div>
        <div className="addressMap">
          <span>
            <img src='./src/assets/img/map.png' />
          </span>
        </div>
      </article>
  );
}