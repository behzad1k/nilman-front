import React from 'react';
import { useAppSelector } from '../../services/redux/store';

export function ProfileCard() {
  const profile = useAppSelector((state) => state.userReducer.data);

  return (
    <section className="infoBox">
      <h4>پروفایل</h4>
      <div className="profileCardContainer">
        <div className="profileCardDetails">
          <span className="iconInput">
            {profile.name + " " + profile.lastName || 'نام خانوادگی'}
          </span>
          <span className="iconInput">
            {profile.nationalCode || 'کد ملی'}
          </span><span className="iconInput">
            {profile.phoneNumber || 'شماره تلفن'}
          </span>
        </div>
        <div className="profileCardPicture">
          <span className="profilePicture">
          <img src={profile.profilePic?.url || '/img/girl.png'}/>
        </span>
        </div>
      </div>
    </section>
  );
}
