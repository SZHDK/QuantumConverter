import { Upload } from "lucide-react";
import { toast } from "sonner";

interface DropZoneProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  acceptedTypes: string[];
}

export const DropZone = ({ file, onFileSelect, acceptedTypes }: DropZoneProps) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (selectedFile: File) => {
    if (!selectedFile) return;
    
    if (!acceptedTypes.includes(selectedFile.type)) {
      toast.error(`Unsupported file type. Please upload ${acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} files.`);
      return;
    }
    
    onFileSelect(selectedFile);
    toast.success("File uploaded successfully!");
  };

  const getAcceptString = () => {
    return acceptedTypes.map(type => {
      switch(type) {
        case 'image/jpeg': return '.jpg,.jpeg';
        case 'image/png': return '.png';
        case 'application/pdf': return '.pdf';
        case 'audio/mpeg': return '.mp3';
        case 'video/mp4': return '.mp4';
        default: return '';
      }
    }).filter(Boolean).join(',');
  };

  const getFileTypeDescription = () => {
    const types = acceptedTypes.map(type => type.split('/')[1].toUpperCase());
    return types.join(', ');
  };

  return (
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
        accept={getAcceptString()}
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
            Supports {getFileTypeDescription()}
          </p>
        </div>
      )}
    </div>
  );
};