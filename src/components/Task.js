import React from 'react'
import StateContext from "../data/StateContext"
import {useRouteMatch} from "react-router-dom";

const Task = () => {
  const board = React.useContext(StateContext)
  let taskMatch = useRouteMatch("/task/:id")
  const id = taskMatch.params.id

  const getTask = (id, board) => {
    for (const column of Object.values(board.columns)) {
      for (const task of column.tasks) {
        if (task.id === id) {
          return task
        }
      }
    }
  }
  
  const handleChange = () => {

  }

  const task = getTask(id, board)
  
  return (
    <div 
      className="relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow"
      style={{maxWidth: "700px"}}
    >
      <div className="flex flex-col flex-grow items-start justify-between px-4">
        <input
          name="name"
          className="w-full p-2 mr-2 flex-grow text-xl font-bold"
          type="text"
          value={task.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          className="w-full relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
          value={task.description}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default Task