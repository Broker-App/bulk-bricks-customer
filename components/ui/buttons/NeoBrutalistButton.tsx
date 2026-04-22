'use client';

import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import styles from './NeoBrutalistButton.module.css';

/* Button variant types */
export type BrutalistButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'danger';

export type BrutalistButtonSize = 
  | 'small' 
  | 'medium' 
  | 'large';

/* Button props interface */
export interface NeoBrutalistButtonProps 
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'as'> {
  variant?: BrutalistButtonVariant;
  size?: BrutalistButtonSize;
  fullWidth?: boolean;
  auto?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
  rounded?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

/* Base classes */
const baseClasses = [
  styles.button,
];

/* Variant classes */
const variantClasses: Record<BrutalistButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
  ghost: styles.ghost,
  danger: styles.danger,
};

/* Size classes */
const sizeClasses: Record<BrutalistButtonSize, string> = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

/* Component implementation */
const NeoBrutalistButton = forwardRef<HTMLButtonElement, NeoBrutalistButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      auto = false,
      isLoading = false,
      disabled = false,
      iconOnly = false,
      rounded = false,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    /* Build className string */
    const classes = cn(
      ...baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      {
        [styles.fullWidth]: fullWidth,
        [styles.loading]: isLoading,
        [styles.disabled]: disabled || isLoading,
        [styles.iconOnly]: iconOnly,
        [styles.rounded]: rounded,
        [styles.roundedSmall]: rounded && size === 'small',
        [styles.auto]: auto,
      },
      className
    );

    /* Handle disabled state */
    const isDisabled = disabled || isLoading;

    /* Get the first child if asChild is true */
    if (asChild && React.isValidElement(children)) {
      const child = React.Children.only(children);
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
        ref,
        disabled: isDisabled,
        ...props,
        ...child.props,
      });
    }

    return (
      <button
        className={classes}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <div className={styles.loadingSpinner}>
            <Loader2 className={styles.spinner} />
          </div>
        )}
        
        {!isLoading && children}
      </button>
    );
  }
);

/* Display name for debugging */
NeoBrutalistButton.displayName = 'NeoBrutalistButton';

export default NeoBrutalistButton;
