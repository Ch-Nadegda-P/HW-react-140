import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/todoSlice';
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
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && deadline) {
      dispatch(addTask({
        text: text.trim(),
        deadline: deadline.toISOString(),
      }));
      setText('');
      setDeadline(new Date());
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
        />
      </div>
      <button type="submit" className={styles.button}>{t('add_task')}</button>
    </form>
  );
};

export default AddTaskForm;

