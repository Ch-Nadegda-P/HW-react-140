import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../../store/todoSlice'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './AddTaskForm.module.css'

const AddTaskForm = () => {
  const [text, setText] = useState('')
  const [deadline, setDeadline] = useState(new Date())
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim() && deadline) {
      dispatch(addTask({
        text: text.trim(),
        deadline: deadline.toISOString(),
      }))
      setText('')
      setDeadline(new Date())
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="Введите задачу..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className={styles.dateContainer}>
        <label className={styles.dateLabel}>Выберите время выполнения:</label>
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
          locale="ru"
        />
      </div>
      <button type="submit" className={styles.button}>Добавить</button>
    </form>
  )
}

export default AddTaskForm
