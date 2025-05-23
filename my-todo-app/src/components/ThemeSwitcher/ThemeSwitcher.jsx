import React, { useEffect, useState } from 'react';
import styles from './ThemeSwitcher.module.css';
import { useTranslation } from 'react-i18next';

const ThemeSwitcher = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      className={styles.switcher}
      onClick={() => setDark(d => !d)}
      aria-label={t('toggle_theme')}
      title={t('toggle_theme')}
    >
      {dark ? t('dark_theme') : t('light_theme')}
    </button>
  );
};

export default ThemeSwitcher;





