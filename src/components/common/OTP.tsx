import { ReactElement, useEffect, useRef, useState } from 'react';
import {Controller} from 'react-hook-form';
import {MuiOtpInput, MuiOtpInputProps} from 'mui-one-time-password-input';
interface Props extends MuiOtpInputProps {
  name: string;
  control: any;
}

export function OTP({ code, setCode, onComplete }) {
  const firstInput = useRef(null);
  const formRef = useRef(null);
  const setCodeData = (e: any) => {
    const value = e.target.value.slice(0, 1);
    setCode((prevCode) => {
      const newValue = [...prevCode];
      if(e.target.value) {
        [...e.target?.value]?.map((f, i) => {
          newValue[Number(e.target?.name) + i] = f;
        });
      }else{
        newValue[Number(e.target?.name)] = ''
      }
      return newValue;
    });
    const form = e.target.form;
    const index = [...form].indexOf(e.target);
    if (index < 5 && value !== '' && e.target.name !== 5) {
      form.elements[index + 1].focus();
      form.elements[index + 1].select();
    }
  }
  const list = () => {
    const rows: ReactElement[] = []

    Array.from({length: 6}).map((e, index) => rows.push(<input className='otpInput' type='number'
                                                               // onPaste={handlePaste}
                                                               ref={index == 0 ? firstInput : null} key={index} name={index.toString()} autoFocus={index == 0} autoComplete={index == 0 ? 'one-time-code' : undefined} onChange={(e) => setCodeData(e)}/>))

    return rows;
  }

  useEffect(() => {
    if (code && Array.isArray(code) && code?.length == 6 && formRef?.current?.children?.length > 0) {
      code?.map((e, i) => [...Array.from(formRef.current.children) as any[]][i].value = e);
    }
  }, [code]);

  useEffect(() => {
    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  const handlePaste = (e) => {
    event.preventDefault()
    setCode(prev => {
      let newCode = [];
      [...((e.clipboardData).getData("text") || (e.clipboardData).getData("text/plain"))].map((e,i) => newCode[i] = e)
      return newCode;
    })
  };

  useEffect(() => {
    if (code?.length == 6) {
      onComplete()
    }
  }, [code]);
  return (
    <div className='otpContainer' ref={formRef}>
      {list()}
    </div>
  )
  // return (
  //   <Controller
  //     name={name}
  //     control={control}
  //     render={({field, fieldState}) => (
  //       <MuiOtpInput
  //         {...field}
  //         length={6}
  //         dir="ltr"
  //         autoFocus
  //         TextFieldsProps={{
  //           autoComplete: 'one-time-code',
  //           placeholder: '-',
  //           type: 'number',
  //           inputProps: {
  //             inputMode: 'numeric',
  //             pattern: '[0-9]*'
  //           }
  //         }}
  //         validateChar={validateChar}
  //         {...props}
  //       />
  //     )}
  //   />
  // );
}