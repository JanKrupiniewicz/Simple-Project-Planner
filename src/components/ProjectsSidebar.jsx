import { useContext } from 'react';
import Button from "./Button";
import { ProjectsContext } from '../store/projects-context.jsx';

export default function ProjectsSidebar() {
    const projectsCtx = useContext(ProjectsContext);
    return (
        <aside className="w-1/3 px-7 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
            <div>
                <Button onClick={() => projectsCtx.startAddProject()}>
                    + Add Project
                </Button>
            </div>
            <ul className="mt-8">
                {projectsCtx.projects.map((project) => {
                    let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
                    if(project.id === projectsCtx.selectedProjectId) {
                        cssClasses += ' bg-stone-800 text-stone-200';
                    } else {
                        cssClasses += ' text-stone-400';
                    }

                    return(
                        <li key={project.id}>
                            <button 
                                onClick={() => projectsCtx.selectProject(project.id)}
                                className={cssClasses}
                            >
                                {project.title}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};