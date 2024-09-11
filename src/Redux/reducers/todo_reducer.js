import { ADD_TODO, FETCH_TODO,Add_Task_todo,UPDATE_TASK_STATUS } from "../Actions/action-types";
import { updateTaskStatus } from "../Actions/tasks_todo1";
const initialstate=[];
export default (state=initialstate,action)=>{
if(action.type==ADD_TODO)
{
    console.log("adding todo");
    const a=localStorage.getItem("Projects")
    if(a==null)
    {
       let obj={
        [action.payload]:[]
       }
       localStorage.setItem("Projects",JSON.stringify(obj))
       
    }
    else
    {
        
        const a=localStorage.getItem("Projects")
      let obj={
        [action.payload]:[]
      }
      console.log(a,"kkk");  
      let c=Object.assign(JSON.parse(a),obj) 
    localStorage.setItem("Projects",JSON.stringify(c));

         
    }
    
    return [...state,action.payload]
}
else if(action.type==FETCH_TODO)
{

  
  return [
    ...state,
     action.payload,
  ]
}
else if(action.type==Add_Task_todo)
{
  console.log(action,"lcfkjknnj");
  
  let a=JSON.parse(localStorage.getItem("Projects"));
  a[action.payload.projectName].push(action.payload.taskData)
  localStorage.setItem("Projects",JSON.stringify(a));
  return [...state,action.payload.taskData]

}
else if(action.type==UPDATE_TASK_STATUS)
{
  console.log(action.payload,"kdkdjdb");
  
  console.log(state,"jdhjdhjhj");
  const { projectName: project, taskId, newStatus } = action.payload;
  let a=JSON.parse(localStorage.getItem("Projects"))
a[project].forEach(element => {
  if(element.id==taskId)
  {
    element.status=newStatus
  }
  localStorage.setItem("Projects",JSON.stringify(a));
  
});
  
  
 
  
  return state.map(task =>
    task.id === taskId ? { ...task, status: newStatus } : task
  );
}
else
{
    return state
}

}