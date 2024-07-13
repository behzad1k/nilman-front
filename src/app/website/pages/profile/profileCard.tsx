import { Camera, PencilLine, SignOut } from '@phosphor-icons/react';
import React, {useEffect, useRef, useState} from 'react';
import {logout} from '../../../../services/apis/global.ts';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';
import {useAppDispatch, useAppSelector} from '../../../../services/redux/store.ts';
import {SET_LOADING} from '../../../../services/redux/reducers/loadingSlice.ts';
import {useNavigate} from 'react-router-dom';

export function ProfileCard() {
  const profile = useAppSelector((state) => state.userReducer.data);
  console.log(profile);
  return (
    <section className="infoBox">
      <h4>پروفایل</h4>
      <div className="profileCardContainer">
        <div className="profileCardDetails">
          <span className="iconInput">
            {profile.name || 'نام'}
            {/* <PencilLine */}
            {/*   onClick={() => { */}
            {/*     // setNameDisabled(false); */}
            {/*     navigate('/profile/edit') */}
            {/*   }} */}
            {/* /> */}
          </span>
          <span className="iconInput">
            {profile.lastName || 'نام خانوادگی'}
            {/* <PencilLine */}
            {/*   onClick={() => { */}
            {/*     // setLastNameDisabled(false); */}
            {/*     navigate('/profile/edit'); */}
            {/*   }} */}
            {/* /> */}
          </span>
          <span className="iconInput">
            {profile.nationalCode || 'کد ملی'}
            {/* <PencilLine */}
            {/*   onClick={() => { */}
            {/*     // setSocialIdDisabled(false); */}
            {/*     navigate('/profile/edit') */}
            {/*   }} */}
            {/* /> */}
          </span>
        </div>
        <div className="profileCardPicture">
          <span className="profilePicture">
          <img src="/img/girl.png" />
          <span className="pfpButtons">
            <Camera className="camera" size={32} />
          </span>
        </span>
        </div>
      </div>
    </section>
  );
}
