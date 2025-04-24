import React, { useState, useEffect, useRef } from 'react';
import { useDrawer, getDrawerComponent } from './DrawerContext';
import isEqual from 'lodash/isEqual'; // Add this dependency if you don't have it

interface DrawerContentWrapperProps {
  componentId: string | null;
}

const DrawerContentWrapper: React.FC<DrawerContentWrapperProps> = ({ componentId }) => {
  const { getProps, isOpen } = useDrawer();
  const [, forceUpdate] = useState({});
  const previousPropsRef = useRef<any>(null);
  const checkIntervalRef = useRef<number | null>(null);

  // Function to check if props have changed
  const checkForPropsChanges = () => {
    const currentProps: any = getProps();

    // Only update if props have actually changed (deep comparison)
    if (!isEqual(currentProps, previousPropsRef.current)) {
      previousPropsRef.current = currentProps ? { ...currentProps } : null;
      forceUpdate({});
    }
  };

  // Set up the interval for checking props changes
  useEffect(() => {
    if (!isOpen || !componentId) {
      // Clear interval when drawer is closed
      if (checkIntervalRef.current !== null) {
        window.clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
      return;
    }

    // Store initial props
    previousPropsRef.current = getProps() ? { ...getProps()! } : null;

    // Check for changes at a reasonable interval (300ms)
    checkIntervalRef.current = window.setInterval(checkForPropsChanges, 300);

    return () => {
      if (checkIntervalRef.current !== null) {
        window.clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
    };
  }, [isOpen, componentId, getProps]);

  // Also check for changes on specific events that might update state
  useEffect(() => {
    const handlePotentialStateChange = () => {
      if (isOpen && componentId) {
        checkForPropsChanges();
      }
    };

    // Listen for events that might indicate state changes
    window.addEventListener('mouseup', handlePotentialStateChange);
    window.addEventListener('touchend', handlePotentialStateChange);
    window.addEventListener('keyup', handlePotentialStateChange);

    return () => {
      window.removeEventListener('mouseup', handlePotentialStateChange);
      window.removeEventListener('touchend', handlePotentialStateChange);
      window.removeEventListener('keyup', handlePotentialStateChange);
    };
  }, [isOpen, componentId]);

  if (!componentId) return null;

  const Component = getDrawerComponent(componentId);
  if (!Component) return null;

  const props: any = getProps() || {};

  return <Component {...props} />;
};

export default DrawerContentWrapper;
