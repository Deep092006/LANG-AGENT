'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Hero Section Component
function HeroSection() {
  const containerRef = useRef(null);

  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(at 20% 50%, #fce7f3 0px, transparent 50%)',
            'radial-gradient(at 80% 50%, #e9d5ff 0px, transparent 50%)',
            'radial-gradient(at 20% 50%, #fce7f3 0px, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Confetti animation */}
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            backgroundColor: ['#fbbf24', '#f472b6', '#a78bfa', '#60a5fa'][
              Math.floor(Math.random() * 4)
            ],
          }}
          animate={{
            y: window.innerHeight + 20,
            opacity: [1, 0],
            rotate: 360,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Happy Birthday! 🎉
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-purple-800 mb-12 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          A special moment for someone special
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button
            onClick={() => {
              document
                .getElementById('surprise')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full font-semibold group"
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Open Your Surprise 🎁
            </motion.span>
          </Button>
        </motion.div>
      </div>

      {/* Floating elements */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute text-5xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 10}%`,
          }}
        >
          {['🎂', '🎈', '⭐', '🎊'][i]}
        </motion.div>
      ))}
    </section>
  );
}

// Cake Cutting Section Component
function CakeCuttingSection() {
  const [isCut, setIsCut] = useState(false);
  const containerRef = useRef(null);

  // Create confetti pieces for celebration
  const celebrationConfetti = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.2,
    duration: 2 + Math.random() * 1,
  }));

  const handleCutCake = () => {
    setIsCut(true);
    // Reset after animation
    setTimeout(() => setIsCut(false), 3000);
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-100 relative overflow-hidden"
    >
      {/* Celebration confetti */}
      {isCut &&
        celebrationConfetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{
              left: `50%`,
              top: `50%`,
              backgroundColor: ['#fbbf24', '#f472b6', '#a78bfa', '#60a5fa'][
                Math.floor(Math.random() * 4)
              ],
            }}
            animate={{
              y: [0, Math.random() * 300 - 150],
              x: [0, Math.random() * 300 - 150],
              opacity: [1, 0],
              scale: [1, 0],
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
            }}
          />
        ))}

      <div className="max-w-4xl w-full">
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-pink-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Time to Cut the Cake! 🎂
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Cake Display */}
          <motion.div
            className="relative w-56 h-64"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Cake layers */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Top layer */}
              <motion.div
                className="w-40 h-16 bg-gradient-to-br from-pink-300 to-pink-400 rounded-t-3xl shadow-lg relative"
                animate={
                  isCut
                    ? {
                        y: -30,
                        rotate: -5,
                      }
                    : { y: 0, rotate: 0 }
                }
                transition={{ type: 'spring', stiffness: 100 }}
              >
                {/* Frosting detail */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-pink-200 rounded-t-3xl" />
                {/* Candle */}
                <motion.div
                  className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-8 w-2 h-12 bg-orange-300 rounded-full"
                  animate={{ flicker: isCut ? [1, 1.1, 1, 0.9, 1] : 1 }}
                  transition={{ duration: 0.5, repeat: isCut ? Infinity : 0 }}
                >
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-yellow-300 rounded-full"
                    animate={{ opacity: isCut ? [0.5, 1] : 1 }}
                  />
                </motion.div>
              </motion.div>

              {/* Middle layer */}
              <motion.div
                className="w-48 h-16 bg-gradient-to-br from-orange-300 to-orange-400 shadow-lg relative"
                animate={
                  isCut
                    ? {
                        y: 0,
                      }
                    : { y: 0 }
                }
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-orange-200" />
              </motion.div>

              {/* Bottom layer */}
              <motion.div
                className="w-56 h-16 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-b-3xl shadow-lg"
                animate={
                  isCut
                    ? {
                        y: 30,
                        rotate: 5,
                      }
                    : { y: 0, rotate: 0 }
                }
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-yellow-200" />
              </motion.div>
            </div>
          </motion.div>

          {/* Knife Animation and Button */}
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Knife animation */}
            <motion.div
              className="text-7xl"
              animate={
                isCut
                  ? {
                      rotate: [0, 45],
                      y: [0, 40],
                    }
                  : {
                      y: [0, 10, 0],
                    }
              }
              transition={{
                duration: isCut ? 0.6 : 1.5,
                repeat: isCut ? 0 : Infinity,
              }}
            >
              🔪
            </motion.div>

            {/* Interactive button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleCutCake}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-12 py-6 text-lg rounded-full font-bold shadow-lg"
              >
                <motion.span
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Cut the Cake! 🎉
                </motion.span>
              </Button>
            </motion.div>

            {/* Celebratory text */}
            <motion.p
              className="text-purple-700 text-lg font-semibold text-center"
              animate={{
                opacity: isCut ? [0, 1, 0] : 0.6,
              }}
              transition={{ duration: 0.6 }}
            >
              {isCut ? "Let's celebrate! 🥳" : 'Click to reveal the magic'}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Surprise Section Component
function SurpriseSection() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section
      id="surprise"
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50"
    >
      <div className="max-w-md w-full">
        <motion.div
          className="h-96"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ perspective: 1000 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            className="w-full h-full relative cursor-pointer"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of card */}
            <Card
              className="absolute w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-100 to-blue-100 backdrop-blur-xl border-pink-200/50 shadow-2xl"
              style={{
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🎁
                </motion.div>
                <p className="text-purple-700 text-lg font-semibold">
                  Click to reveal
                </p>
              </div>
            </Card>

            {/* Back of card */}
            <Card
              className="absolute w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 backdrop-blur-xl border-purple-200/50 shadow-2xl p-8"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-purple-900 mb-4">
                  Your Special Message ✨
                </h2>
                <p className="text-purple-800 text-lg leading-relaxed">
                  On your special day, may you be surrounded by joy, laughter,
                  and all the happiness you deserve. Here's to celebrating you!
                </p>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Gallery Section Component
function GallerySection() {
  const { scrollYProgress } = useScroll();

  const galleryItems = [
    { emoji: '📸', title: 'Memory One' },
    { emoji: '🎂', title: 'Memory Two' },
    { emoji: '🎉', title: 'Memory Three' },
    { emoji: '💝', title: 'Memory Four' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="w-full max-w-6xl">
        <motion.h2
          className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Cherished Memories
        </motion.h2>

        <div className="flex gap-6 overflow-x-auto pb-4 px-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="flex-shrink-0"
            >
              <Card className="w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 border-0 shadow-xl flex flex-col items-center justify-center gap-4">
                <motion.div
                  className="text-6xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {item.emoji}
                </motion.div>
                <p className="text-purple-900 font-semibold">{item.title}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Heartfelt Message Section Component
function MessageSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 relative overflow-hidden"
    >
      {/* Floating decorative elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`deco-${i}`}
          className="absolute text-7xl opacity-20"
          animate={{
            y: [0, 30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
          }}
          style={{
            left: `${15 + i * 35}%`,
            top: `${10 + i * 20}%`,
          }}
        >
          {['🎈', '⭐', '💝'][i]}
        </motion.div>
      ))}

      <motion.div
        className="max-w-2xl text-center relative z-10"
        style={{ opacity, y }}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-purple-900 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          A Heartfelt Wish
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-purple-800 leading-relaxed mb-8 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Life is a beautiful journey, and having someone as wonderful as you
          makes every moment more special. May your year be filled with endless
          possibilities, unexpected joy, and dreams coming true. You deserve
          nothing but the very best. Happy Birthday! 🌟
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl"
        >
          💖
        </motion.div>
      </motion.div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-pink-800 to-blue-900 text-white py-12 px-4 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          className="text-lg font-light"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Made with ❤️ for you
        </motion.p>

        <motion.div
          className="mt-4 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"
          animate={{
            scaleX: [0.5, 1, 0.5],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </footer>
  );
}

// Main Page Component
export default function BirthdayPage() {
  return (
    <main className="w-full bg-white">
      <HeroSection />
      <CakeCuttingSection />
      <SurpriseSection />
      <GallerySection />
      <MessageSection />
      <Footer />
    </main>
  );
}
