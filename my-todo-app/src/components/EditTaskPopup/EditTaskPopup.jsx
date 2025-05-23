import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditingTaskId, updateTask } from '../../store/todoSlice';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './EditTaskPopup.module.css';
import { useTranslation } from 'react-i18next';
import ru from 'date-fns/locale/ru';
import enGB from 'date-fns/locale/en-GB';

registerLocale('ru', ru);
registerLocale('en', enGB);

const EditTaskPopup = () => {
  const dispatch = useDispatch();
  const editingTaskId = useSelector(state => state.todos.editingTaskId);
  const tasks = useSelector(state => state.todos.tasks);
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const { t, i18n } = useTranslation();

  const editingTask = tasks.find(task => task.id === editingTaskId);

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text);
      setDeadline(new Date(editingTask.deadline));
    }
  }, [editingTask]);

  const handleClose = () => {
    dispatch(setEditingTaskId(null));
  };

  const handleSave = () => {
    if (text.trim()) {
      dispatch(updateTask({
        id: editingTaskId,
        text: text.trim(),
        deadline: deadline.toISOString(),
      }));
      handleClose();
    }
  };

  if (!editingTaskId) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleClose}></div>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={handleClose} aria-label={t('close')}></button>
        <input
          type="text"
          className={styles.input}
          value={text}
          onChange={e => setText(e.target.value)}
          autoFocus
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
        <button className={styles.saveButton} onClick={handleSave}>
          {t('save')}
        </button>
      </div>
    </>
  );
};

export default EditTaskPopup;
