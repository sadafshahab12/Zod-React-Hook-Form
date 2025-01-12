import React, { useEffect, useRef } from "react";

const SnowFall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createSnowFlake = () => {
      const snowFlake = document.createElement("div");
      snowFlake.className = "snowflake";

      snowFlake.style.left = `${Math.random() * 100}vw`;
      snowFlake.style.width = `${Math.random() * 12 + 10}px`; // Larger dots
      snowFlake.style.height = snowFlake.style.width; // Make it a circle
      snowFlake.style.animationDuration = `${Math.random() * 3 + 2}s`;
      snowFlake.style.opacity = `${Math.random() * 0.8 + 0.2}`;
      snowFlake.style.fontSize = `${Math.random() * 10 + 10}px`;
      container.appendChild(snowFlake);

      snowFlake.addEventListener("animationend", () => {
        snowFlake.remove();
      });
    };
    const interval = setInterval(createSnowFlake, 200);
    return () => clearInterval(interval);
  }, []);
  return <div ref={containerRef} className="snowfall-container"></div>;
};

export default SnowFall;
