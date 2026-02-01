'use client';
//This hook help check if user is logged in or no 
import { useState } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
};

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  return {
    user,
    token,
    isLoggedIn: !!token,
  };
}
