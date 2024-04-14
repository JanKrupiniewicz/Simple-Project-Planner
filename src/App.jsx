import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import { useState } from "react";

function App() {
  const [ projectsState, setProjectsState ] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(taskText) {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: taskText,
        projectId: prevState.selectedProjectId,
        id: taskId
      };

      return {
        ... prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectsState(prevState => {
      const newTasks = prevState.tasks.filter(task => {
          return task.projectId === prevState.selectedProjectId && task.id !== taskId;
      });

      return {
          ...prevState,
          tasks: newTasks
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ... prevState,
        selectedProjectId: null
      };
    });
  }

  function handleCancleAddProject() {
    setProjectsState( prevState => {
      return {
        ... prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(projectId) {
    setProjectsState( prevState => {
      return {
        ... prevState,
        selectedProjectId: projectId,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      };

      return {
        ... prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
        const newProjects = prevState.projects.filter(project => {
            return project.id !== prevState.selectedProjectId;
        });

        return {
            ...prevState,
            selectedProjectId: undefined,
            projects: newProjects
        };
    });
}


  const selectedProject = projectsState.projects.find(project => 
    project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject 
      project={selectedProject} 
      onDeleteProject={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} handleCancle={handleCancleAddProject}></NewProject>;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}></NoProjectSelected>;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
        onSelectProject={handleSelectProject}
        onStartAddProject={handleStartAddProject}
        selectedProjectId={projectsState.selectedProjectId}
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
} 

export default App;
