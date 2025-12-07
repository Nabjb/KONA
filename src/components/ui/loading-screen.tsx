"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  children: React.ReactNode;
  minimumLoadTime?: number;
}

export function LoadingScreen({ children, minimumLoadTime = 2000 }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minimumLoadTime);

    return () => clearTimeout(timer);
  }, [minimumLoadTime]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030014]"
          >
            {/* Background glow - desktop only */}
            {!isMobile && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px]" />
              </div>
            )}

            {/* Logo container */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Logo - static on mobile, animated on desktop */}
              {isMobile ? (
                <div className="w-[180px] h-[180px]">
                  <img
                    src="/kona websites screenshots/animatedlogo.gif"
                    alt="KONA SOCIALS"
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-[280px] h-[280px]"
                >
                  <motion.img
                    src="/kona websites screenshots/animatedlogo.gif"
                    alt="KONA SOCIALS"
                    className="w-full h-full object-contain"
                    loading="eager"
                    animate={{ 
                      scale: [1, 1.02, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              )}

              {/* Loading indicator - simplified on mobile */}
              {isMobile ? (
                <div className="mt-6 flex flex-col items-center gap-3">
                  <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="w-1/2 h-full bg-blue-500"
                      style={{
                        animation: 'loading-slide 1s ease-in-out infinite',
                      }}
                    />
                  </div>
                  <p className="text-white/40 text-xs tracking-widest uppercase">Loading</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-8 flex flex-col items-center gap-4"
                >
                  <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                    />
                  </div>
                  <motion.p
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-white/40 text-sm tracking-widest uppercase"
                  >
                    Loading
                  </motion.p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
