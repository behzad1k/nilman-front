import {Controller} from 'react-hook-form';
import {MuiOtpInput, MuiOtpInputProps} from 'mui-one-time-password-input';

interface Props extends MuiOtpInputProps {
  name: string;
  control: any;
}

export function OtpInput({name, control, ...props}: Props) {
  const validateChar = (value: string, index: number) => {
    return value !== '' && !isNaN(Number(value));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <MuiOtpInput
          {...field}
          length={6}
          dir="ltr"
          autoFocus
          TextFieldsProps={{
            autoComplete: 'one-time-code',
            placeholder: '-',
            type: 'number',
            inputProps: {
              inputMode: 'numeric',
              pattern: '[0-9]*'
            }
          }}
          validateChar={validateChar}
          {...props}
        />
      )}
    />
  );
}
