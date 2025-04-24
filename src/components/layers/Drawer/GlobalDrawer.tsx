import React from 'react';
import { useDrawer } from './DrawerContext';
import CustomDrawer from './CustomDrawer';
import DrawerContentWrapper from './DrawerContentWrapper';

// Define animation presets
export const DRAWER_ANIMATIONS = {
  SLIDE: 'slide',
  FADE: 'fade',
  SCALE: 'scale',
  REVEAL: 'reveal'
};

const GlobalDrawer: React.FC = () => {
  const {
    isOpen,
    activeComponentId,
    position,
    closeDrawer,
    durationTime,
    getProps
  } = useDrawer();

  // Get animation settings from props if available
  const props: any = getProps() || {};
  const {
    animationType = DRAWER_ANIMATIONS.SLIDE,
    backdropColor,
    backdropOpacity,
    width,
    height,
    borderRadius
  } = props.drawerSettings || {};

  return (
    <CustomDrawer
      open={isOpen}
      onClose={closeDrawer}
      position={position}
      transitionDuration={durationTime}
      animationType={animationType}
      backdropColor={backdropColor}
      backdropOpacity={backdropOpacity}
      width={width}
      height={height}
      borderRadius={borderRadius}
    >
      <DrawerContentWrapper componentId={activeComponentId} />
    </CustomDrawer>
  );
};

export default GlobalDrawer;
