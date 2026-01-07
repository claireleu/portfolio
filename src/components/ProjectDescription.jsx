import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownComponent from './MarkdownComponent.jsx';
import { projectsData } from "../lib/projectsData.js";


const markdownFiles = import.meta.glob('../content/*.md', {
  query: '?raw',
  import: 'default',
});

function ProjectPage() {
  const { project } = useParams();
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);
  const projectMeta = projectsData.find(p => p.url === project);

  useEffect(() => {
    setError(false);

    const path = `../content/${project}.md`;

    if (!projectMeta) {
    setError(true);
    }

    if (!markdownFiles[path]) {
      setError(true);
      return;
    }

    markdownFiles[path]()
  .then(raw => {
      setContent(raw);
    }
  )
  .catch(err => {
    console.error('Failed to load markdown file:', err);
    setError(true); 
  });

  }, [project]);

  if (error) {
    return <div className="p-8">Project not found.</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <div className="flex items-center flex-col p-[20px] gap-[35px]">
        <h1 className="text-5xl font-inconsolata font-bold">{projectMeta.title}</h1>
        <img src={projectMeta.imageUrl} alt={`${project}image`} className="rounded-md" />
        <button onClick={() => window.open(projectMeta.link, "_blank")} className="px-3 py-2 bg-accent text-dark-grey font-effra font-light rounded-full text-[18px] hover:bg-off-white hover:text-dark-grey transition-colors duration-200">
            View Project
        </button>
      </div>
      <ReactMarkdown components={MarkdownComponent}>{content}</ReactMarkdown>
    </div>
  );
}

export default ProjectPage;
