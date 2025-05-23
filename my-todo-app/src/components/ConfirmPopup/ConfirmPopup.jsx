import React from 'react';
import styles from './ConfirmPopup.module.css';
import { useTranslation } from 'react-i18next';

const ConfirmPopup = ({ message, onConfirm, onCancel }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.overlay} onClick={onCancel}></div>
      <div className={styles.popup}>
        <div className={styles.message}>{message}</div>
        <div className={styles.actions}>
          <button className={styles.confirm} onClick={onConfirm}>
            {t('yes')}
          </button>
          <button className={styles.cancel} onClick={onCancel}>
            {t('no')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmPopup;
