import { useEffect, useState } from "react";

interface Particle {
  id: number;
  angle: number;
  velocity: number;
  color: string;
  size: number;
}

interface Firework {
  id: number;
  x: number;
  targetY: number;
  color: string;
  particles: Particle[];
  phase: "launching" | "exploding";
  launchDuration: number;
}

const colors = [
  "#ff6b9d", // pink
  "#ffd93d", // gold
  "#6bcbff", // blue
  "#c56bff", // purple
  "#6bff8c", // green
  "#ff6b6b", // red
  "#ffffff", // white
];

const Fireworks = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const createFirework = () => {
      const id = Date.now() + Math.random();
      const x = 15 + Math.random() * 70;
      const targetY = 15 + Math.random() * 35;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const launchDuration = 0.8 + Math.random() * 0.4;

      const particles: Particle[] = [];
      const particleCount = 20 + Math.floor(Math.random() * 15);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          id: i,
          angle: (i * (360 / particleCount)) * (Math.PI / 180),
          velocity: 60 + Math.random() * 80,
          color: Math.random() > 0.3 ? color : colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 3,
        });
      }

      const newFirework: Firework = {
        id,
        x,
        targetY,
        color,
        particles,
        phase: "launching",
        launchDuration,
      };

      setFireworks((prev) => [...prev, newFirework]);

      // Transition to exploding phase
      setTimeout(() => {
        setFireworks((prev) =>
          prev.map((f) => (f.id === id ? { ...f, phase: "exploding" } : f))
        );
      }, launchDuration * 1000);

      // Remove firework after explosion
      setTimeout(() => {
        setFireworks((prev) => prev.filter((f) => f.id !== id));
      }, launchDuration * 1000 + 2000);
    };

    // Initial burst of fireworks
    for (let i = 0; i < 3; i++) {
      setTimeout(createFirework, i * 400);
    }

    // Continuous fireworks
    const interval = setInterval(createFirework, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {fireworks.map((firework) => (
        <div key={firework.id}>
          {/* Launching trail */}
          {firework.phase === "launching" && (
            <div
              className="absolute w-1 rounded-full"
              style={{
                left: `${firework.x}%`,
                bottom: 0,
                height: "20px",
                background: `linear-gradient(to top, transparent, ${firework.color})`,
                boxShadow: `0 0 8px ${firework.color}, 0 0 16px ${firework.color}`,
                animation: `launch ${firework.launchDuration}s ease-out forwards`,
                ["--target-y" as string]: `${100 - firework.targetY}vh`,
              }}
            />
          )}

          {/* Explosion particles */}
          {firework.phase === "exploding" && (
            <div
              className="absolute"
              style={{
                left: `${firework.x}%`,
                top: `${firework.targetY}%`,
              }}
            >
              {firework.particles.map((particle) => (
                <div
                  key={particle.id}
                  className="absolute rounded-full"
                  style={{
                    width: particle.size,
                    height: particle.size,
                    backgroundColor: particle.color,
                    boxShadow: `0 0 4px ${particle.color}, 0 0 8px ${particle.color}`,
                    animation: `explode 1.8s ease-out forwards`,
                    ["--angle" as string]: particle.angle,
                    ["--velocity" as string]: `${particle.velocity}px`,
                  }}
                />
              ))}
              {/* Center flash */}
              <div
                className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${firework.color}, transparent)`,
                  animation: "flash 0.3s ease-out forwards",
                }}
              />
            </div>
          )}
        </div>
      ))}

      <style>{`
        @keyframes launch {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(-1 * var(--target-y)));
            opacity: 0;
          }
        }

        @keyframes explode {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + cos(var(--angle)) * var(--velocity)),
              calc(-50% + sin(var(--angle)) * var(--velocity) + 30px)
            ) scale(0.3);
            opacity: 0;
          }
        }

        @keyframes flash {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Fireworks;
