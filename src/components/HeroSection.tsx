
import { useState } from 'react';
import { Upload, Play, FileText, File, Table, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onRunTask: (prompt: string, files?: File[]) => void;
}

const HeroSection = ({ onRunTask }: HeroSectionProps) => {
  const [prompt, setPrompt] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const supportedFiles = files.filter(file => 
      ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'].includes(file.type)
    );
    setUploadedFiles(prev => [...prev, ...supportedFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return <FileText className="w-4 h-4 text-red-500" />;
    if (file.type.includes('word')) return <File className="w-4 h-4 text-blue-500" />;
    if (file.type.includes('sheet') || file.type.includes('csv')) return <Table className="w-4 h-4 text-green-500" />;
    return <BarChart3 className="w-4 h-4 text-cinema-silver" />;
  };

  const handleRunTask = () => {
    if (prompt.trim()) {
      onRunTask(prompt, uploadedFiles.length > 0 ? uploadedFiles : undefined);
    }
  };

  return (
    <div className="min-h-screen bg-cinema-gradient flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl w-full">
        {/* Main Heading */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-cinema-silver mb-6">
            AI <span className="text-cinema-electric-blue">Director</span>
          </h1>
          <p className="text-xl text-cinema-silver/70 max-w-2xl mx-auto">
            Watch AI work like a human operator. Real-time browser automation with cinematic precision.
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Prompt Input */}
          <div className="md:col-span-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your task or upload files to analyze..."
              className="hero-input"
              onKeyPress={(e) => e.key === 'Enter' && handleRunTask()}
            />
          </div>

          {/* File Upload Area */}
          <div
            className={`file-upload ${dragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              multiple
              accept=".pdf,.docx,.xlsx,.csv"
              onChange={handleFileInput}
              className="hidden"
            />
            <Upload className="w-6 h-6 text-cinema-silver/50 mx-auto mb-2" />
            <p className="text-sm text-cinema-silver/70">
              Drop files or click
            </p>
            <p className="text-xs text-cinema-silver/50 mt-1">
              PDF, DOCX, XLSX, CSV
            </p>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-cinema-black-light/50 px-3 py-2 rounded-lg">
                  {getFileIcon(file)}
                  <span className="text-sm text-cinema-silver truncate max-w-32">
                    {file.name}
                  </span>
                  <button
                    onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                    className="text-cinema-silver/50 hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Run Button */}
        <div className="text-center">
          <Button
            onClick={handleRunTask}
            disabled={!prompt.trim()}
            className="hero-button text-lg px-12 py-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5 mr-2" />
            Run Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
