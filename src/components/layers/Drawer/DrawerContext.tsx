import React, { createContext, useContext, useState, ReactNode } from 'react';

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

interface DrawerContextType {
  isOpen: boolean;
  content: ReactNode | null;
  position: DrawerPosition;
  openDrawer: (content: ReactNode, position?: DrawerPosition, transitionDuration?: number) => void;
  closeDrawer: () => void;
  durationTime: number
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [position, setPosition] = useState<DrawerPosition>('right');
  const [durationTime, setDurationTime] = useState(500);

  const openDrawer = (content: ReactNode, position: DrawerPosition = 'right', durationTime: number = 500) => {
    setContent(content);
    setPosition(position);
    setIsOpen(true);
    setDurationTime(durationTime)
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, content, position, openDrawer, closeDrawer, durationTime }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = (): DrawerContextType => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
