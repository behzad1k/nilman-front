// @ts-nocheck
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  StandardTextFieldProps,
} from '@mui/material';
import {Controller} from 'react-hook-form';

type option = {
  slug: string;
  value: string;
};

interface Props extends StandardTextFieldProps {
  name: string;
  label: string;
  defaultValue: string | number;
  control: any;
  options: option[];
  customOnChange?: (val: any) => void;
}

export function SelectInput({
  name,
  label,
  control,
  defaultValue,
  options,
  customOnChange,
  ...props
}: Props) {
  return (
    <FormControl>
      <InputLabel id={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({field: {onChange, value = defaultValue}}) => {
          const handleOnChange = (event) => {
            if (customOnChange) customOnChange(event);
            return onChange(event);
          };
          return (
            <Select
              labelId={name}
              id={name}
              size="small"
              onChange={handleOnChange}
              value={value}
              label={label}
              {...props}
            >
              <MenuItem key={null} value="">
                انتخاب نشده
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option.slug} value={option.slug}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          );
        }}
      />
    </FormControl>
  );
}
