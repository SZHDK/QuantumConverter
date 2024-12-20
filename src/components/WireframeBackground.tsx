import { useEffect, useRef } from "react";

const WireframeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let hue = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createGradient = (ctx: CanvasRenderingContext2D, hue: number) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      // Primary color (purple-ish)
      gradient.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.4)`);
      // Secondary color (blue-ish)
      gradient.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 70%, 50%, 0.4)`);
      // Tertiary color (cyan-ish)
      gradient.addColorStop(1, `hsla(${(hue + 120) % 360}, 70%, 50%, 0.4)`);
      
      return gradient;
    };

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
      const gridSize = 50;
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)";
      ctx.lineWidth = 0.5;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create and apply gradient
      const gradient = createGradient(ctx, hue);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid
      drawGrid(ctx);

      // Update hue for next frame
      hue = (hue + 0.2) % 360;

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-50"
      style={{ zIndex: -1 }}
    />
  );
};

export default WireframeBackground;