import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditingTaskId, updateTask } from '../../store/todoSlice';
import CalendarClosePopup from '../CalendarClosePopup/CalendarClosePopup';
import styles from './EditTaskPopup.module.css';

const EditTaskPopup = () => {
  const dispatch = useDispatch();
  const editingTaskId = useSelector(state => state.todos.editingTaskId);
  const tasks = useSelector(state => state.todos.tasks);
  
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showCalendarPopup, setShowCalendarPopup] = useState(false);
  const dateInputRef = useRef(null);

  const editingTask = tasks.find(task => task.id === editingTaskId);

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text);
      
      const date = new Date(editingTask.deadline);
      const formattedDate = date.toISOString().slice(0, 16);
      setDeadline(formattedDate);
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
        deadline: deadline
      }));
      handleClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleClose();
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

  if (!editingTaskId) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleClose}></div>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={handleClose}></button>
        <input
          type="text"
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
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
        <div className={styles.hint}>Для сохранения изменений нажмите Enter</div>
      </div>

      {showCalendarPopup && (
        <CalendarClosePopup onClose={handleCloseCalendar} />
      )}
    </>
  );
};

export default EditTaskPopup;
