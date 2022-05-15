import { useState } from 'react'
import { FiTrash } from 'react-icons/fi'
interface TaskItemProps {
    task: {
        id: number
        title: string
        isComplete: boolean
    }

    removeTask: (id: number) => void
}

export function TaskItem(props: TaskItemProps) {
    const [isComplete, setIsComplete] = useState<Boolean>(false)

    function handleToggleTaskCompletion(id: number) {
        // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

        // Alterando na memória
        props.task.isComplete = !isComplete

        // Alterando estado do componente
        setIsComplete(!isComplete)

        // Debugg
        // console.log(props.task.isComplete)
    }

    return (
        <>
            <li>
                <div className={isComplete ? 'completed' : ''} data-testid="task">
                    <label className="checkbox-container">
                        <input type="checkbox" readOnly onClick={() => handleToggleTaskCompletion(props.task.id)} />
                        <span className="checkmark"></span>
                    </label>
                    <p>{props.task.title}</p>
                </div>

                <button type="button" data-testid="remove-task-button" onClick={() => props.removeTask(props.task.id)}>
                    <FiTrash size={16} />
                </button>
            </li>
        </>
    )
}
