import NewTask from "./NewTask";
import { useContext } from "react";
import { ProjectsContext } from "../../store/projects-context";

export default function Tasks() {
    const projectsCtx = useContext(ProjectsContext);
    return (
        <div>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask onAdd={projectsCtx.addTask}/>
            {projectsCtx.tasks.length === 0 ? (
                <p className="text-stone-800 my-4">No tasks created for this project</p>
            ) : (
                <ul className="p-4 mt-8 rounded-m bg-stone-100">
                    {projectsCtx.tasks
                        .filter(task => task.projectId === projectsCtx.selectedProjectId)
                        .map(task => (
                        <li key={task.id} className="border-2 rounded-lg my-4">
                            <div className="flex justify-between m-3 p-3">
                                <span>{task.text}</span>
                                <button 
                                    className="text-stone-700 hover:text-red-500 ml-4" 
                                    onClick={() => projectsCtx.deleteTask(task.id)}
                                    >
                                    Clear
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}