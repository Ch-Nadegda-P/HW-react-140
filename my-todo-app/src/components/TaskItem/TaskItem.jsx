import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask, setEditingTaskId } from '../../store/todoSlice';
import TaskTimer from '../TaskTimer/TaskTimer';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import { formatDate } from '../../utils/dateUtils';
import styles from './TaskItem.module.css';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTask(task.id));
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const handleEdit = () => {
    dispatch(setEditingTaskId(task.id));
  };

  return (
    <li className={`${styles.item} ${task.completed ? styles.completed : ''} ${task.isExpired && !task.completed ? styles.expired : ''}`}>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`}></label>
      </div>
      <div className={styles.content} onClick={handleEdit}>
        <div className={styles.text}>{task.text}</div>
        <div className={styles.date}>
          Срок: {formatDate(task.deadline)}
        </div>
        <TaskTimer deadline={task.deadline} isExpired={task.isExpired || task.completed} />
      </div>
      <button className={styles.deleteButton} onClick={handleDeleteClick}>Удалить</button>
      
      {showConfirm && (
        <ConfirmPopup 
          message="Вы уверены, что хотите удалить эту задачу?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </li>
  );
};

export default TaskItem;
