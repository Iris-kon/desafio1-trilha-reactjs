import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

function generateRandomId(tasksIds: number[]) {
  let id = Math.floor(Math.random() * (99 - 1)) + 1

  //test if id is already used and call the function again if needed
  if(tasksIds.includes(id)) generateRandomId(tasksIds)

  return id
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle) {
      //generate a unique random id
      const id = generateRandomId(tasks.map(t => t.id))
      
      //append new task at the end of the array
      setTasks([...tasks, {id, title: newTaskTitle, isComplete: false}])
    }else{
      alert('O nome da task não pode ser vazio')
    }

    //clear newTastkTitle
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const oldTasks = tasks

    //find the position of the task with the given id in the array
    const idIndex = oldTasks.findIndex(t => t.id === id)

    //set the taks as complete or incomplete
    oldTasks[idIndex].isComplete = !oldTasks[idIndex].isComplete;

    //set the new value in tasks state
    setTasks([...oldTasks])
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    //filter the tasks array to remove the task with the given id
    const newTasks = tasks.filter(t => t.id !== id)
    
    setTasks(newTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}