import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {Controller} from 'react-hook-form';

type option = {
  slug: string;
  value: string;
};

type Props = {
  name: string;
  label: string;
  defaultValue: string | number;
  control: any;
  options: option[];
};

export function SelectInput({name, label, control, defaultValue, options}: Props) {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, value = defaultValue}}) => (
          <Select size="small" onChange={onChange} value={value} variant="standard">
            <MenuItem key={null} value="">
              انتخاب نشده
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option.slug} value={option.slug}>
                {option.value}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
