import {ProfilePicture} from '../../../../components';
import {PencilLine} from '@phosphor-icons/react';
import {useEffect, useRef, useState} from 'react';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';

type Props = {
  initName: string;
  initLastName: string;
  initNationalCode: string;
};

export function ProfileCard({initName, initLastName, initNationalCode}: Props) {
  const [nameDisabled, setNameDisabled] = useState(true);
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(initName);
  const [lastNameDisabled, setLastNameDisabled] = useState(true);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [lastName, setLastName] = useState(initLastName);
  const [socialIdDisabled, setSocialIdDisabled] = useState(true);
  const socialIdRef = useRef<HTMLInputElement>(null);
  const [socialId, setSocialId] = useState(initNationalCode);

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
    const updateUser = async () => {
      const reqOptions = {
        method: 'put',
        body: {
          name,
          lastName,
          nationalCode: socialId,
        },
      };
      const res = await api(urls.updateSimpleUser, reqOptions, true);
      console.log(res);
    };
    updateUser();
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
          <ProfilePicture imgSrc={'/img/girl.png'} />
        </div>
      </div>
    </section>
  );
}
