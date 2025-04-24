import React, { useEffect, useState } from 'react';
import { checkForUpdates, updateServiceWorker, UpdateInfo } from '../config/versionCheck';

const UpdateNotifier: React.FC = () => {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Check for updates when the component mounts
    const checkUpdate = async () => {
      try {
        const info = await checkForUpdates();
        if (info.isUpdateAvailable) {
          setUpdateInfo(info);
        }
      } catch (error) {
        console.error('Failed to check for updates:', error);
      }
    };

    checkUpdate();

    // Check for updates every 60 minutes
    const intervalId = setInterval(checkUpdate, 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateServiceWorker();
      // The page will reload automatically after the update
    } catch (error) {
      console.error('Failed to update:', error);
      setIsUpdating(false);
    }
  };

  if (!updateInfo?.isUpdateAvailable) return null;

  return (
    <div className="update-notification">
      <p>A new version is available! ({updateInfo.currentVersion})</p>
      <button
        onClick={handleUpdate}
        disabled={isUpdating}
      >
        {isUpdating ? 'Updating...' : 'Update Now'}
      </button>
    </div>
  );
};

export default UpdateNotifier;
