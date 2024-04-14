import { useContext } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
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
      <main className="h-screen my-8 flex gap-8">
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
