import { useState } from "react";
import { toast } from "sonner";
import { convertMediaFile } from "./utils/audioConversion";
import { convertImageFile } from "./utils/imageConversion";
import { handlePdfFile } from "./utils/fileHandling";
import { FileConversionHook } from "./types";

export const useFileConversion: FileConversionHook = () => {
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
      if (file.type.includes('image')) {
        const convertedUrl = await convertImageFile(file, setProgress);
        setConvertedFile(convertedUrl);
      } else if (file.type === 'audio/mpeg' || file.type === 'video/mp4') {
        toast.info("Starting audio conversion...");
        const convertedUrl = await convertMediaFile(file, setProgress);
        setConvertedFile(convertedUrl);
        setProgress(100);
      } else if (file.type === 'application/pdf') {
        const convertedUrl = await handlePdfFile(file);
        setConvertedFile(convertedUrl);
      }
      
      setConverting(false);
      toast.success("File converted successfully!");
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
    let newExt = originalExt;
    
    if (file.type === 'image/png') newExt = 'jpg';
    else if (file.type === 'image/jpeg') newExt = 'png';
    else if (file.type === 'video/mp4') newExt = 'mp3';
    else if (file.type === 'audio/mpeg') newExt = 'mp4';
    
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