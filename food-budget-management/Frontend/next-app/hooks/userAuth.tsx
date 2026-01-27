'use client';

import { useState, useEffect } from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  });

  const [user, setUser] = useState<unknown>(() => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  });

  const isLoggedIn = !!token;

  return { isLoggedIn, user, token };
}
