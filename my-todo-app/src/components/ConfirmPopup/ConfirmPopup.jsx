import React from 'react';
import styles from './ConfirmPopup.module.css';

const ConfirmPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <>
      <div className={styles.overlay} onClick={onCancel}></div>
      <div className={styles.popup}>
        <h3 className={styles.title}>Подтверждение</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <button className={`${styles.button} ${styles.cancelButton}`} onClick={onCancel}>
            Отмена
          </button>
          <button className={`${styles.button} ${styles.confirmButton}`} onClick={onConfirm}>
            Подтвердить
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmPopup;
