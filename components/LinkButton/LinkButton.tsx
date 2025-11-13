'use client';

import Link from 'next/link';
import clsx from 'clsx';
import css from './LinkButton.module.css';

//===========================================================================

type Variant = 'primary' | 'cancel' | 'danger';

const map: Record<Variant, string> = {
  primary: 'btn btn--primary',
  cancel: 'btn btn--cancel',
  danger: 'btn btn--danger',
};

//===========================================================================

interface LinkButtonProps {
  href: string;
  text: string;
  variant?: Variant;
  prefetch?: boolean;
  className?: string;
}

//===========================================================================

function LinkButton({
  href,
  text,
  variant = 'primary',
  prefetch = false,
  className,
}: LinkButtonProps) {
  return (
    <Link
      prefetch={prefetch}
      href={href}
      className={clsx(map[variant], css.link, className)}
    >
      {text}
    </Link>
  );
}

export default LinkButton;
