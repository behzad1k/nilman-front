import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo, useRef } from 'react';

// Define drawer position types
type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

// Define the drawer component registry type
interface DrawerComponentRegistry {
  [key: string]: {
    component: React.ComponentType<any>;
  };
}

// Define the drawer context type
interface DrawerContextType {
  isOpen: boolean;
  activeComponentId: string | null;
  position: DrawerPosition;
  durationTime: number;
  openDrawer: <T extends Record<string, any>>(
    componentId: string,
    props?: T,
    position?: DrawerPosition,
    transitionDuration?: number
  ) => void;
  closeDrawer: () => void;
  registerComponent: (id: string, component: React.ComponentType<any>) => void;
  getProps: <T>() => T | null;
}

// Create the drawer context
const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

// Create the component registry
const componentRegistry: DrawerComponentRegistry = {};

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);
  const [position, setPosition] = useState<DrawerPosition>('bottom');
  const [durationTime, setDurationTime] = useState(500);

  // Use a ref for props to avoid unnecessary re-renders
  // This will store the actual props object reference
  const propsRef = useRef<Record<string, any> | null>(null);

  // Register a component in the registry
  const registerComponent = useCallback((id: string, component: React.ComponentType<any>) => {
    componentRegistry[id] = { component };
  }, []);

  // Open the drawer with the specified component
  const openDrawer = useCallback(<T extends Record<string, any>>(
    componentId: string,
    props: T = {} as T,
    position: DrawerPosition = 'bottom',
    durationTime: number = 500
  ) => {
    if (!componentRegistry[componentId]) {
      console.error(`Component with ID "${componentId}" not found in registry`);
      return;
    }

    // Store the props reference
    propsRef.current = props;

    setActiveComponentId(componentId);
    setPosition(position);
    setDurationTime(durationTime);
    setIsOpen(true);
  }, []);

  // Close the drawer
  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Get the current props
  const getProps = useCallback((): any => {
    return propsRef.current as any;
  }, []);

  // Clear component ID after drawer closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setActiveComponentId(null);
        propsRef.current = null;
      }, durationTime);
      return () => clearTimeout(timer);
    }
  }, [isOpen, durationTime]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    isOpen,
    activeComponentId,
    position,
    durationTime,
    openDrawer,
    closeDrawer,
    registerComponent,
    getProps
  }), [
    isOpen,
    activeComponentId,
    position,
    durationTime,
    openDrawer,
    closeDrawer,
    registerComponent,
    getProps
  ]);

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
};

// Custom hook to use the drawer
export const useDrawer = (): DrawerContextType => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};

// Hook to register a component for use in the drawer
export const useRegisterDrawerComponent = (id: string, component: React.ComponentType<any>) => {
  const { registerComponent } = useDrawer();

  useEffect(() => {
    registerComponent(id, component);
  }, [id, component, registerComponent]);
};

// Get a component from the registry
export const getDrawerComponent = (id: string): React.ComponentType<any> | null => {
  return componentRegistry[id]?.component || null;
};
