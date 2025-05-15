import React from 'react';
import styles from './CalendarClosePopup.module.css';

const CalendarClosePopup = ({ onClose }) => {
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.popup}>
        <h3 className={styles.title}>Дата и время выбраны</h3>
        <p className={styles.message}>Календарь можно закрыть</p>
        <button className={styles.closeButton} onClick={onClose}>
          Закрыть календарь
        </button>
      </div>
    </>
  );
};

export default CalendarClosePopup;
