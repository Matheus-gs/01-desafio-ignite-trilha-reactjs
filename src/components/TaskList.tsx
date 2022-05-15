import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiCheckSquare } from 'react-icons/fi'

import { TaskItem } from './TaskItem'

interface Task {
    id: number
    title: string
    isComplete: boolean
}

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskTitle, setNewTaskTitle] = useState('')

    function handleCreateNewTask() {
        // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
        const randomId = Math.floor(Date.now() * Math.random())
        newTaskTitle != '' && setTasks([...tasks, { id: randomId, title: newTaskTitle, isComplete: false }])

        setNewTaskTitle('') // Limpando o valor do input
    }

    function handleRemoveTask(id: number) {
        // Remova uma task da listagem pelo ID

        // Encontrando o indice onde o id é igual ao passado como parametro
        let item = tasks.findIndex(item => item.id === id)

        // Criando uma copia da nosssa lista
        const newTaskList = [...tasks]

        // Removendo da copia o item que identificamos o indice
        newTaskList.splice(item, 1)

        // Atualizando nosso state tasks
        setTasks(newTaskList)
    }

    return (
        <section className="task-list container">
            <header>
                <h2>Minhas tasks</h2>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Adicionar novo todo"
                        onChange={e => setNewTaskTitle(e.target.value)}
                        value={newTaskTitle}
                    />
                    <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
                        <FiCheckSquare size={16} color="#fff" />
                    </button>
                </div>
            </header>

            <main>
                <ul>
                    {tasks.map(task => (
                        <TaskItem task={task} key={task.id} removeTask={handleRemoveTask} />
                    ))}
                </ul>
            </main>
        </section>
    )
}
