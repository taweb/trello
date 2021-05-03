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

    const handleClick = id => {
        history.push(`/task/${id}`)
    }

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            history.push('/')
        }
    }

    const handleInput = (e) => {
        const colName = e.target.name
        const value = e.target.value

        setInputs({
            ...inputs,
            [colName]: value
        })
    }

    const handleKeydown = (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            const name = e.target.value.trim()
            name && dispatch({
                key: "CREATE_TASK",
                payload: {
                    colName: e.target.name,
                    name
                }
            })
            setInputs({
                ...inputs,
                [e.target.name]: ""
            })
        }
    }

    const onDragStart = (e, index, fromColName) => {
        console.log(e, index, fromColName);
        // e.dataTransfer.effectAllowed = "move"
        // e.dataTransfer.dropEffect = "move"
        e.dataTransfer.setData('task-index', index)
        e.dataTransfer.setData('from-col-name', fromColName)
    }

    const onDrop = (e, toColName) => {
        const fromColName = e.dataTransfer.getData('from-col-name')
        const taskIndex = e.dataTransfer.getData('task-index')
        dispatch({
            key: "MOVE_TASK", 
            payload: {
                fromColName,
                toColName,
                taskIndex
            }
        })
    }

    const onDragOver = e => e.preventDefault()
    
    return ( 
        <StateContext.Provider value={state}>
            <div className="p-4 bg-green-600 h-full overflow-auto relative">
                <div className="flex flex-row items-start">
                    {Object.keys(state.columns).map((colName, index) => {
                        const column = state.columns[colName]
                        return (
                            <div 
                                key={index}
                                className="bg-gray-300 p-2 mr-4 text-left shadow rounded"
                                style={{minWidth: "350px"}}
                                onDragOver={onDragOver}
                                onDrop={e => onDrop(e, colName)}
                            >
                                <div className="flex items-center mb-2 font-bold">
                                    {colName}
                                </div>
                                <div className="list-reset">
                                    {column.tasks.map((task, index) => (
                                        <div 
                                            key={index}
                                            className="flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline"
                                            onClick={() => handleClick(task.id)}
                                            draggable
                                            onDragStart={e => onDragStart(e, index, colName)}
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
                                        name={colName}
                                        value={inputs[colName] || ""}
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