import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
  size: number;
  angle: number;
  distance: number;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

const colors = [
  "hsl(333, 71%, 60%)",
  "hsl(45, 100%, 70%)",
  "hsl(200, 100%, 70%)",
  "hsl(280, 80%, 70%)",
  "hsl(120, 70%, 60%)",
  "hsl(0, 100%, 70%)",
];

const Fireworks = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const createFirework = () => {
      const id = Date.now() + Math.random();
      const x = 10 + Math.random() * 80;
      const y = 15 + Math.random() * 40;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const particles: Particle[] = [];
      for (let i = 0; i < 12; i++) {
        particles.push({
          id: i,
          x: 0,
          y: 0,
          color,
          delay: Math.random() * 0.2,
          size: 3 + Math.random() * 4,
          angle: (i * 30) * (Math.PI / 180),
          distance: 40 + Math.random() * 60,
        });
      }

      setFireworks((prev) => [...prev, { id, x, y, particles }]);

      setTimeout(() => {
        setFireworks((prev) => prev.filter((f) => f.id !== id));
      }, 2000);
    };

    // Initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(createFirework, i * 300);
    }

    // Continuous fireworks
    const interval = setInterval(createFirework, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
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
                boxShadow: `0 0 6px ${particle.color}, 0 0 12px ${particle.color}`,
                animation: `firework-particle 1.5s ease-out ${particle.delay}s forwards`,
                transform: `translate(-50%, -50%)`,
                ["--angle" as string]: `${particle.angle}rad`,
                ["--distance" as string]: `${particle.distance}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Fireworks;
