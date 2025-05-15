import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/todoSlice';
import CalendarClosePopup from '../CalendarClosePopup/CalendarClosePopup';
import styles from './AddTaskForm.module.css';

const AddTaskForm = () => {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showCalendarPopup, setShowCalendarPopup] = useState(false);
  const dateInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && deadline) {
      dispatch(addTask({ text: text.trim(), deadline }));
      setText('');
      setDeadline('');
    }
  };

const handleDateChange = (e) => {
  const newValue = e.target.value;
  setDeadline(newValue);
  
  
  if (newValue && newValue !== deadline) {
    
    if (dateInputRef.current) {
      dateInputRef.current.blur();
    }
    
    
    setTimeout(() => {
      setShowCalendarPopup(true);
    }, 300); 
  }
};

  const handleCloseCalendar = () => {
    setShowCalendarPopup(false);
    if (dateInputRef.current) {
      dateInputRef.current.blur();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Введите задачу..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.dateContainer}>
        <label className={styles.dateLabel}>Выберите время выполнения:</label>
        <input
          ref={dateInputRef}
          type="datetime-local"
          className={styles.dateInput}
          value={deadline}
          onChange={handleDateChange}
          min={new Date().toISOString().slice(0, 16)}
        />
      </div>
      <button type="submit" className={styles.button}>Добавить</button>

      {showCalendarPopup && (
        <CalendarClosePopup onClose={handleCloseCalendar} />
      )}
    </form>
  );
};

export default AddTaskForm;
