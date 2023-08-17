import {Controller} from 'react-hook-form';

import {TextField} from '@mui/material';

type Props = {
  name: string;
  label: string;
  control: any;
  defaultValue: string | number;
};

export default function TextInput({name, label, control, defaultValue}: Props) {
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
        />
      )}
    />
  );
}
