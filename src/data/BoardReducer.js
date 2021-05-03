import { uuid } from '../utils.js'

const boardReducer = (state, action) => {
  switch (action.key) {
    case "CREATE_TASK": {
      const {colName, name} = action.payload
      return {
        ...state,
        columns: {
          ...state.columns,
          [colName]: {
            tasks: [
              ...state.columns[colName].tasks,
              {
                name,
                id: uuid(),
                description: ''
              }
            ]
          }
        }
      }
    }
    case "UPDATE_TASK": {
      const {colName, taskIndex, key, value} = action.payload
      return {
        ...state,
        columns: {
          ...state.columns,
          [colName]: {
            tasks: state.columns[colName].tasks.map((item, index) => {
              if (index !== taskIndex) {
                return item
              }
              return {
                ...item,
                [key]: value
              }
            })
          }
        }
      }
    }
    case "MOVE_TASK": {
      const {fromColName, toColName, taskIndex} = action.payload
      const taskMoving = {
        ...state.columns[fromColName].tasks[taskIndex]
      }

      return {
        ...state,
        columns: {
          ...state.columns,
          [fromColName]: {
            tasks: state.columns[fromColName].tasks.filter((item, index) => {              
              return index !== +taskIndex
            })
          },
          [toColName]: {
            tasks: [
              ...state.columns[toColName].tasks,
              taskMoving
            ]
          }
        }
      }
    }
    default:
      return state;
  }
}

export default boardReducer;