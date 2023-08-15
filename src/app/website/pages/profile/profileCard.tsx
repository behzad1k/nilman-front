import { ProfilePicture } from "../../components";
import { PencilLine } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";

export function ProfileCard() {
  const [nameDisabled, setNameDisabled] = useState(true);
  const nameRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [lastNameDisabled, setLastNameDisabled] = useState(true);
  const lastNameRef = useRef<HTMLInputElement>(null)
  const [lastName, setLastName] = useState('')
  const [socialIdDisabled, setSocialIdDisabled] = useState(true);
  const socialIdRef = useRef<HTMLInputElement>(null)
  const [socialId, setSocialId] = useState('')

  useEffect(() => {
    !nameDisabled && nameRef.current?.focus()
  }, [nameDisabled]);

  useEffect(() => {
    !lastNameDisabled && lastNameRef.current?.focus()
  }, [lastNameDisabled]);

  useEffect(() => {
    !socialIdDisabled && socialIdRef.current?.focus()
  }, [socialIdDisabled]);

  return (
      <section className="infoBox">
        <h4>پروفایل</h4>
        <div className="profileCardContainer">
          <div className="profileCardDetails">
            <span className="iconInput">
              <input
                  placeholder={name == '' ? 'نام' : name}
                  className="profileCardInput"
                  disabled={nameDisabled}
                  ref={nameRef}
                  onBlur={(e) => {
                    e.target.value != name && confirm('آیا مطمئن هستید؟') && setName(e.target.value)
                    e.target.value = ''
                    setNameDisabled(true)
                  }}
              />
              <PencilLine onClick={() => {
                setNameDisabled(false)
              }}/>
            </span>
            <span className="iconInput">
              <input
                  placeholder={lastName == '' ? 'نام خانوادگی' : lastName}
                  className="profileCardInput"
                  disabled={lastNameDisabled}
                  ref={lastNameRef}
                  onBlur={(e) => {
                    e.target.value != lastName && confirm('آیا مطمئن هستید؟') && setLastName(e.target.value)
                    e.target.value = ''
                    setLastNameDisabled(true)
                  }}
              />
              <PencilLine onClick={() => {
                setLastNameDisabled(false)
              }}/>
            </span>
            <span className="iconInput">
              <input
                  placeholder={socialId == '' ? 'کد ملی' : socialId}
                  className="profileCardInput"
                  disabled={socialIdDisabled}
                  ref={socialIdRef}
                  onBlur={(e) => {
                    e.target.value != socialId && confirm('آیا مطمئن هستید؟') && setSocialId(e.target.value)
                    e.target.value = ''
                    setSocialIdDisabled(true)
                  }}
              />
              <PencilLine onClick={() => {
                setSocialIdDisabled(false)
              }}/>
            </span>
          </div>
          <div className="profileCardPicture">
            <ProfilePicture imgSrc={'./src/assets/img/girl.png'}/>
          </div>
        </div>
      </section>  );
}