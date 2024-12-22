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
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createGradient = (ctx: CanvasRenderingContext2D, hue: number, x: number, y: number) => {
      const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, Math.max(canvas.width, canvas.height) * 0.7 // Reduced radius for more concentrated effect
      );
      
      gradient.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.4)`); // Increased opacity
      gradient.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 70%, 50%, 0.2)`); // Increased opacity
      gradient.addColorStop(1, `hsla(${(hue + 120) % 360}, 70%, 50%, 0.1)`); // Added slight opacity at the edge
      
      return gradient;
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number) => {
      const gridSize = 40; // Slightly smaller grid
      const lineWidth = 1; // Thicker lines
      
      ctx.strokeStyle = "rgba(139, 92, 246, 0.2)"; // More visible grid lines
      ctx.lineWidth = lineWidth;

      // Calculate grid offset based on mouse position
      const xOffset = (offsetX % gridSize);
      const yOffset = (offsetY % gridSize);

      // Draw vertical lines
      for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
        const xPos = x + xOffset;
        ctx.beginPath();
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
        const yPos = y + yOffset;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(canvas.width, yPos);
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Smooth mouse following with faster response
      targetX += (mouseX - targetX) * 0.15; // Increased speed
      targetY += (mouseY - targetY) * 0.15; // Increased speed

      // Clear canvas with less fade for more persistence
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Reduced fade for more visible trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create and apply gradient based on mouse position
      const gradient = createGradient(ctx, hue, targetX, targetY);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw reactive grid
      drawGrid(ctx, targetX * 0.15, targetY * 0.15); // Increased movement multiplier

      // Update hue for color cycling
      hue = (hue + 0.5) % 360; // Faster color cycling

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("resize", resize);
    
    resize();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
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