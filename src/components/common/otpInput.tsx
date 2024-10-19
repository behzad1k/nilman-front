import { OTPInput, SlotProps } from 'input-otp';
import { ReactElement, useState } from 'react';
import {Controller} from 'react-hook-form';
import {MuiOtpInput, MuiOtpInputProps} from 'mui-one-time-password-input';
interface Props extends MuiOtpInputProps {
  name: string;
  control: any;
}

export function OtpInput({name, control, ...props}: Props) {
  const [code, setCode] = useState([]);
  const setCodeData = (e: any) => {
    const value = e.target.value.slice(0, 1);
    setCode((prevCode) => {
      const newValue = [...prevCode];
      [...e.target?.value]?.map((f, i) => {
        if(!isNaN(Number(f))) newValue[Number(e.target?.name) + i] = f
      })
      return newValue;
    });

    const form = e.target.form;
    const index = [...form].indexOf(e.target);
    if (index < 6 && value !== '' && e.target.name !== 6) {
      form.elements[index + 1].focus();
      form.elements[index + 1].select();
    }
  }
  const list = () => {
    const rows: ReactElement[] = []

    Array.from({length: 6}).map((e, index) => rows.push(<input type='number' className='otpInput' key={index} name={index.toString()} autoFocus={index == 0} value={code[index]} autoComplete='one-time-code' onChange={(e) => setCodeData(e)}/>))

    return rows;
  }

  return (
    <div className='otpContainer'>
      {/* <OTPInput maxLength={6} render={({slots})  => <> */}
      {/*   <div className="flex"> */}
      {/*     {slots.slice(0, 3).map((slot, idx) => ( */}
      {/*       <Slot key={idx} {...slot} /> */}
      {/*     ))} */}
      {/*   </div> */}

      {/*   <FakeDash /> */}

      {/*   <div className="flex"> */}
      {/*     {slots.slice(3).map((slot, idx) => ( */}
      {/*       <Slot key={idx} {...slot} /> */}
      {/*     ))} */}
      {/*   </div> */}
      {/* </>} /> */}
      {list()}
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
function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'relative w-10 h-14 text-[2rem]',
        'flex items-center justify-center',
        'transition-all duration-300',
        'border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md',
        'group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20',
        'outline outline-0 outline-accent-foreground/20',
        { 'outline-4 outline-accent-foreground': props.isActive },
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  )
}

// You can emulate a fake textbox caret!
function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 bg-white" />
    </div>
  )
}

// Inspired by Stripe's MFA input.
function FakeDash() {
  return (
    <div className="flex w-10 justify-center items-center">
      <div className="w-3 h-1 rounded-full bg-border" />
    </div>
  )
}

// tailwind.config.ts for the blinking caret animation.
const config = {
  theme: {
    extend: {
      keyframes: {
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'caret-blink': 'caret-blink 1.2s ease-out infinite',
      },
    },
  },
}

// Small utility to merge class names.
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}