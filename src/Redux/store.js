// store.js
import { createStore, combineReducers } from 'redux';
import todoReducer from './reducers/todo_reducer';  // Ensure correct path

const rootReducer = combineReducers({
  todos: todoReducer,  // Use 'todos' to represent the state slice
});

const store = createStore(rootReducer);

export default store;
