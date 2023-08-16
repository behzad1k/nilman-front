import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {Controller} from 'react-hook-form';

type option = {
  value: string;
};

type Props = {
  name: string;
  label: string;
  defaultValue: string | number;
  control: any;
  options: option[];
};

export default function SelectInput({
  name,
  label,
  control,
  defaultValue,
  options,
}: Props) {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, value = defaultValue}}) => (
          <Select size="small" onChange={onChange} value={value} variant="standard">
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
