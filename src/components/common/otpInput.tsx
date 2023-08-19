import {Controller} from 'react-hook-form';
import {MuiOtpInput, MuiOtpInputProps} from 'mui-one-time-password-input';

interface Props extends MuiOtpInputProps {
  name: string;
  control: any;
}

export function OtpInput({name, control, ...props}: Props) {
  const validateChar = (value: string, index: number) => {
    console.log(value, index);
    return value !== '' && !isNaN(Number(value));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <MuiOtpInput
          {...field}
          length={4}
          dir="ltr"
          autoFocus
          TextFieldsProps={{placeholder: '-'}}
          validateChar={validateChar}
          {...props}
        />
      )}
    />
  );
}
