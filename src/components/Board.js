import React from 'react';
import Task from "./Task"
import StateContext from "../data/StateContext"
import boardReducer from "../data/BoardReducer"
import initialState from "../data/default-board"
import {
    useHistory,
    useRouteMatch,
  } from "react-router-dom";

const Board = () => {
    let history = useHistory();
    let taskMatch = useRouteMatch("/task/:id")
    const [state, dispatch] = React.useReducer(boardReducer, initialState)
    const [inputs, setInputs] = React.useState({})

    const handleClick = taskId => {
        history.push(`/task/${taskId}`)
    }

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            history.push('/')
        }
    }

    const handleInput = (e) => {
        const colIndex = e.target.name
        const value = e.target.value

        setInputs({
            ...inputs,
            [colIndex]: value
        })
    }

    const handleKeydown = (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            const name = e.target.value.trim()
            name && dispatch({
                key: "CREATE_TASK",
                payload: {
                    colIndex: e.target.name,
                    name
                }
            })
            setInputs({
                ...inputs,
                [e.target.name]: ""
            })
        }
    }

    const onDragStart = (e, fromTaskIndex, fromColIndex) => {
        e.dataTransfer.setData('from-task-index', fromTaskIndex)
        e.dataTransfer.setData('from-col-index', fromColIndex)
    }

    const onDrop = (e, toColIndex) => {
        const fromColIndex = e.dataTransfer.getData('from-col-index')
        const fromTaskIndex = e.dataTransfer.getData('from-task-index')
        dispatch({
            key: "MOVE_TASK", 
            payload: {
                fromColIndex,
                toColIndex,
                fromTaskIndex
            }
        })
    }

    const onDragOver = e => e.preventDefault()
    
    return ( 
        <StateContext.Provider value={state}>
            <div className="p-4 bg-green-600 h-full overflow-auto relative">
                <div className="flex flex-row items-start">
                    {state.columns.map((column, colIndex) => {
                        return (
                            <div 
                                key={colIndex}
                                className="bg-gray-300 p-2 mr-4 text-left shadow rounded"
                                style={{minWidth: "350px"}}
                                onDragOver={onDragOver}
                                onDrop={e => onDrop(e, colIndex)}
                            >
                                <div className="flex items-center mb-2 font-bold">
                                    {column.name}
                                </div>
                                <div className="list-reset">
                                    {column.tasks.map((task, taskIndex) => (
                                        <div 
                                            key={taskIndex}
                                            className="flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline"
                                            onClick={() => handleClick(task.id)}
                                            draggable
                                            onDragStart={e => onDragStart(e, taskIndex, colIndex)}
                                        >
                                            <span className="w-full flex-no-shrink font-bold">
                                                {task.name}
                                            </span>
                                            {task.description ?
                                                (
                                                    <p
                                                        className="w-full flex-no-shrink mt-1 text-sm"
                                                    >
                                                        {task.description}
                                                    </p>
                                                ) : (
                                                    null
                                                )
                                            }
                                        </div>
                                    ))}
                                    <input 
                                        type="text"
                                        name={colIndex}
                                        value={inputs[colIndex] || ""}
                                        className="block p-2 w-full bg-transparent"
                                        placeholder="+ Enter new task"
                                        onChange={handleInput}
                                        onKeyDown={handleKeydown}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
                {taskMatch && (
                    <div 
                        className="w-full h-full top-0 left-0 absolute" 
                        style={{ background: "rgba(0, 0, 0, 0.5)"}}
                        onClick={handleClose}
                    >
                        <Task id={taskMatch.params.id}/>
                    </div>
                )}
            </div>
        </StateContext.Provider>
     );
}

export default Board;