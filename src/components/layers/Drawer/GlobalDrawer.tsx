import React from 'react';
import { SwipeableDrawer } from '@mui/material';
import { useDrawer } from './DrawerContext';

const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const GlobalDrawer: React.FC = () => {
  const { isOpen, content, position, closeDrawer, durationTime } = useDrawer();

  return (
    <SwipeableDrawer
      anchor={position}
      open={isOpen}
      onClose={closeDrawer}
      onOpen={() => {}}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      transitionDuration={durationTime}
      sx={{
        '.muirtl-fy2uxz': {
          background: 'rgba(0,0,0,0)'
        },
        '.muirtl-9emuhu-MuiPaper-root-MuiDrawer-paper': {
          background: 'rgba(0,0,0,0)'
        }
      }}
    >
      {content}
    </SwipeableDrawer>
  );
};

export default GlobalDrawer;
