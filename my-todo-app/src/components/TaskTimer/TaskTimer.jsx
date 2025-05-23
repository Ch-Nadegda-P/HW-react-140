import React, { useEffect, useState } from 'react';
import styles from './TaskTimer.module.css';
import { useTranslation } from 'react-i18next';
import { getTimeLeftString } from '../../utils/dateUtils';

const TaskTimer = ({ deadline, completed }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(getTimeLeftString(deadline, t));

  useEffect(() => {
    if (completed) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeftString(deadline, t));
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline, completed, t]);

  if (completed) {
    return <span className={styles.completed}>{t('completed')}</span>;
  }

  return (
    <span className={styles.timer}>
      {timeLeft}
    </span>
  );
};

export default TaskTimer;
