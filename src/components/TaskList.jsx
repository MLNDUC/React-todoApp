
//import { TaskItem } from './TaskItem'
//Library
import { CheckIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

import styles from './TaskList.module.css'

export const TaskList = ({ tasks, deleteTask, toggleTask, enterEditMode }) => {

  return (
    <ul className={styles.tasks}>
      {tasks.sort((a, b) => b.id - a.id).map(task => (
        <li
          key={task.id}
          className={styles.task}>
          <div className={styles["task-group"]}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={task.checked}
              onChange={() => toggleTask(task.id)}
              name={task.name}
              id={task.id}
            />
            <label
              htmlFor={task.id}
              className={styles.label}
            >
              {/* <div className={`${task.checked ? "taskDone" : ""}`}>
                {task.name}
              </div> */}
              {task.name}
              <p className={styles.checkmark}>
                <CheckIcon strokeWidth={2} width={24} height={24} />
              </p>
            </label>
          </div>

          <div className={styles["task-group"]}>
            <button
              className='btn'
              aria-label={`Update ${task.name} Task`}
              onClick={() => enterEditMode(task)}
            >
              <PencilSquareIcon width={24} height={24} />
            </button>

            <button
              className={`btn ${styles.delete}`}
              aria-label={`Delete ${task.name} Task`}
              onClick={() => deleteTask(task.id)}
            >
              <TrashIcon width={24} height={24} />

            </button>
          </div>

        </li>
      ))
      }
    </ul>
  )
}
