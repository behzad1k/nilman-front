import { ReactElement, useState } from 'react';
import {Controller} from 'react-hook-form';
import {MuiOtpInput, MuiOtpInputProps} from 'mui-one-time-password-input';
interface Props extends MuiOtpInputProps {
  name: string;
  control: any;
}

export function OtpInput({name, control, ...props}: Props) {
  const [code, setCode] = useState([]);
  const setCodeData = (e: any) => {
    const value = e.target.value.slice(0, 1);
    setCode((prevCode) => {
      const newValue = [...prevCode];
      [...e.target?.value]?.map((f, i) => {
        if(!isNaN(Number(f))) newValue[Number(e.target?.name) + i] = f
      })
      return newValue;
    });

    const form = e.target.form;
    const index = [...form].indexOf(e.target);
    if (index < 6 && value !== '' && e.target.name !== 6) {
      form.elements[index + 1].focus();
      form.elements[index + 1].select();
    }
  }
  const list = () => {
    const rows: ReactElement[] = []

    Array.from({length: 6}).map((e, index) => rows.push(<input className='otpInput' key={index} name={index.toString()} autoFocus={index == 0} value={code[index]} autoComplete={index == 0 ? 'one-time-code' : undefined} onChange={(e) => setCodeData(e)}/>))

    return rows;
  }

  return (
    <div className='otpContainer'>
      {/* <OTPInput maxLength={6} render={({slots})  => <> */}
      {/*   <div className="flex"> */}
      {/*     {slots.slice(0, 3).map((slot, idx) => ( */}
      {/*       <Slot key={idx} {...slot} /> */}
      {/*     ))} */}
      {/*   </div> */}

      {/*   <FakeDash /> */}

      {/*   <div className="flex"> */}
      {/*     {slots.slice(3).map((slot, idx) => ( */}
      {/*       <Slot key={idx} {...slot} /> */}
      {/*     ))} */}
      {/*   </div> */}
      {/* </>} /> */}
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