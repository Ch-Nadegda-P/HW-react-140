import React, { useState, useContext } from 'react';
import { db } from '../../firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import styles from './TaskItem.module.css';
import { AuthContext } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import TaskTimer from '../TaskTimer/TaskTimer';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';

const TaskItem = ({ task, setEditingTask }) => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAuthMsg, setShowAuthMsg] = useState(false);

  const handleEdit = () => {
    if (!user) {
      setShowAuthMsg(true);
      setTimeout(() => setShowAuthMsg(false), 2000);
      return;
    }
    setEditingTask(task);
  };

  const handleDelete = async () => {
    if (!user) {
      setShowAuthMsg(true);
      setTimeout(() => setShowAuthMsg(false), 2000);
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    await deleteDoc(doc(db, "tasks", task.id));
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const handleToggle = async () => {
    if (!user) {
      setShowAuthMsg(true);
      setTimeout(() => setShowAuthMsg(false), 2000);
      return;
    }
    await updateDoc(doc(db, "tasks", task.id), {
      completed: !task.completed
    });
  };

  return (
    <div className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          disabled={!user}
        />
        <span className={styles.checkmark}></span>
      </label>
      <div className={styles.content}>
        <div className={styles.text}>{task.text}</div>
        <TaskTimer deadline={task.deadline} completed={task.completed} />
      </div>
      <div className={styles.actions}>
        <button className={styles.edit} onClick={handleEdit} title={t('edit')} disabled={!user}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
            <path d="M16 5l3 3" />
          </svg>
        </button>
        <button className={styles.delete} onClick={handleDelete} title={t('delete')} disabled={!user}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </button>
      </div>
      {showConfirm && (
        <ConfirmPopup
          message={t('delete_confirm')}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {showAuthMsg && (
        <div className={styles.warning} style={{marginTop: 10, color: "#c00", textAlign: "center"}}>
          {t('auth_login_first')}
        </div>
      )}
    </div>
  );
};

export default TaskItem;



