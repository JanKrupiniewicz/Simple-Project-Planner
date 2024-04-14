import { createContext, useReducer } from "react";

export const ProjectsContext = createContext({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
    addTask: () => {},
    deleteTask: () => {},
    addProject: () => {},
    deleteProject: () => {},
    startAddProject: () => {},
    cancelAddProject: () => {},
    selectProject: () => {},
});

function projectsReducer(state, action) {
    if(action.type === 'START_ADD_PROJECT') {
        return {
            ...state,
            selectedProjectId: null,
        };
    }
    if(action.type === 'CANCEL_ADD_PROJECT') {
        return {
            ...state,
            selectedProjectId: undefined,
        };
    }
    if(action.type === 'ADD_PROJECT') {
        const newProject = {
            ...action.payload,
            id: Math.random()
        };

        return {
        ... state,
        selectedProjectId: undefined,
        projects: [...state.projects, newProject]
        };
    }
    if(action.type === 'DELETE_PROJECT') {
        const newProjects = state.projects.filter(project => {
            return project.id !== state.selectedProjectId;
        });

        return {
            ...state,
            selectedProjectId: undefined,
            projects: newProjects
        };
    }
    if(action.type === 'ADD_TASK') {
        const taskId = Math.random();
        const newTask = {
            text: action.payload.text,
            projectId: state.selectedProjectId,
            id: taskId
        };
        return {
            ... state,
            tasks: [newTask, ...state.tasks]
        };
    }
    if(action.type === 'DELETE_TASK') {
        const newTasks = state.tasks.filter(task => {
            return task.id !== action.payload.taskId;
        });
  
        return {
            ...state,
            tasks: newTasks
        };
    };
    if(action.type === 'SELECT_PROJECT') {
        return {
            ...state,
            selectedProjectId: action.payload.projectId,
        };
    }
}

export default function ProjectsProvider({children}) {
    const [projectsState, projectsDispatch] = useReducer(
        projectsReducer,
        {
            selectedProjectId: undefined,
            projects: [],
            tasks: [],
        }
    );

    const startAddProject = () => {
        projectsDispatch({ type: 'START_ADD_PROJECT' });
    };

    const cancelAddProject = () => {
        projectsDispatch({ type: 'CANCEL_ADD_PROJECT' });
    };

    const addProject = (projectData) => {
        projectsDispatch({ 
            type: 'ADD_PROJECT', 
            payload: projectData 
        });
    };

    const deleteProject = () => {
        projectsDispatch({ type: 'DELETE_PROJECT' });
    };

    const addTask = (taskText) => {
        projectsDispatch({ 
            type: 'ADD_TASK',
            payload: {
                text: taskText,
            }
        });
    };

    const deleteTask = (taskId) => {
        projectsDispatch({ 
            type: 'DELETE_TASK',
            payload: {
                taskId: taskId,
            }
        });
    };

    const selectProject = (projectId) => {
        projectsDispatch({ 
            type: 'SELECT_PROJECT',
            payload: {
                projectId: projectId,
            }
        });
    };

    const contextValue = {
        selectedProjectId: projectsState.selectedProjectId,
        projects: projectsState.projects,
        tasks: projectsState.tasks,
        startAddProject,
        cancelAddProject,
        selectProject,
        deleteProject,
        addProject,
        deleteTask,
        addTask,
    }

    return (
        <ProjectsContext.Provider value={contextValue}>
            {children}
        </ProjectsContext.Provider>
    );
}