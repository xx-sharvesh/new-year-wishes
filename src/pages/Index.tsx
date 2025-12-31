import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import Fireworks from "@/components/Fireworks";
import Stars from "@/components/Stars";

type Stage = "greeting" | "letter" | "celebration";

const Index = () => {
  const [stage, setStage] = useState<Stage>("greeting");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (stage === "greeting") {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setStage("letter");
          setIsTransitioning(false);
        }, 1000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStage("celebration");
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-accent overflow-hidden relative">
      <FloatingHearts />
      
      {/* Greeting Stage */}
      {stage === "greeting" && (
        <div
          className={`flex min-h-screen items-center justify-center ${
            isTransitioning ? "animate-fade-out" : "animate-fade-in"
          }`}
        >
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground tracking-wide">
              Hi, my love{" "}
              <Heart className="inline-block text-primary fill-primary animate-pulse-heart w-12 h-12 md:w-16 md:h-16" />
            </h1>
          </div>
        </div>
      )}

      {/* Letter Stage */}
      {stage === "letter" && (
        <div
          className={`flex min-h-screen items-center justify-center px-4 py-12 ${
            isTransitioning ? "animate-fade-out" : "animate-fade-in"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-xl border border-primary/20">
              <div className="prose prose-lg text-foreground font-serif leading-relaxed space-y-6">
                <p className="text-2xl md:text-3xl font-semibold text-primary mb-8">
                  To the one,
                </p>
                
                <p className="text-base md:text-lg">
                  the one that I fell harder for as every minute went by. as you continue to take my breath away in many ways more than one. This day i was there standing under the tree near the pool forcing you to get out of your hostel against your will and presenting you an ice cream. walking a inch away from you knowing full well all i want to do was hold you. The tears from your eyes or atleast almost tears that blossomed into a smile when you were at the bench was the first and best ever gift i could for in that day. and you did something better. you stayed and gave it to me everyday. it felt magical at first and then it felt surreal and it still is, the way you smile and the way it echoes in my ears and radiate a sense of comforting smile and giggle down my spine.
                </p>

                <p className="text-base md:text-lg">
                  honestly, you dont deserve just a letter or a paragraph, you deserve a series of books filled with poems and words with the way you make the world softer, brighter and happier.
                </p>

                <p className="text-base md:text-lg">
                  Ammu, 365 days and all i still ever think is you and you only. the way i felt then and now have not changed , if anything i think i might jump on you this time if i was ever there in that situation again cause i dont have to hold back now from grabbing you and kissing you harder. this year has been a lot, baby but when i think about this year. allll i can think about is you. well i do even normally but 2025 had to offer one thing to me and it was you, just like you say an apology from the universe. It is impossible to just say you add colours to my page when i know just knowing that you are by my side adds colour to all of my world. the day that you smiled i smiled harder thinking about it day and night 27 hours a day, the day breathed near me. i stopped. i forgot how to. and my heart haven't learned what's love. cause it is you and as soon as i see you , hear you. my heart stammers a little and then remembers. oh to be with you and loved by you. I gotta tell you ammu. its impossible to tell you how i feel cause i just dont know how to fit in soooo much emotions into one. but i know one thing my love. I am grateful, I will always be. Not just my memory but my heart too sync in ache of not being able to hold you right now.
                </p>

                <div className="pt-6 space-y-2 text-base md:text-lg">
                  <p className="font-semibold text-primary">So my princess,</p>
                  <p>Thank you</p>
                  <p>Thank you for being there</p>
                  <p>Thank you for Listening</p>
                  <p>Thank you for Smiling</p>
                  <p>Thank you for loving me</p>
                  <p>Thank you for Everything there is</p>
                </div>

                <p className="text-base md:text-lg pt-4">
                  You were my favourite part of my year. Even if the world makes you question your worth, I'll be the voice reminding you you're more than enough.
                </p>

                <p className="text-xl md:text-2xl font-bold text-primary pt-6">
                  I Love you so fucking much.
                </p>
              </div>

              <div className="flex justify-center mt-12">
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Next
                  <Heart className="ml-2 w-5 h-5 fill-current" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Stage */}
      {stage === "celebration" && (
        <div className="min-h-screen bg-[#0a0a1a] relative overflow-hidden">
          <Stars />
          <Fireworks />
          <div className="flex min-h-screen items-center justify-center animate-fade-in relative z-20">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-4 tracking-wide drop-shadow-lg">
                Happy New Year
              </h1>
              <h2 className="text-5xl md:text-8xl font-serif font-bold text-primary drop-shadow-lg">
                Ammu
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
