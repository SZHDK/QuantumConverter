export interface FileConversionHook {
  (): {
    file: File | null;
    converting: boolean;
    progress: number;
    convertedFile: string | null;
    handleFileSelect: (selectedFile: File) => void;
    convertFile: () => Promise<void>;
    handleDownload: () => void;
  };
}