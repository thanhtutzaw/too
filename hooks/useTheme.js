import { useEffect, useState } from 'react';

export default function useTheme() {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' &&
    localStorage.getItem('theme') || 'light');
  useEffect(() => {
    function storageCallback(e) {
      if (e.key === 'theme') {
        setTheme(e.newValue || 'light');
      }
    }
    window.addEventListener('storage', storageCallback);
    return () => {
      window.removeEventListener('storage', storageCallback);
    };
  }, []);
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('theme', theme);
    } else {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('theme', theme);
    }
  }, [theme]);

  
  return { theme, setTheme };
}
