import { Cpu } from "lucide-react";

const FloatingChip = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Falling CPUs */}
      <div className="absolute left-[10%] animate-fall opacity-20" style={{ animationDelay: '0s' }}>
        <Cpu className="w-10 h-10 text-primary" strokeWidth={1} />
      </div>
      <div className="absolute left-[20%] animate-fall opacity-15" style={{ animationDelay: '2s' }}>
        <Cpu className="w-8 h-8 text-blue-400" strokeWidth={1} />
      </div>
      <div className="absolute left-[30%] animate-fall opacity-20" style={{ animationDelay: '4s' }}>
        <Cpu className="w-12 h-12 text-purple-500" strokeWidth={1} />
      </div>
      <div className="absolute left-[40%] animate-fall opacity-15" style={{ animationDelay: '6s' }}>
        <Cpu className="w-6 h-6 text-indigo-500" strokeWidth={1} />
      </div>
      <div className="absolute left-[50%] animate-fall opacity-20" style={{ animationDelay: '8s' }}>
        <Cpu className="w-14 h-14 text-violet-500" strokeWidth={1} />
      </div>
      <div className="absolute left-[60%] animate-fall opacity-15" style={{ animationDelay: '10s' }}>
        <Cpu className="w-8 h-8 text-blue-300" strokeWidth={1} />
      </div>
      <div className="absolute left-[70%] animate-fall opacity-20" style={{ animationDelay: '12s' }}>
        <Cpu className="w-10 h-10 text-primary" strokeWidth={1} />
      </div>
      <div className="absolute left-[80%] animate-fall opacity-15" style={{ animationDelay: '14s' }}>
        <Cpu className="w-12 h-12 text-blue-500" strokeWidth={1} />
      </div>
      <div className="absolute left-[90%] animate-fall opacity-20" style={{ animationDelay: '16s' }}>
        <Cpu className="w-8 h-8 text-purple-500" strokeWidth={1} />
      </div>
      <div className="absolute left-[15%] animate-fall opacity-15" style={{ animationDelay: '18s' }}>
        <Cpu className="w-10 h-10 text-indigo-500" strokeWidth={1} />
      </div>
      <div className="absolute left-[25%] animate-fall opacity-20" style={{ animationDelay: '20s' }}>
        <Cpu className="w-6 h-6 text-violet-500" strokeWidth={1} />
      </div>
      <div className="absolute left-[35%] animate-fall opacity-15" style={{ animationDelay: '22s' }}>
        <Cpu className="w-14 h-14 text-blue-300" strokeWidth={1} />
      </div>
      <div className="absolute left-[45%] animate-fall opacity-20" style={{ animationDelay: '24s' }}>
        <Cpu className="w-8 h-8 text-primary" strokeWidth={1} />
      </div>
      <div className="absolute left-[55%] animate-fall opacity-15" style={{ animationDelay: '26s' }}>
        <Cpu className="w-12 h-12 text-blue-500" strokeWidth={1} />
      </div>
      <div className="absolute left-[65%] animate-fall opacity-20" style={{ animationDelay: '28s' }}>
        <Cpu className="w-10 h-10 text-purple-500" strokeWidth={1} />
      </div>
      <div className="absolute left-[75%] animate-fall opacity-15" style={{ animationDelay: '30s' }}>
        <Cpu className="w-6 h-6 text-indigo-500" strokeWidth={1} />
      </div>
      <div className="absolute left-[85%] animate-fall opacity-20" style={{ animationDelay: '32s' }}>
        <Cpu className="w-14 h-14 text-violet-500" strokeWidth={1} />
      </div>
      <div className="absolute left-[95%] animate-fall opacity-15" style={{ animationDelay: '34s' }}>
        <Cpu className="w-8 h-8 text-blue-300" strokeWidth={1} />
      </div>
    </div>
  );
};

export default FloatingChip;