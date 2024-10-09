'use client';

// DONT DO THIS!!!
// DONT USE document.cookie!!

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './GenerateButton.module.scss';

export default function GenerateButton() {
  const [color, setColor] = useState('#fff');

  const router = useRouter();

  useEffect(() => {
    const allCookies = document.cookie;

    console.log(allCookies);

    const buttonColor = document.cookie
      .split('; ')
      .find((row) => row.startsWith('buttonColor='))
      ?.split('=')[1];

    console.log(buttonColor);

    setColor(
      buttonColor || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    );
  }, []);

  return (
    <button
      style={{ backgroundColor: color }}
      className={styles.generateButton}
      onClick={() => {
        // DONT DO THIS!!!
        // DONT USE document.cookie!!

        const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        document.cookie = `buttonColor=${newColor}`;
        setColor(newColor);
        router.refresh();
      }}
    >
      generate
    </button>
  );
}
