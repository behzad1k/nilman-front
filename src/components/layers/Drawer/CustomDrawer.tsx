import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../../../assets/css/drawer.css';

// Animation types that can be selected
export type DrawerAnimationType = 'slide' | 'fade' | 'scale' | 'reveal';

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
  position: 'left' | 'right' | 'top' | 'bottom';
  transitionDuration: number;
  children: React.ReactNode;
  animationType?: DrawerAnimationType;
  backdropColor?: string;
  backdropOpacity?: number;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
                                                     open,
                                                     onClose,
                                                     position,
                                                     transitionDuration,
                                                     children,
                                                     animationType = 'slide',
                                                     backdropColor = 'rgba(0, 0, 0, .5)',
                                                     backdropOpacity = 1,
                                                     width,
                                                     height,
                                                     borderRadius
                                                   }) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle mounting
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle visibility state with proper animation timing
  useEffect(() => {
    if (open) {
      setIsRendered(true);
      // Small delay to ensure DOM is ready before animation starts
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      // Wait for the animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, transitionDuration);
      return () => clearTimeout(timer);
    }
  }, [open, transitionDuration]);

  // Handle body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle touch events for swipe to close
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(position === 'left' || position === 'right'
      ? e.targetTouches[0].clientX
      : e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentTouch = position === 'left' || position === 'right'
      ? e.targetTouches[0].clientX
      : e.targetTouches[0].clientY;

    setTouchEnd(currentTouch);

    // Calculate swipe distance
    let offset = touchStart - currentTouch;

    // Adjust offset based on drawer position
    if (position === 'right' || position === 'bottom') {
      offset = -offset;
    }

    // Only allow swiping in the correct direction to close
    if (offset > 0) {
      setIsSwiping(true);
      setSwipeOffset(offset);
    } else {
      setIsSwiping(false);
      setSwipeOffset(0);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > 50; // Minimum swipe distance

    if (isSwipe) {
      // Check if swipe direction matches drawer position for closing
      if (
        (position === 'left' && distance > 0) ||
        (position === 'right' && distance < 0) ||
        (position === 'top' && distance > 0) ||
        (position === 'bottom' && distance < 0)
      ) {
        onClose();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsSwiping(false);
    setSwipeOffset(0);
  };

  // Calculate dynamic styles
  const getDrawerStyle = () => {
    const style: React.CSSProperties = {
      transition: `transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    };

    // Set dimensions based on position
    if (position === 'left' || position === 'right') {
      style.width = width || '80%';
      style.maxWidth = width || '400px';
      style.height = '100%';
    } else {
      style.height = height || 'auto';
      style.maxHeight = height || '80%';
      style.width = '100%';
    }

    // Set border radius based on position
    if (position === 'top') {
      style.borderRadius = borderRadius || '0 0 8px 8px';
    } else if (position === 'bottom') {
      style.borderRadius = borderRadius || '8px 8px 0 0';
    } else if (position === 'left') {
      style.borderRadius = borderRadius || '0 8px 8px 0';
    } else if (position === 'right') {
      style.borderRadius = borderRadius || '8px 0 0 8px';
    }

    // Apply animation styles
    if (animationType === 'slide') {
      if (position === 'left') {
        style.transform = isVisible ? 'translateX(0)' : 'translateX(-100%)';
        if (isSwiping) {
          style.transform = `translateX(-${swipeOffset}px)`;
          style.transition = 'none';
        }
      } else if (position === 'right') {
        style.transform = isVisible ? 'translateX(0)' : 'translateX(100%)';
        if (isSwiping) {
          style.transform = `translateX(${swipeOffset}px)`;
          style.transition = 'none';
        }
      } else if (position === 'top') {
        style.transform = isVisible ? 'translateY(0)' : 'translateY(-100%)';
        if (isSwiping) {
          style.transform = `translateY(-${swipeOffset}px)`;
          style.transition = 'none';
        }
      } else if (position === 'bottom') {
        style.transform = isVisible ? 'translateY(0)' : 'translateY(100%)';
        if (isSwiping) {
          style.transform = `translateY(${swipeOffset}px)`;
          style.transition = 'none';
        }
      }
    } else if (animationType === 'fade') {
      style.opacity = isVisible ? 1 : 0;
      if (position === 'left') {
        style.left = 0;
        style.transform = 'translateX(0)';
      } else if (position === 'right') {
        style.right = 0;
        style.transform = 'translateX(0)';
      } else if (position === 'top') {
        style.top = 0;
        style.transform = 'translateY(0)';
      } else if (position === 'bottom') {
        style.bottom = 0;
        style.transform = 'translateY(0)';
      }
    } else if (animationType === 'scale') {
      style.opacity = isVisible ? 1 : 0;
      style.transform = isVisible ? 'scale(1)' : 'scale(0.8)';
      if (position === 'left') {
        style.transformOrigin = 'left center';
      } else if (position === 'right') {
        style.transformOrigin = 'right center';
      } else if (position === 'top') {
        style.transformOrigin = 'center top';
      } else if (position === 'bottom') {
        style.transformOrigin = 'center bottom';
      }
    } else if (animationType === 'reveal') {
      style.opacity = isVisible ? 1 : 0;
      if (position === 'left') {
        style.clipPath = isVisible
          ? 'inset(0 0 0 0)'
          : 'inset(0 100% 0 0)';
      } else if (position === 'right') {
        style.clipPath = isVisible
          ? 'inset(0 0 0 0)'
          : 'inset(0 0 0 100%)';
      } else if (position === 'top') {
        style.clipPath = isVisible
          ? 'inset(0 0 0 0)'
          : 'inset(100% 0 0 0)';
      } else if (position === 'bottom') {
        style.clipPath = isVisible
          ? 'inset(0 0 0 0)'
          : 'inset(0 0 100% 0)';
      }
    }

    return style;
  };

  // Calculate backdrop style
  const getBackdropStyle = (): React.CSSProperties => {
    return {
      backgroundColor: backdropColor,
      opacity: isVisible ? backdropOpacity : 0,
      transition: `opacity ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      visibility: isRendered ? 'visible' : 'hidden',
    };
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="custom-drawer-backdrop"
      onClick={handleBackdropClick}
      style={getBackdropStyle()}
    >
      <div
        ref={drawerRef}
        className={`custom-drawer-content ${position}`}
        style={getDrawerStyle()}
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default CustomDrawer;
