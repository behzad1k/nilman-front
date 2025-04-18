import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/redux/store';
import globalType from '../../types/globalType';
import { CompleteProfileStep } from '../views/Login/CompleteProfileStep';
import { OtpVerificationStep } from '../views/Login/OtpVerificationStep';
import { PhoneNumberStep } from '../views/Login/PhoneNumberStep';

const LoginDrawer: React.FC = () => {
  const [loginState, setLoginState] = useState<globalType.LoginState>(
    (sessionStorage.getItem('login-step') as globalType.LoginState) || 'phoneNumber'
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
    <main className="login-container">
      <form className="w-h-100pr"
        onSubmit={formMethods.handleSubmit(() => {})}
        ref={formRef}
      >
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
    </main>
  );
};

export default LoginDrawer;
