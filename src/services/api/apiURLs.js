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
export const PROJECT_URLS={
    GET_ALL_PROJECTS:`/project/`,
    CREATE_PROJECT:`/project`,
   GET_PROJECT:(projectId)=>`/Project/${projectId}`,
   UPDATE_PROJECT: (projectId)=>`/Project/${projectId}`,
   DELETE_PROJECT: (projectId)=>`/Project/${projectId}`,
   PROJECTS_MANGER:`/Project/manager`,
   PROJECTS_EMPLOYEE:`/Project/employee`,


}
export const TASK_URLS={

    GET_ALL_TASKS:`/task/`,
      CREATE_TASK:`/task`,
   UPDATE_PROJECT: (taskId)=>`/Project/${taskId}`,
   DELETE_PROJECT: (taskId)=>`/Project/${taskId}`,
   CONUT_TASKS_FOR_MANAGER_EMPLOYEE:`/Task/count`,
   CHANGE_STATUS:(taskId)=>`/Task/${taskId}/change-status`,


}