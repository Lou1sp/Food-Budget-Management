'use client';
//This hook help check if user is logged in or no 
import { useState } from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  });

  return {
    token,
  };
}
