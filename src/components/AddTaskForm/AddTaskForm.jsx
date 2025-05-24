import React, { useState, useContext } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './AddTaskForm.module.css';
import { useTranslation } from 'react-i18next';
import ru from 'date-fns/locale/ru';
import enGB from 'date-fns/locale/en-GB';

registerLocale('ru', ru);
registerLocale('en', enGB);

const AddTaskForm = () => {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const { user } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (text.trim() && deadline) {
      try {
        await addDoc(collection(db, "tasks"), {
          uid: user.uid,
          text: text.trim(),
          deadline: deadline.toISOString(),
          completed: false,
          createdAt: serverTimestamp()
        });
        setText('');
        setDeadline(new Date());
      } catch (error) {
        alert("Ошибка при добавлении задачи: " + error.message);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder={t('enter_task')}
        value={text}
        onChange={e => setText(e.target.value)}
        disabled={!user}
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
          calendarClassName="centered-datepicker"
          locale={i18n.language}
          timeCaption={t('time')}
          disabled={!user}
        />
      </div>
      <button type="submit" className={styles.button} disabled={!user}>
        {t('add_task')}
      </button>
      {!user && (
        <div className={styles.warning} style={{marginTop: 10, color: "#c00", textAlign: "center"}}>
          {t('auth_login_first')}
        </div>
      )}
    </form>
  );
};

export default AddTaskForm;


