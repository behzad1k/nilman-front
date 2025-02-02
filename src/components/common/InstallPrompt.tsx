import { AddBoxOutlined, IosShare } from '@mui/icons-material';
import React from 'react';
import { useInstallPrompt } from '../../hooks/useInstallPrompt';

const InstallPrompt = () => {
  const { showPrompt, dismissPrompt } = useInstallPrompt();

  if (!showPrompt) return null;

  return (
    <div className="install-prompt-overlay" onClick={dismissPrompt}>
      <div className="install-prompt">
        <div className="install-prompt-content">
          <img
            src="/logo.png"
            alt="App Icon"
            className="install-prompt-icon"
          />
          <div className="install-prompt-text">
            <h3>وب اپلیکیشن نیلمان را روی دستگاه خود نصب کنید</h3>
            <div className="install-prompt-row">
              <IosShare color={'info'} width={60} height={60}/>
              <p>۱- در نوار پایین روی دکمه Share بزنید.</p>
            </div>
            <br/>
            <div className="install-prompt-row">
              <AddBoxOutlined color={'info'} />
              <p>۲- در منو باز شده گزینه Add to Home Screen را انتخاب کنید.</p>
            </div>
            <br/>
            <div className="install-prompt-row">
              <span className="">Add</span>
              <p>۳- در نهایت از منو بالا روی گزینه Add بزنید. </p>
            </div>
          </div>
          <div className="install-prompt-buttons">
            <button
              className="dismiss-button"
              onClick={dismissPrompt}
            >
              متوجه شدم
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
