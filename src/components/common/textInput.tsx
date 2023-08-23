import {Controller} from 'react-hook-form';

import {TextField, StandardTextFieldProps} from '@mui/material';

interface Props extends StandardTextFieldProps {
  name: string;
  label: string;
  control: any;
  defaultValue: string | number;
}

export function TextInput({name, label, control, defaultValue, ...props}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: {onChange, value = defaultValue},
        fieldState: {error},
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          {...props}
        />
      )}
    />
  );
}
