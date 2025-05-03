'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // Ensure hydration matching by only rendering client features after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Stuff', path: '/stuff' },
    { name: 'About Me', path: '/about' }
  ];

  // Determine active status only on client side after hydration
  const activeIndex = mounted ? navItems.findIndex(item => item.path === pathname) : -1;

  return (
    <div className="sticky top-0 left-0 w-full z-50" style={{ position: 'sticky', top: 0 }}>
      <nav className="w-full bg-white shadow-sm py-4">
        <div className="flex justify-center space-x-8 max-w-screen-xl mx-auto px-4">
          {navItems.map((item, index) => {
            const isActive = mounted && index === activeIndex;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={
                  isActive
                    ? "text-gray-400 dark:text-gray-500 cursor-default pointer-events-none"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                }
                aria-current={isActive ? "page" : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
} 