'use client';

import { useEffect, useState } from 'react';

export default function LocalStorage() {
  const [darkMode, setDarkMode] = useState('');

  useEffect(() => {
    // window.localStorage.setItem('darkMode', true);
    // window.localStorage.removeItem('darkMode');

    const localStorageDarkMode = window.localStorage.getItem('darkMode');

    setDarkMode(localStorageDarkMode);
  }, []);

  return <div>{darkMode ? darkMode : 'No dark mode set'}</div>;
}
