import { useState } from "react";
import AddProject from "./components/AddProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SidePanel from "./components/SidePanel.jsx";
import DisplayProjects from "./components/DisplayProjects.jsx";

function App() {
  const [projectStatus, setProjectStatus] = useState({
    projects: [],
    selectedProjectId: undefined,
    task: [],
  });

  function handleNewTask(text) {
    setProjectStatus((prevStat) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevStat.selectedProjectId,
        id: taskId,

      };
      return {
        ...prevStat, task: [newTask, ...prevStat.task]
      }
    });
  }

  function handleDeleteTask(id) {
    setProjectStatus(prevStat => {
      return {
        ...prevStat,
        task: prevStat.task.filter((task) => task.id !== id),
      };
    });
  }

  function handleCancel() {
    setProjectStatus(prevStat => {
      return {
        ...prevStat,
        selectedProjectId: undefined,
      };
    });
  }

  function handleStartAddProject() {
    setProjectStatus(prevStat => {
      return {
        ...prevStat,
        selectedProjectId: null,
      };
    });
  }
  function handleAddProject(projectData) {
    setProjectStatus(prevStat => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,

      };
      return {
        ...prevStat, selectedProjectId: undefined, projects: [...prevStat.projects, newProject],
      }
    });
  }
  function handleDeleteProject() {
    setProjectStatus(prevStat => {
      return {
        ...prevStat,
        selectedProjectId: undefined,
        projects: prevStat.projects.filter((project) => project.id !== prevStat.selectedProjectId),
      };
    });
  }
  function handleDisplayProject(id) {
    setProjectStatus(prevStat => {
      return {
        ...prevStat,
        selectedProjectId: id,
      };
    });
  }
  const selectedProject = projectStatus.projects.find(project => project.id === projectStatus.selectedProjectId);

  let content = <DisplayProjects project={selectedProject} onDelete={handleDeleteProject} onNewTask={handleNewTask}
    onDeleteTask={handleDeleteTask} tasks={projectStatus.task} />;


  if (projectStatus.selectedProjectId === null) {
    content = <AddProject onAdd={handleAddProject} onCancel={handleCancel} />;
  }
  else if (projectStatus.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SidePanel onStartAddProject={handleStartAddProject} projects={projectStatus.projects}
        onDisplayProject={handleDisplayProject} selectedProjectId={projectStatus.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
