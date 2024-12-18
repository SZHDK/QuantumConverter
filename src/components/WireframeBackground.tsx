import { useEffect, useRef } from "react";

const WireframeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set line style with increased opacity
      ctx.strokeStyle = "rgba(139, 92, 246, 0.2)"; // Increased opacity from 0.1 to 0.2
      ctx.lineWidth = 1.5; // Increased line width from 1 to 1.5

      // Create grid with smaller size for more detail
      const gridSize = 30; // Decreased from 50 to 30
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;

          // Calculate distance from mouse with increased range
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 300; // Increased from 200 to 300

          if (dist < maxDist) {
            const scale = 1 - dist / maxDist;
            
            // Draw vertical lines with enhanced wave effect
            if (i < cols) {
              const offsetY = scale * 25 * Math.sin(Date.now() / 800 + x / 80); // Enhanced wave effect
              drawLine(x, y + offsetY, x + gridSize, y + offsetY);
            }
            
            // Draw horizontal lines with enhanced wave effect
            if (j < rows) {
              const offsetX = scale * 25 * Math.sin(Date.now() / 800 + y / 80); // Enhanced wave effect
              drawLine(x + offsetX, y, x + offsetX, y + gridSize);
            }
          } else {
            // Draw regular grid with slight animation
            const time = Date.now() / 5000;
            const baseOffset = Math.sin(time + (x + y) / 200) * 2;
            
            if (i < cols) drawLine(x, y + baseOffset, x + gridSize, y + baseOffset);
            if (j < rows) drawLine(x + baseOffset, y, x + baseOffset, y + gridSize);
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default WireframeBackground;