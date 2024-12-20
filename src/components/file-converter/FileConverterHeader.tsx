import { Cpu } from "lucide-react";

export const FileConverterHeader = () => {
  return (
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
  );
};