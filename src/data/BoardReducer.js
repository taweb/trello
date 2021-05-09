import { uuid } from '../utils.js'

const boardReducer = (state, action) => {
  switch (action.key) {
    case "CREATE_TASK": {
      const {colIndex, name} = action.payload

      return {
        ...state,
        columns: state.columns.map((column, index) => {
          return index !== +colIndex 
            ? column 
            : {
                ...column,
                tasks: [...column.tasks, {
                  name,
                  id: uuid(), 
                  description: ''
                }]
              }  
        })
      }
    }
    case "UPDATE_TASK": {
      const {colIndex, taskIndex, key, value} = action.payload
      return {
        ...state,
        columns: state.columns.map((column, index) => {
          return index !== +colIndex
            ? column
            : {
                ...column,
                tasks: column.tasks.map((task, index) => {
                  if (index !== +taskIndex) {
                    return task
                  }
                  return {
                    ...task,
                    [key]: value
                  }
              })
            }
        })
      }
    }
    case "MOVE_TASK": {
      const {fromColIndex, toColIndex, fromTaskIndex} = action.payload
      const fromTasksNew = state.columns[fromColIndex].tasks.slice()
      const taskToMove = fromTasksNew.splice(fromTaskIndex, 1)

      return {
        ...state,
        columns: state.columns.map((column, index) => {
          if (index === +fromColIndex) {
            return {
              ...column,
              tasks: fromTasksNew
            }
          } else if (index === +toColIndex) {
            return {
              ...column,
              tasks: [
                ...column.tasks.slice(0, +toColIndex),
                ...taskToMove,
                ...column.tasks.slice(+toColIndex)
              ]
            }
          } else {
            return column
          }
        })
      }
    }
    default:
      return state;
  }
}

export default boardReducer;