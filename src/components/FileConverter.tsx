import { FileConverterHeader } from "./file-converter/FileConverterHeader";
import { DropZone } from "./file-converter/DropZone";
import { ConversionControls } from "./file-converter/ConversionControls";
import { useFileConversion } from "./file-converter/useFileConversion";
import WireframeBackground from "./WireframeBackground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircuitBoard, Music } from "lucide-react";

export const FileConverter = () => {
  const {
    file,
    converting,
    progress,
    convertedFile,
    handleFileSelect,
    convertFile,
    handleDownload,
  } = useFileConversion();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background/95 to-background/90">
      <WireframeBackground />
      <div className="w-full max-w-2xl space-y-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl -z-10" />
        
        <FileConverterHeader />

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="general" 
              className="flex items-center gap-2"
            >
              <CircuitBoard className="w-4 h-4" />
              General Convert
            </TabsTrigger>
            <TabsTrigger 
              value="audio" 
              className="flex items-center gap-2"
            >
              <Music className="w-4 h-4" />
              Audio Convert
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <DropZone 
              file={file}
              onFileSelect={handleFileSelect}
              acceptedTypes={['image/jpeg', 'image/png', 'application/pdf']}
            />
          </TabsContent>
          
          <TabsContent value="audio">
            <DropZone 
              file={file}
              onFileSelect={handleFileSelect}
              acceptedTypes={['audio/mpeg', 'video/mp4']}
            />
          </TabsContent>
        </Tabs>

        <ConversionControls
          file={file}
          converting={converting}
          progress={progress}
          convertedFile={convertedFile}
          onConvert={convertFile}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
};