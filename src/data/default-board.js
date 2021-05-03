import { uuid } from '../utils.js'

export default {
  name: 'workshop',
  columns: {
    "todo": {
      tasks: [
        {
          description: 'ijij',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'second task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: '',
          name: 'and thrid',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    "in-progress": {
      tasks: [
        {
          description: '',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    "done": {
      tasks: [
        {
          description: 'This task is competed',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  }
}
