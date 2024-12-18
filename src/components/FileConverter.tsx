import { useState } from "react";
import { Upload, FileType, Download, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
    
    // Add file type validation here
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
    
    // Simulate conversion process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    setConverting(false);
    toast.success("File converted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            File Converter
          </h1>
          <p className="text-muted-foreground">
            Convert your files with our futuristic converter
          </p>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="upload-zone border-2 border-dashed rounded-lg p-12 text-center space-y-4 cursor-pointer"
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] as File)}
            accept=".jpg,.jpeg,.png,.pdf"
          />
          
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          
          {file ? (
            <div className="space-y-2">
              <p className="text-lg font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium">
                Drop your file here or click to browse
              </p>
              <p className="text-sm text-muted-foreground">
                Supports JPG, PNG and PDF
              </p>
            </div>
          )}
        </div>

        {file && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                {converting && (
                  <Progress value={progress} className="glow" />
                )}
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button
                onClick={convertFile}
                disabled={converting}
                className="gap-2"
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
                <Button variant="secondary" className="gap-2">
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