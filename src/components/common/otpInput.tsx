import { useState } from 'react';
import {Controller} from 'react-hook-form';
import {MuiOtpInput, MuiOtpInputProps} from 'mui-one-time-password-input';
import OTPInput from 'react-otp-input';

interface Props extends MuiOtpInputProps {
  name: string;
  control: any;
}

export function OtpInput({name, control, ...props}: Props) {
  const [val, setVal] = useState('');
  const validateChar = (value: string, index: number) => {
    return value !== '' && !isNaN(Number(value));
  };

  return (
    <div>
      <OTPInput inputStyle={{width: 80, height: 60}} numInputs={6} onChange={(otp) => setVal(otp)} renderInput={(props, index) => <input autoFocus={index == 0} autoComplete='one-time-code' style='width:80px' {...props} />} />
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
