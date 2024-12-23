import { Cpu } from "lucide-react";

const FloatingChip = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute left-1/4 top-1/4 animate-spin-slow opacity-20">
        <Cpu className="w-16 h-16 text-primary" strokeWidth={1} />
      </div>
      <div className="absolute right-1/4 bottom-1/4 animate-spin-slow opacity-20">
        <Cpu className="w-12 h-12 text-blue-500" strokeWidth={1} />
      </div>
      <div className="absolute left-1/3 bottom-1/3 animate-spin-slow opacity-15">
        <Cpu className="w-8 h-8 text-purple-500" strokeWidth={1} />
      </div>
      <div className="absolute right-1/3 top-1/3 animate-spin-slow opacity-15">
        <Cpu className="w-10 h-10 text-indigo-500" strokeWidth={1} />
      </div>
      <div className="absolute left-2/3 top-1/4 animate-spin-slow opacity-20">
        <Cpu className="w-14 h-14 text-violet-500" strokeWidth={1} />
      </div>
      <div className="absolute right-2/3 bottom-1/4 animate-spin-slow opacity-15">
        <Cpu className="w-6 h-6 text-blue-400" strokeWidth={1} />
      </div>
      <div className="absolute left-1/2 top-1/2 animate-spin-slow opacity-20">
        <Cpu className="w-12 h-12 text-primary" strokeWidth={1} />
      </div>
      <div className="absolute right-1/5 top-2/3 animate-spin-slow opacity-15">
        <Cpu className="w-8 h-8 text-blue-300" strokeWidth={1} />
      </div>
    </div>
  );
};

export default FloatingChip;