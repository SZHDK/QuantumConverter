import { Cpu } from "lucide-react";

const FloatingChip = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute left-1/4 top-1/4 animate-spin-slow opacity-20">
        <Cpu className="w-32 h-32 text-primary" strokeWidth={1} />
      </div>
      <div className="absolute right-1/4 bottom-1/4 animate-spin-slow opacity-20">
        <Cpu className="w-24 h-24 text-blue-500" strokeWidth={1} />
      </div>
    </div>
  );
};

export default FloatingChip;