'use client';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/userAuth';
import { useState, useEffect } from 'react';
interface HeaderProps {
  sideBarHandler: () => void;
}
export default function Header({ sideBarHandler }: HeaderProps) {
  const [isMounted, setIsMounted] = useState(false);
    const { token } = useAuth();
  
    //isMounted = true means all components have mounted on Client, and everything is ready, because isMounted in in useState - component in Client side, which means when it turns true, client is ready
    useEffect(() => {
      const id = setTimeout(() => setIsMounted(true), 0);
      return () => clearTimeout(id);
    }, []);
  
    const isLoggedIn = token != null;
  
  return (
    <div className="sticky top-0 z-50 w-full bg-blue-600 h-17 flex items-center justify-between">
      <div className="flex ml-5">
        {isMounted && isLoggedIn && (
          <button className="cursor-pointer " onClick={sideBarHandler}>
            <div className="border border-white rounded-md p-1">
              <Menu size={30}></Menu>
            </div>
          </button>
        )}
        <p className="p-7 font-mono font-bold text-2xl">Company Logo</p>
      </div>
    </div>
  );
}
