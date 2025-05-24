import React from 'react';
import styles from './LanguageSwitcher.module.css';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  return (
    <div className={styles.switcher}>
      <button
        className={i18n.language === 'ru' ? styles.active : ''}
        onClick={() => i18n.changeLanguage('ru')}
        aria-label="Русский"
      >
        RU
      </button>
      <button
        className={i18n.language === 'en' ? styles.active : ''}
        onClick={() => i18n.changeLanguage('en')}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;

