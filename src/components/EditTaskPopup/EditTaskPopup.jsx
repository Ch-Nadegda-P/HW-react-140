import React, { useState, useEffect, useContext } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './EditTaskPopup.module.css';
import { useTranslation } from 'react-i18next';
import ru from 'date-fns/locale/ru';
import enGB from 'date-fns/locale/en-GB';
import { AuthContext } from '../../context/AuthContext';

registerLocale('ru', ru);
registerLocale('en', enGB);

const EditTaskPopup = ({ task, onClose }) => {
  const { user } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState(new Date());

  useEffect(() => {
    if (task) {
      setText(task.text);
      setDeadline(new Date(task.deadline));
    }
  }, [task]);

  if (!task) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (text.trim()) {
      await updateDoc(doc(db, "tasks", task.id), {
        text: text.trim(),
        deadline: deadline.toISOString(),
      });
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.overlay)) {
      onClose();
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleOverlayClick}></div>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose} aria-label={t('close')}></button>
        <form onSubmit={handleSave}>
          <input
            type="text"
            className={styles.input}
            value={text}
            onChange={e => setText(e.target.value)}
            autoFocus
            required
          />
          <div className={styles.dateContainer}>
            <label className={styles.dateLabel}>{t('choose_deadline')}</label>
            <DatePicker
              selected={deadline}
              onChange={date => setDeadline(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="dd.MM.yyyy HH:mm"
              minDate={new Date()}
              className={styles.dateInput}
              calendarClassName={styles.calendar}
              locale={i18n.language}
              timeCaption={t('time')}
            />
          </div>
          <button className={styles.saveButton} type="submit">
            {t('save')}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTaskPopup;

