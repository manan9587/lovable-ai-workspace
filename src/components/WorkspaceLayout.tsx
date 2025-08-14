
import { useState, useEffect } from 'react';
import { Clock, MousePointer, Type, FileText, Eye, CheckCircle } from 'lucide-react';

interface Action {
  id: string;
  type: 'click' | 'type' | 'scroll' | 'read' | 'analyze' | 'complete';
  description: string;
  timestamp: string;
  status: 'pending' | 'active' | 'completed';
}

interface WorkspaceLayoutProps {
  prompt: string;
  files?: File[];
}

const WorkspaceLayout = ({ prompt, files }: WorkspaceLayoutProps) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);

  // Simulate AI actions
  useEffect(() => {
    const simulatedActions: Action[] = [
      {
        id: '1',
        type: 'analyze',
        description: 'Analyzing task requirements',
        timestamp: new Date().toLocaleTimeString(),
        status: 'completed'
      },
      {
        id: '2',
        type: 'read',
        description: files ? `Processing ${files.length} uploaded files` : 'Opening browser session',
        timestamp: new Date(Date.now() + 1000).toLocaleTimeString(),
        status: 'active'
      },
      {
        id: '3',
        type: 'click',
        description: 'Navigating to target website',
        timestamp: new Date(Date.now() + 3000).toLocaleTimeString(),
        status: 'pending'
      },
      {
        id: '4',
        type: 'type',
        description: 'Filling form fields',
        timestamp: new Date(Date.now() + 5000).toLocaleTimeString(),
        status: 'pending'
      },
      {
        id: '5',
        type: 'scroll',
        description: 'Scanning page content',
        timestamp: new Date(Date.now() + 7000).toLocaleTimeString(),
        status: 'pending'
      },
      {
        id: '6',
        type: 'complete',
        description: 'Task completed successfully',
        timestamp: new Date(Date.now() + 9000).toLocaleTimeString(),
        status: 'pending'
      }
    ];

    setActions(simulatedActions);

    // Simulate progress
    const interval = setInterval(() => {
      setCurrentActionIndex(prev => {
        if (prev < simulatedActions.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [prompt, files]);

  // Update action statuses based on current progress
  useEffect(() => {
    setActions(prev => prev.map((action, index) => ({
      ...action,
      status: index < currentActionIndex ? 'completed' : 
             index === currentActionIndex ? 'active' : 'pending'
    })));
  }, [currentActionIndex]);

  const getActionIcon = (type: string, status: string) => {
    const iconClass = `w-4 h-4 ${
      status === 'completed' ? 'text-green-400' :
      status === 'active' ? 'text-cinema-electric-blue' :
      'text-cinema-silver/50'
    }`;

    switch (type) {
      case 'click': return <MousePointer className={iconClass} />;
      case 'type': return <Type className={iconClass} />;
      case 'scroll': return <Eye className={iconClass} />;
      case 'read': return <FileText className={iconClass} />;
      case 'analyze': return <Eye className={iconClass} />;
      case 'complete': return <CheckCircle className={iconClass} />;
      default: return <MousePointer className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-cinema-black pt-20">
      <div className="flex h-[calc(100vh-5rem)]">
        {/* Left Sidebar - Action Log */}
        <div className="w-96 bg-cinema-black-light border-r border-cinema-silver/10 animate-slide-in-left">
          <div className="p-6">
            {/* User Prompt Card */}
            <div className="sidebar-card mb-6">
              <h3 className="text-lg font-semibold text-cinema-electric-blue mb-2">
                Current Task
              </h3>
              <p className="text-cinema-silver text-sm leading-relaxed">
                {prompt}
              </p>
              {files && files.length > 0 && (
                <div className="mt-3 pt-3 border-t border-cinema-silver/10">
                  <p className="text-xs text-cinema-silver/70 mb-2">
                    Uploaded Files ({files.length})
                  </p>
                  {files.slice(0, 3).map((file, index) => (
                    <div key={index} className="text-xs text-cinema-silver/60 truncate">
                      {file.name}
                    </div>
                  ))}
                  {files.length > 3 && (
                    <div className="text-xs text-cinema-silver/60">
                      +{files.length - 3} more files
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Log */}
            <div className="sidebar-card">
              <h3 className="text-lg font-semibold text-cinema-silver mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cinema-electric-blue" />
                Action Log
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {actions.map((action) => (
                  <div
                    key={action.id}
                    className={`action-log-item ${action.status === 'active' ? 'active' : ''}`}
                  >
                    {getActionIcon(action.type, action.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-cinema-silver truncate">
                        {action.description}
                      </p>
                      <p className="text-xs text-cinema-silver/50">
                        {action.timestamp}
                      </p>
                    </div>
                    {action.status === 'active' && (
                      <div className="terminal-cursor text-cinema-electric-blue"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Pane - Browser Simulation */}
        <div className="flex-1 p-6 animate-slide-in-right">
          <div className="browser-frame h-full">
            {/* Browser Header */}
            <div className="browser-header">
              <div className="flex items-center gap-2">
                <div className="browser-dot red"></div>
                <div className="browser-dot yellow"></div>
                <div className="browser-dot green"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-cinema-black rounded px-3 py-1 text-sm text-cinema-silver/70">
                  https://example.com
                </div>
              </div>
            </div>

            {/* Browser Content */}
            <div className="p-8 h-full bg-gradient-to-br from-cinema-black-light to-cinema-black relative overflow-hidden">
              {/* Simulated Website Content */}
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-cinema-electric-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 element-glow">
                    <div className="w-8 h-8 bg-cinema-electric-blue rounded-full animate-pulse"></div>
                  </div>
                  <h1 className="text-3xl font-bold text-cinema-silver mb-2">
                    AI Browser Simulation
                  </h1>
                  <p className="text-cinema-silver/70">
                    Watch the AI interact with web elements in real-time
                  </p>
                </div>

                {/* Simulated Form */}
                <div className="bg-cinema-black-light/50 rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold text-cinema-silver mb-4">Sample Form</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-cinema-silver/70 mb-2">Name</label>
                      <input 
                        type="text" 
                        className={`w-full bg-cinema-black border border-cinema-silver/20 rounded px-3 py-2 text-cinema-silver ${
                          currentActionIndex >= 3 ? 'element-glow' : ''
                        }`}
                        value={currentActionIndex >= 4 ? "AI Generated Content" : ""}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-cinema-silver/70 mb-2">Email</label>
                      <input 
                        type="email" 
                        className={`w-full bg-cinema-black border border-cinema-silver/20 rounded px-3 py-2 text-cinema-silver ${
                          currentActionIndex >= 4 ? 'element-glow' : ''
                        }`}
                        value={currentActionIndex >= 5 ? "ai@example.com" : ""}
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Simulated Data Display */}
                <div className="bg-cinema-black-light/50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-cinema-silver mb-4">Data Analysis</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-cinema-black/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-cinema-electric-blue mb-1">
                          {currentActionIndex >= 5 ? `${i * 23}%` : '0%'}
                        </div>
                        <div className="text-sm text-cinema-silver/70">Metric {i}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cursor Simulation */}
              {currentActionIndex > 0 && currentActionIndex < actions.length - 1 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <MousePointer className="w-6 h-6 text-cinema-electric-blue animate-pulse" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-cinema-electric-blue/20 px-2 py-1 rounded text-xs text-cinema-electric-blue whitespace-nowrap">
                    AI Operating...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceLayout;
