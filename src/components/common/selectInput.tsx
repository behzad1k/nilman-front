// @ts-nocheck
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  StandardTextFieldProps,
} from '@mui/material';
import {forwardRef} from 'react';
import {Controller} from 'react-hook-form';
import {ForwardRef} from 'react-is';
interface Props extends StandardTextFieldProps {
  name: string;
  label: string;
  defaultValue: string | number;
  control: any;
  customOnChange?: (val: any) => void;
  children: any;
}

export const SelectInput = forwardRef(function SelectInput({
  name,
  label,
  control,
  defaultValue,
  customOnChange,
  children,
  ref,
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
              ref={ref}
              {...props}
            >
              {children}
            </Select>
          );
        }}
      />
    </FormControl>
  );
});
