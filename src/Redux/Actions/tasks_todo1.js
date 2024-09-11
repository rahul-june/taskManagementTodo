import { ADD_TODO,FETCH_TODO,Add_Task_todo,UPDATE_TASK_STATUS}  from "./action-types"
export const addTodo=(todo)=>({
    type:ADD_TODO,
    payload:todo

})
export const  fetchtodo=()=>{
    const data = JSON.parse(localStorage.getItem("Projects")) || {};
    return{
    type:FETCH_TODO,
    payload:data

}
}
export const addTaskTodo=(todo)=>({
    type:Add_Task_todo,
    payload:todo

})
export const updateTaskStatus = ({ projectName, taskId, newStatus }) => ({
    type: UPDATE_TASK_STATUS,
    payload: { projectName, taskId, newStatus }
  });