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

  const handleLogout = () => {
    sessionStorage.removeItem('new-order');
    sessionStorage.removeItem('step');
    logout(dispatch);
    navigate('/login');
  };

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
            <input
              placeholder={name ? name : 'نام'}
              className="profileCardInput"
              disabled={nameDisabled}
              ref={nameRef}
              onBlur={(e) => {
                e.target.value != name &&
                  confirm('آیا مطمئن هستید؟') &&
                  setName(e.target.value);
                e.target.value = '';
                setNameDisabled(true);
              }}
            />
            <PencilLine
              onClick={() => {
                setNameDisabled(false);
              }}
            />
          </span>
          <span className="iconInput">
            <input
              placeholder={lastName ? lastName : 'نام خانوادگی'}
              className="profileCardInput"
              disabled={lastNameDisabled}
              ref={lastNameRef}
              onBlur={(e) => {
                e.target.value != lastName &&
                  confirm('آیا مطمئن هستید؟') &&
                  setLastName(e.target.value);
                e.target.value = '';
                setLastNameDisabled(true);
              }}
            />
            <PencilLine
              onClick={() => {
                setLastNameDisabled(false);
              }}
            />
          </span>
          <span className="iconInput">
            <input
              placeholder={socialId ? socialId : 'کد ملی'}
              className="profileCardInput"
              disabled={socialIdDisabled}
              ref={socialIdRef}
              onBlur={(e) => {
                e.target.value != socialId &&
                  confirm('آیا مطمئن هستید؟') &&
                  setSocialId(e.target.value);
                e.target.value = '';
                setSocialIdDisabled(true);
              }}
            />
            <PencilLine
              onClick={() => {
                setSocialIdDisabled(false);
              }}
            />
          </span>
        </div>
        <div className="profileCardPicture">
          <span className="profilePicture">
            <img src="/img/girl.png" />
            <span className="pfpButtons">
              <SignOut
                weight={'bold'}
                onClick={handleLogout}
                className="logout"
                size={32}
                color={'#e85959'}
              />
              <PencilLine className="edit" size={32} />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
