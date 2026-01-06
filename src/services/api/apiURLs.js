export const baseURL=`https://upskilling-egypt.com:3003/api/v1`;
export const imgBaseURL='https://upskilling-egypt.com:3003';


export const USER_URLS={
     LOGIN:`/Users/Login`,
     REGISTER:`/Users/Register`,
     RESET_REQUEST:`/Users/Reset/Request`,
     CHANGE_PASSWORD:`/Users/ChangePassword`,
     VERIFY:`/Users/verify`,
     REST:`/Users/Reset`,
     GET_CURRENT_USER:`/Users/currentUser`,

}
export const PROJECTS_URLS={
    GET_ALL_PROJECTS:`/Project/`,
    GET_SINGLE_PROJECT:(id)=>`/Project/${id}`,
    CREATE_PROJECT:`/Project`,
    UPDATE_PROJECT:(id)=>`/Project/${id}`,
    DELETE_PROJECT:`/Project/`,  
    GET_PROJECTS_MANAGER:`Project/manager` ,
    GET_PROJECTS_EMPLOYEE:`Project/employee` ,
}
export const TASKS_URLS={
     CREATE_TASK:`/Task`,
     GET_MY_ASSIGNED_TASKS:`/Task/`,
     GET_All_TASKS : `/Task/manager`,
     GET_SINGLE_TASK:(id)=>`/Task/${id}`,
     UPDATE_TASK:(id)=>`/Task/${id}`, 
     DELETE_TASK:(id)=>`/Task/${id}`,
     COUNT_TASKS : `/Task/count`, 
     CHANGE_TASK_STATUS:(id)=>`/Task/${id}/change-status/`,  
     GET_PROJECT_TASKS :(id) => `/Task/Project${id}/`,

}