import TodoActions from "./action";

let initalState = {
  todoList: [
    {
      id:1,
      title: "Lorem Ipsum is simply",
      description: "khejhfbjhfbejhd jbfsbjhfebjhfekde",
      createdAt: "2021-03-12",
      dueDate: "2021-03-13",
      priority: "1",
      currentState: true,
    },
    {
      id:2,
      title: "0 years old. Richard McCl",
      description: "rs, as opposed to using 'Content here, content here', making it look like readable En",
      createdAt: "2021-03-12",
      dueDate: "2021-03-13",
      priority: "2",
      currentState: false,
    },
    {
      id:3,
      title: "a Latin professor at Hampden-Sydn",
      description: " a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richar",
      createdAt: "2021-03-12",
      dueDate: "2021-03-13",
      priority: "3",
      currentState: true,
    }
    
  ],
  groupBy: "none",
  filteredData: [],
  searchedValue:'',
};

function TodoReducer(state = initalState, action) {
  switch (action.type) {
    case TodoActions.ADD_TODO: {
      return {
        ...state,
        todoList: [action.payload, ...state.todoList],
      };
    }
    case TodoActions.UPDATE_TODO: {
      let index = state.todoList.findIndex( x => x.id === action.payload.id);
      if (index !== -1) {
        state.todoList[index] = action.payload;
      }
      return state;
    }
    case TodoActions.DELETE_TODO: {
      return{
        ...state,
        todoList: state.todoList.filter((x) => x !== action.payload)
      }
    }
    case TodoActions.CHANGE_TODO_STATE:{
      return{
        ...state,
        todoList: state.todoList.map((x) => {
          if(x.id === action.payload)  x.currentState = !x.currentState;

          return x;
        })
      }
    }
    case TodoActions.SET_GROUP_BY: {
      return{
        ...state,
        groupBy:action.payload
      }
    }
    case TodoActions.SEARCH: {
      let searchedValue = action.payload;
      let searchedResult = state.todoList.filter((todo) => todo.title.toLowerCase().includes(searchedValue.toLowerCase()));
      return{
        ...state,
        filteredData:searchedResult,
        searchedValue
      }
    }
    case TodoActions.SORT_BY_SUMMARY: {
      return {
        ...state,
        todoList: state.todoList.slice().sort((a, b) => {
          if (action.payload.isAsscending) {
            return "" + a.title.localeCompare(b.title);
          }
          return "" + b.title.localeCompare(a.title);
        }),
      };
    }
    case TodoActions.SORT_BY_PRIORITY: {
      return {
        ...state,
        todoList: state.todoList.slice().sort((a, b) => {
          if (action.payload.isAsscending) {
            return a.priority - b.priority;
          }
          return b.priority - a.priority;
        }),
      };
    }
    case TodoActions.SORT_BY_CREATEDAT: {
      return {
        ...state,
        todoList: state.todoList.slice().sort((a, b) => {
          if (action.payload.isAsscending) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
        }),
      };
    }
    case TodoActions.SORT_BY_DUE_DATE: {
      return {
        ...state,
        todoList: state.todoList.slice().sort((a, b) => {
          if (action.payload.isAsscending) {
            return new Date(a.dueDate) - new Date(b.dueDate);
          }
          return new Date(b.dueDate) - new Date(a.dueDate);
        }),
      };
    }

    default:
      return state;
  }
}

export default TodoReducer;
