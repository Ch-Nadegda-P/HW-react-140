import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';
import { useTranslation } from 'react-i18next';

const TaskList = () => {
  const tasks = useSelector(state => state.todos.tasks);
  const { t } = useTranslation();

  if (tasks.length === 0) {
    return <div className={styles.empty}>{t('no_tasks')}</div>;
  }

  return (
    <div className={styles.list}>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
