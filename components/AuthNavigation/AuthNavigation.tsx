'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/app/components';
import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

import css from './AuthNavigation.module.css';

//===========================================================================

function AuthNavigation() {
  const router = useRouter();

  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const user = useAuthStore(s => s.user);
  const clearIsAuthenticated = useAuthStore(s => s.clearIsAuthenticated);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch {
    } finally {
      clearIsAuthenticated();
      router.push('/sign-in');
      router.refresh();
      setIsLoggingOut(false);
    }
  }, [clearIsAuthenticated, router]);

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile">Profile</Link>
      </li>

      <li className={css.navigationItem}>
        <span className={css.userEmail}>{user?.email}</span>
        <Button
          text={isLoggingOut ? 'Logging out…' : 'Logout'}
          variant="logout"
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
        />
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in">Login</Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up">Sign up</Link>
      </li>
    </>
  );
}

export default AuthNavigation;
