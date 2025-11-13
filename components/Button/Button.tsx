'use client';

import clsx from 'clsx';
import css from './Button.module.css';

//===========================================================================

type Variant = 'normal' | 'cancel' | 'delete' | 'logout';

const map: Record<Variant, string> = {
  normal: 'btn btn--primary',
  cancel: 'btn btn--cancel',
  delete: 'btn btn--danger',
  logout: 'btn btn--logout',
};

//===========================================================================

interface ButtonProps {
  variant?: Variant;
  text: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
}

//===========================================================================

function Button({
  variant = 'normal',
  text,
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        map[variant],
        css.button,
        variant === 'delete' && css.delete
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
