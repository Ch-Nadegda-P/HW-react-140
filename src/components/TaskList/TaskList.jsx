import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';
import { useTranslation } from 'react-i18next';

const TaskList = ({ setEditingTask }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }
    const q = query(
      collection(db, "tasks"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  return (
    <div className={styles.list}>
      {tasks.length === 0 ? (
        <div className={styles.empty}>{t('no_tasks')}</div>
      ) : (
        tasks.map(task => <TaskItem key={task.id} task={task} setEditingTask={setEditingTask} />)
      )}
    </div>
  );
};

export default TaskList;

