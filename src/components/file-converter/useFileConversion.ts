import { useState } from "react";
import { toast } from "sonner";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export const useFileConversion = () => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);
  const [ffmpeg] = useState(() => new FFmpeg());

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setConvertedFile(null);
    setProgress(0);
  };

  const convertMediaFile = async (inputFile: File) => {
    try {
      if (!ffmpeg.loaded) {
        toast.info("Loading audio converter...");
        await ffmpeg.load({
          coreURL: await toBlobURL(`/ffmpeg-core.js`, 'text/javascript'),
          wasmURL: await toBlobURL(`/ffmpeg-core.wasm`, 'application/wasm'),
        });
      }

      const inputData = await fetchFile(inputFile);
      const inputFileName = 'input' + (inputFile.type === 'video/mp4' ? '.mp4' : '.mp3');
      const outputFileName = 'output' + (inputFile.type === 'video/mp4' ? '.mp3' : '.mp4');

      await ffmpeg.writeFile(inputFileName, inputData);

      // Extract audio from MP4 and convert to MP3
      if (inputFile.type === 'video/mp4') {
        await ffmpeg.exec(['-i', inputFileName, '-vn', '-acodec', 'libmp3lame', '-q:a', '2', outputFileName]);
      } else {
        await ffmpeg.exec(['-i', inputFileName, '-c:a', 'aac', outputFileName]);
      }

      const outputData = await ffmpeg.readFile(outputFileName);
      const outputBlob = new Blob([outputData], { 
        type: inputFile.type === 'video/mp4' ? 'audio/mpeg' : 'video/mp4' 
      });
      return URL.createObjectURL(outputBlob);
    } catch (error) {
      console.error('FFmpeg error:', error);
      throw new Error('Failed to convert audio file');
    }
  };

  const convertFile = async () => {
    if (!file) return;
    
    setConverting(true);
    setProgress(0);
    
    try {
      if (file.type.includes('image')) {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
          const base64Data = e.target?.result as string;
          
          for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setProgress(i);
          }
          
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
        };
        
        reader.onerror = () => {
          throw new Error('Error reading file');
        };
        
        reader.readAsDataURL(file);
      } else if (file.type === 'audio/mpeg' || file.type === 'video/mp4') {
        toast.info("Starting audio conversion...");
        
        for (let i = 0; i <= 90; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setProgress(i);
        }
        
        const convertedUrl = await convertMediaFile(file);
        setConvertedFile(convertedUrl);
        setProgress(100);
      } else if (file.type === 'application/pdf') {
        // Handle PDF (keeping existing functionality)
        const reader = new FileReader();
        reader.onload = (e) => {
          setConvertedFile(e.target?.result as string);
        };
        reader.readAsDataURL(file);
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