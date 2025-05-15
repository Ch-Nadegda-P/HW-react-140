import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAllTasks } from '../../store/todoSlice';
import TaskItem from '../TaskItem/TaskItem';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import styles from './TaskList.module.css';

const TaskList = () => {
  const tasks = useSelector(state => state.todos.tasks);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearAllClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmClear = () => {
    dispatch(clearAllTasks());
    setShowConfirm(false);
  };

  const handleCancelClear = () => {
    setShowConfirm(false);
  };

  return (
    <div className={styles.container}>
      {tasks.length === 0 && (
        <div className={styles.emptyMessage}>
          Нет задач. Добавьте новую задачу!
        </div>
      )}
      
      {tasks.length > 0 && (
        <>
          <ul className={styles.list}>
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
          <button className={styles.clearButton} onClick={handleClearAllClick}>
            Очистить список
          </button>
        </>
      )}

      {showConfirm && (
        <ConfirmPopup 
          message="Вы уверены, что хотите очистить весь список задач?"
          onConfirm={handleConfirmClear}
          onCancel={handleCancelClear}
        />
      )}
    </div>
  );
};

export default TaskList;
