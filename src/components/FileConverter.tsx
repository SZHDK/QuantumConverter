import { useState } from "react";
import { Upload, FileType, Download, ArrowRight, Cpu } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import WireframeBackground from "./WireframeBackground";

export const FileConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (selectedFile: File) => {
    if (!selectedFile) return;
    
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Unsupported file type. Please upload JPG, PNG or PDF files.");
      return;
    }
    
    setFile(selectedFile);
    toast.success("File uploaded successfully!");
  };

  const convertFile = async () => {
    if (!file) return;
    
    setConverting(true);
    setProgress(0);
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    setConverting(false);
    toast.success("File converted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background/95 to-background/90">
      <WireframeBackground />
      <div className="w-full max-w-2xl space-y-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl -z-10" />
        
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 animate-fade-in">
            <Cpu className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Quantum File Converter
            </h1>
          </div>
          <p className="text-muted-foreground text-lg animate-fade-in">
            Convert your files with our next-gen technology
          </p>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="upload-zone border-2 border-dashed rounded-xl p-12 text-center space-y-4 cursor-pointer backdrop-blur-xl relative group transition-all duration-300 animate-fade-in"
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl -z-10" />
          
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] as File)}
            accept=".jpg,.jpeg,.png,.pdf"
          />
          
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-10 h-10 text-primary group-hover:text-primary/80 transition-colors" />
          </div>
          
          {file ? (
            <div className="space-y-2 animate-fade-in">
              <p className="text-xl font-medium bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                {file.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <p className="text-lg font-medium bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Drop your file here or click to browse
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Supports JPG, PNG and PDF
              </p>
            </div>
          )}
        </div>

        {file && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                {converting && (
                  <Progress 
                    value={progress} 
                    className="h-2 glow"
                  />
                )}
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button
                onClick={convertFile}
                disabled={converting}
                className="gap-2 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all duration-300"
              >
                {converting ? (
                  "Converting..."
                ) : (
                  <>
                    Convert <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
              
              {!converting && progress === 100 && (
                <Button 
                  variant="secondary" 
                  className="gap-2 bg-secondary/50 backdrop-blur-sm hover:bg-secondary/60 transition-all duration-300"
                >
                  Download <Download className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};