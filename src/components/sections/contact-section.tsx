"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, User, MessageSquare, Radio, Satellite, Signal, Waves } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [transmissionProgress, setTransmissionProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  // Real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace('T', ' ').split('.')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTransmissionProgress(0);
    
    // Simulate transmission progress
    const progressInterval = setInterval(() => {
      setTransmissionProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    clearInterval(progressInterval);
    setTransmissionProgress(100);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
      setTransmissionProgress(0);
    }, 4000);
  };

  const inputClasses = cn(
    "w-full bg-black/50 border border-cyan-500/20 rounded-lg px-4 py-3 pl-12",
    "text-cyan-100 placeholder:text-cyan-500/30 font-mono text-sm",
    "focus:outline-none focus:border-cyan-500/50 focus:bg-black/70",
    "transition-all duration-300"
  );

  return (
    <section id="contact" className="relative min-h-screen bg-black overflow-hidden py-16 md:py-24">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Glows */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[150px]" />
      </div>

      {/* Animated signal waves */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none overflow-hidden opacity-20">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-cyan-500/30 rounded-full"
            initial={{ width: 100, height: 100, opacity: 0.5 }}
            animate={{ 
              width: [100, 800], 
              height: [100, 800], 
              opacity: [0.5, 0] 
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-sm font-mono tracking-wider">COMM_CHANNEL_OPEN</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Transmit a{" "}
            <span className="text-cyan-400">Signal</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Open a communication channel to KONA Base. We&apos;re standing by to receive your transmission.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side - Terminal info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Status panel */}
            <div className="p-6 rounded-xl bg-black/50 border border-cyan-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Satellite className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-mono text-sm">STATION_STATUS</span>
              </div>
              
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Timestamp:</span>
                  <span className="text-cyan-300">{currentTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Station ID:</span>
                  <span className="text-white">KONA-BASE-01</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Signal Strength:</span>
                  <span className="text-green-400 flex items-center gap-1">
                    <Signal className="w-3 h-3" /> EXCELLENT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Channel:</span>
                  <span className="text-white">SECURE_443</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Response Time:</span>
                  <span className="text-cyan-300">&lt; 24 Earth Hours</span>
                </div>
              </div>
            </div>

            {/* Transmission benefits */}
            <div className="p-6 rounded-xl bg-black/50 border border-cyan-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Waves className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-mono text-sm">TRANSMISSION_INCLUDES</span>
              </div>
              
              <div className="space-y-3">
                {[
                  { code: "01", text: "Free 30-minute strategy consultation" },
                  { code: "02", text: "Custom mission plan for your brand" },
                  { code: "03", text: "Zero commitment required" },
                  { code: "04", text: "Direct line to mission control" },
                ].map((item) => (
                  <div key={item.code} className="flex items-start gap-3">
                    <span className="text-cyan-500/50 font-mono text-xs">[{item.code}]</span>
                    <span className="text-white/70 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick contact */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-white/40 text-xs font-mono">DIRECT_FREQUENCY</p>
                <a href="mailto:hello@kona.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  hello@konasocials.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right side - Transmission form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              {/* Terminal frame */}
              <div className="relative rounded-xl border border-cyan-500/30 bg-black/70 backdrop-blur-xl overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center justify-between px-4 py-3 bg-cyan-500/10 border-b border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-cyan-400/70 text-xs font-mono ml-2">transmit_signal.exe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-400 text-xs font-mono">ONLINE</span>
                  </div>
                </div>

                {/* Form content */}
                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                  {/* Success overlay */}
                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-xl"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                          className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mb-4"
                        >
                          <Send className="w-8 h-8 text-green-400" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-green-400 mb-2 font-mono">TRANSMISSION SUCCESSFUL</h3>
                        <p className="text-white/50 text-center text-sm">
                          Signal received at KONA Base.<br />
                          Expect response within 24 hours.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Terminal prompt */}
                  <div className="mb-6">
                    <p className="text-cyan-500/50 font-mono text-xs mb-1">{`>`} INITIATING_TRANSMISSION...</p>
                    <p className="text-white/60 text-sm">Enter your transmission details below:</p>
                  </div>

                  {/* Sender ID field */}
                  <div className="mb-4">
                    <label className="text-cyan-500/70 text-xs font-mono mb-2 block">SENDER_ID:</label>
                    <div className="relative">
                      <User className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300",
                        focused === "name" ? "text-cyan-400" : "text-cyan-500/30"
                      )} />
                      <input
                        type="text"
                        placeholder="Enter your designation..."
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        className={inputClasses}
                        required
                      />
                    </div>
                  </div>

                  {/* Frequency field */}
                  <div className="mb-4">
                    <label className="text-cyan-500/70 text-xs font-mono mb-2 block">RETURN_FREQUENCY:</label>
                    <div className="relative">
                      <Mail className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300",
                        focused === "email" ? "text-cyan-400" : "text-cyan-500/30"
                      )} />
                      <input
                        type="email"
                        placeholder="your@email.signal"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className={inputClasses}
                        required
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="mb-6">
                    <label className="text-cyan-500/70 text-xs font-mono mb-2 block">MESSAGE_CONTENT:</label>
                    <div className="relative">
                      <MessageSquare className={cn(
                        "absolute left-4 top-4 w-4 h-4 transition-colors duration-300",
                        focused === "message" ? "text-cyan-400" : "text-cyan-500/30"
                      )} />
                      <textarea
                        placeholder="Describe your mission requirements..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        rows={4}
                        className={cn(inputClasses, "resize-none")}
                        required
                      />
                    </div>
                  </div>

                  {/* Transmission progress */}
                  {isSubmitting && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-cyan-500/70">TRANSMITTING...</span>
                        <span className="text-cyan-400">{Math.min(100, Math.round(transmissionProgress))}%</span>
                      </div>
                      <div className="h-1 bg-cyan-500/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, transmissionProgress)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full py-4 rounded-lg font-mono font-semibold",
                      "bg-gradient-to-r from-cyan-600 to-blue-600",
                      "text-white",
                      "hover:from-cyan-500 hover:to-blue-500",
                      "transition-all duration-300",
                      "flex items-center justify-center gap-3",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      "border border-cyan-500/30"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>TRANSMIT_SIGNAL</span>
                      </>
                    )}
                  </motion.button>

                  {/* Terminal footer */}
                  <div className="mt-4 pt-4 border-t border-cyan-500/10 text-center">
                    <p className="text-cyan-500/30 text-xs font-mono">
                      &gt; Secure transmission via KONA_PROTOCOL_v2.0
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
