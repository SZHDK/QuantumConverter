import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ConversionControlsProps {
  file: File | null;
  converting: boolean;
  progress: number;
  convertedFile: string | null;
  onConvert: () => void;
  onDownload: () => void;
}

export const ConversionControls = ({
  file,
  converting,
  progress,
  convertedFile,
  onConvert,
  onDownload,
}: ConversionControlsProps) => {
  if (!file) return null;

  return (
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
          onClick={onConvert}
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
        
        {!converting && convertedFile && (
          <Button 
            onClick={onDownload}
            variant="secondary" 
            className="gap-2 bg-secondary/50 backdrop-blur-sm hover:bg-secondary/60 transition-all duration-300"
          >
            Download <Download className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};