import { useContext } from "react";
import ProjectsSidebar from "./components/Projects/ProjectsSidebar.jsx";
import NewProject from "./components/Projects/NewProject.jsx";
import NoProjectSelected from "./components/Projects/NoProjectSelected.jsx";
import SelectedProject from "./components/Projects/SelectedProject.jsx";
import ProjectsProvider from "./store/projects-context.jsx";
import { ProjectsContext } from './store/projects-context.jsx';

function AppContent() {
  const projectsCtx = useContext(ProjectsContext);
  let content = <SelectedProject />;
  if (projectsCtx.selectedProjectId === null) {
      content = <NewProject />;
  } else if (projectsCtx.selectedProjectId === undefined) {
      content = <NoProjectSelected />;
  }

  return (
      <main className="h-screen flex gap-8">
          <ProjectsSidebar />
          {content}
      </main>
  );
}

function App() {
  return (
    <ProjectsProvider>
        <AppContent />
    </ProjectsProvider>
  );
} 

export default App;
