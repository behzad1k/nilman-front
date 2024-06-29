import {PencilLine, SignOut} from '@phosphor-icons/react';
import {useEffect, useRef, useState} from 'react';
import {logout} from '../../../../services/apis/global.ts';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';
import {useAppDispatch, useAppSelector} from '../../../../services/redux/store.ts';
import {SET_LOADING} from '../../../../services/redux/reducers/loadingSlice.ts';
import {useNavigate} from 'react-router-dom';

export function ProfileCard() {
  const profile = useAppSelector((state) => state.userReducer.data);
  const [nameDisabled, setNameDisabled] = useState(true);
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(profile.name);
  const [lastNameDisabled, setLastNameDisabled] = useState(true);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [lastName, setLastName] = useState(profile.lastName);
  const [socialIdDisabled, setSocialIdDisabled] = useState(true);
  const socialIdRef = useRef<HTMLInputElement>(null);
  const [socialId, setSocialId] = useState(profile.nationalCode);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const send = () => {
    const reqOptions = {
      method: 'put',
      body: {
        name,
        lastName,
        nationalCode: socialId,
      },
    };
    dispatch(SET_LOADING(true));
    const res = api(urls.updateSimpleUser, reqOptions, true);
    dispatch(SET_LOADING(false));
  };

  useEffect(() => {
    !nameDisabled && nameRef.current?.focus();
  }, [nameDisabled]);

  useEffect(() => {
    !lastNameDisabled && lastNameRef.current?.focus();
  }, [lastNameDisabled]);

  useEffect(() => {
    !socialIdDisabled && socialIdRef.current?.focus();
  }, [socialIdDisabled]);

  useEffect(() => {
    if ((name != '' && name != profile.name) || (lastName != '' && lastName != profile.lastName) || (socialId != '' && socialId != profile.nationalCode)) {
      send();
    }
  }, [name, lastName, socialId]);

  return (
    <section className="infoBox">
      <h4>پروفایل</h4>
      <div className="profileCardContainer">
        <div className="profileCardDetails">
          <span className="iconInput">
            {name || 'نام'}
            {/* <PencilLine */}
            {/*   onClick={() => { */}
            {/*     // setNameDisabled(false); */}
            {/*     navigate('/profile/edit') */}
            {/*   }} */}
            {/* /> */}
          </span>
          <span className="iconInput">
            {lastName || 'نام خانوادگی'}
            {/* <PencilLine */}
            {/*   onClick={() => { */}
            {/*     // setLastNameDisabled(false); */}
            {/*     navigate('/profile/edit'); */}
            {/*   }} */}
            {/* /> */}
          </span>
          <span className="iconInput">
            {socialId || 'کد ملی'}
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
            <img src={profile?.media?.url || '/img/girl.png'} />
          </span>
        </div>
      </div>
    </section>
  );
}
