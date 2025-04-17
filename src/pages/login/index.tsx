import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/scroll.css';
import { useAppDispatch } from '../../services/redux/store';
import globalType from '../../types/globalType';
import { CompleteProfileStep } from './Steps/CompleteProfileStep';
import { OtpVerificationStep } from './Steps/OtpVerificationStep';
import { PhoneNumberStep } from './Steps/PhoneNumberStep';

export default function Login(): JSX.Element {
  const [loginState, setLoginState] = useState<globalType.LoginState>(
    (sessionStorage.getItem('login-step') as globalType.LoginState) || 'otp'
  );

  const formRef = useRef<HTMLFormElement | null>(null);
  const tokenRef = useRef<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formMethods = useForm<globalType.LoginForm>();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'OTPCredential' in window) {
      const ac = new AbortController();

      navigator.credentials
      .get({
        otp: { transport: ['sms'] },
        signal: ac.signal
      } as any)
      .then((otp: any) => {
        formMethods.setValue('otp', otp.code);
        ac.abort();
      })
      .catch(() => {
        ac.abort();
      });
    }
  }, [formMethods.setValue]);

  return (
    <main>
      <div className="login-container">
        <form
          onSubmit={formMethods.handleSubmit(() => {
          })}
          ref={formRef}
        >
          <div className="login-block">
          </div>
            {loginState === 'phoneNumber' && (
              <PhoneNumberStep
                formMethods={formMethods}
                setLoginState={setLoginState}
                tokenRef={tokenRef}
                dispatch={dispatch}
              />
            )}

            {loginState === 'otp' && (
              <OtpVerificationStep
                formMethods={formMethods}
                setLoginState={setLoginState}
                tokenRef={tokenRef}
                dispatch={dispatch}
                navigate={navigate}
              />
            )}

            {loginState === 'complete-profile' && (
              <CompleteProfileStep
                formMethods={formMethods}
                dispatch={dispatch}
                navigate={navigate}
              />
            )}
        </form>

      </div>
    </main>
  );
}
