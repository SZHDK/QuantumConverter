import { useState } from "react";
import { toast } from "sonner";

export const useFileConversion = () => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setConvertedFile(null);
    setProgress(0);
  };

  const convertFile = async () => {
    if (!file) return;
    
    setConverting(true);
    setProgress(0);
    
    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setProgress(i);
        }
        
        if (file.type.includes('image')) {
          const img = new Image();
          img.src = base64Data;
          
          await new Promise((resolve) => {
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              
              const ctx = canvas.getContext('2d');
              if (!ctx) throw new Error('Could not get canvas context');
              
              ctx.drawImage(img, 0, 0);
              
              const newFormat = file.type === 'image/png' ? 'image/jpeg' : 'image/png';
              const convertedDataUrl = canvas.toDataURL(newFormat, 0.8);
              
              setConvertedFile(convertedDataUrl);
              resolve(null);
            };
          });
        } else if (file.type === 'application/pdf') {
          setConvertedFile(base64Data);
        }
        
        setConverting(false);
        toast.success("File converted successfully!");
      };
      
      reader.onerror = () => {
        throw new Error('Error reading file');
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      setConverting(false);
      toast.error("Error converting file. Please try again.");
      console.error('Conversion error:', error);
    }
  };

  const handleDownload = () => {
    if (!convertedFile || !file) return;
    
    const link = document.createElement('a');
    link.href = convertedFile;
    
    const originalExt = file.name.split('.').pop();
    const newExt = file.type === 'image/png' ? 'jpg' : 'png';
    const newFilename = file.name.replace(`.${originalExt}`, `.${newExt}`);
    
    link.download = newFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("File downloaded successfully!");
  };

  return {
    file,
    converting,
    progress,
    convertedFile,
    handleFileSelect,
    convertFile,
    handleDownload,
  };
};