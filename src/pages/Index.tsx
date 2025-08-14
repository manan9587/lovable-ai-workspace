
import { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import HeroSection from '@/components/HeroSection';
import WorkspaceLayout from '@/components/WorkspaceLayout';

const Index = () => {
  const [isWorkspaceActive, setIsWorkspaceActive] = useState(false);
  const [currentTask, setCurrentTask] = useState<{
    prompt: string;
    files?: File[];
  } | null>(null);

  const handleRunTask = (prompt: string, files?: File[]) => {
    setCurrentTask({ prompt, files });
    setIsWorkspaceActive(true);
  };

  const handleBackToHome = () => {
    setIsWorkspaceActive(false);
    setCurrentTask(null);
  };

  return (
    <div className="min-h-screen bg-cinema-black text-cinema-silver">
      <NavigationBar />
      
      {!isWorkspaceActive ? (
        <HeroSection onRunTask={handleRunTask} />
      ) : (
        currentTask && (
          <>
            <WorkspaceLayout 
              prompt={currentTask.prompt} 
              files={currentTask.files} 
            />
            {/* Back to Home Button */}
            <button
              onClick={handleBackToHome}
              className="fixed bottom-6 left-6 bg-cinema-silver/10 hover:bg-cinema-silver/20 backdrop-blur-sm border border-cinema-silver/20 rounded-full px-6 py-3 text-cinema-silver transition-all duration-300 z-50"
            >
              ← Back to Home
            </button>
          </>
        )
      )}
    </div>
  );
};

export default Index;
