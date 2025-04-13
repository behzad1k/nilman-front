import {
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  MenuItem,
} from '@mui/material';
import { forwardRef, ForwardedRef } from 'react';
import { Controller } from 'react-hook-form';

// Create a proper interface that extends SelectProps
interface Props extends Omit<SelectProps, 'ref'> {
  name: string;
  label: string;
  defaultValue: string | number;
  control: any;
  customOnChange?: (val: any) => void;
  children: any;
}

export const SelectInput = forwardRef(function SelectInput(
  {
    name,
    label,
    control,
    defaultValue,
    customOnChange,
    children,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  console.log('defaults:', defaultValue);
  return (
    <FormControl>
      <InputLabel id={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value = defaultValue } }) => {
          console.log('value is:', value);
          const handleOnChange = (event) => {
            if (customOnChange) customOnChange(event);
            console.log('here');
            return onChange(event);
          };

          // Only pass valid props to Select
          const {
            // Remove any props that might cause type conflicts
            margin,
            variant,
            ...validSelectProps
          } = props;

          return (
            <Select
              labelId={name}
              id={name}
              size="small"
              onChange={handleOnChange}
              value={value}
              label={label}
              ref={ref}
              {...validSelectProps}
            >
              {children}
            </Select>
          );
        }}
      />
    </FormControl>
  );
});
