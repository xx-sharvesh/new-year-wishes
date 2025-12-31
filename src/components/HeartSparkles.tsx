import { Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  left: number;
  top: number;
  delay: number;
  isHeart: boolean;
}

const HeartSparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < 30; i++) {
      newSparkles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        isHeart: Math.random() > 0.5,
      });
    }
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {sparkles.map((sparkle) =>
        sparkle.isHeart ? (
          <Heart
            key={sparkle.id}
            className="absolute text-primary fill-primary"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              width: 16,
              height: 16,
              animation: `sparkle 2s ease-in-out ${sparkle.delay}s infinite`,
            }}
          />
        ) : (
          <Sparkles
            key={sparkle.id}
            className="absolute text-accent-foreground"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              width: 20,
              height: 20,
              animation: `sparkle 2.5s ease-in-out ${sparkle.delay}s infinite`,
            }}
          />
        )
      )}
    </div>
  );
};

export default HeartSparkles;
