
import { useState } from 'react';

//custom hooks

// custom components
import { CustomForm } from './components/CustomForm'
import { TaskList } from './components/TaskList';
import { EditForm } from './components/EditForm';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ActionButton } from './components/ActionButton';
// import './App.css'

function App() {
  const [tasks, setTasks] = useLocalStorage('react-toto.tasks', []);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");


  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(task => task.id !== id));
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(task => (
      task.id === id
        ? { ...task, checked: !task.checked }
        : task
    )))
  }

  const updateTask = (updatedTask) => {
    setTasks(prevState => prevState.map(t => (
      t.id === updatedTask.id
        ? { ...t, name: updatedTask.name }
        : t
    )))
    closeEditMode();
  }

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }
  //action section

  const searchTasks = () => {
    return tasks.filter(task =>
      task.name.toLowerCase().includes(searchKeyword.toLocaleLowerCase()));
  }
  const handleCompletedTasks = () => {
    setTasks(prevState => prevState.filter(task => !task.checked))
  }

  const handleDeleteAll = () => {
    setTasks([]);
  }

  return (
    <div className='container'>
      <header>
        <h1>My Task List</h1>
      </header>
      {
        isEditing && (
          <EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }
      <CustomForm addTask={addTask} />


      {searchKeyword === "" ?
        (
          <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            enterEditMode={enterEditMode}
          />
        )
        : (
          <TaskList
            tasks={searchTasks()}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            enterEditMode={enterEditMode}
          />

        )}

      <ActionButton
        handleCompletedTasks={handleCompletedTasks}
        handleDeleteAll={handleDeleteAll}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      <ThemeSwitcher />
    </div>
  )
}

export default App
