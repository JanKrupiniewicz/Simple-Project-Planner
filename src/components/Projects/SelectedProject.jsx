import { useContext } from "react";
import { ProjectsContext } from '../../store/projects-context.jsx';
import Tasks from "../Tasks/Tasks.jsx";

export default function SelectedProject() {
    const projectsCtx = useContext(ProjectsContext);
    const project = projectsCtx.projects.find(project => project.id === projectsCtx.selectedProjectId);

    const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const selectedProject = projectsCtx.projects.find(project => 
        project.id === projectsCtx.selectedProjectId
    );

    return(
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{selectedProject.title}</h1>
                    <button onClick={() => projectsCtx.deleteProject()} className="text-stone-600 hover:txt-stone-950">
                        Delete
                    </button>
                </div>
                <p className="mb-4 text-stone-400">{formattedDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{selectedProject.description}</p>
            </header>
            <Tasks />
        </div>
    );
}