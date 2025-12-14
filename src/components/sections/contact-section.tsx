"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, CheckCircle2, Sparkles } from "lucide-react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  };

  const inputClasses = cn(
    "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-4 pl-12",
    "text-white placeholder:text-white/30",
    "focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05]",
    "transition-all duration-300"
  );

  return (
    <section id="contact" className="relative w-full py-20 md:py-32 overflow-hidden -mt-px -mb-px">
      {/* Background effects - desktop only for performance */}
      {!isMobile && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />
        </div>
      )}

      {/* Animated grid pattern - desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6"
            >
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-white/60">Let's Work Together</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Transform
              </span>
              <br />
              Your Brand?
            </h2>

            <p className="text-white/50 text-lg mb-8 max-w-md">
              Book a free strategy call and let's discuss how we can help your business grow with a stunning website.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                "Free 30-minute consultation",
                "Custom strategy for your business",
                "No obligations, just value",
              ].map((feature, idx) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-white/60">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Form glow effect - desktop only */}
              {!isMobile && (
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50" />
              )}
              
              <form
                onSubmit={handleSubmit}
                className={cn(
                  "relative border border-white/[0.08] rounded-2xl p-8 md:p-10",
                  isMobile ? "bg-[#0a0a1a]" : "bg-[#0a0a1a]/80 backdrop-blur-xl"
                )}
              >
                {/* Success overlay */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                      "absolute inset-0 rounded-2xl flex flex-col items-center justify-center z-10",
                      isMobile ? "bg-[#0a0a1a]" : "bg-[#0a0a1a]/95 backdrop-blur-xl"
                    )}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
                    >
                      <CheckCircle2 className="w-8 h-8 text-green-400" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/50 text-center">We'll get back to you within 24 hours.</p>
                  </motion.div>
                )}

                <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
                <p className="text-white/40 mb-8">Fill out the form and we'll be in touch soon.</p>

                {/* Name field */}
                <div className="mb-5">
                  <div className="relative">
                    <User className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300",
                      focused === "name" ? "text-blue-400" : "text-white/30"
                    )} />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="mb-5">
                  <div className="relative">
                    <Mail className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300",
                      focused === "email" ? "text-blue-400" : "text-white/30"
                    )} />
                    <input
                      type="email"
                      placeholder="Your Email"
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
                  <div className="relative">
                    <MessageSquare className={cn(
                      "absolute left-4 top-4 w-5 h-5 transition-colors duration-300",
                      focused === "message" ? "text-blue-400" : "text-white/30"
                    )} />
                    <textarea
                      placeholder="Tell us about your project..."
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

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full py-4 rounded-xl font-semibold text-lg",
                    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                    "text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]",
                    "hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]",
                    "transition-all duration-300",
                    "flex items-center justify-center gap-2",
                    "disabled:opacity-70 disabled:cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Alternative CTA */}
                <div className="mt-6 text-center">
                  <p className="text-white/30 text-sm">
                    Prefer to talk?{" "}
                    <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Book a call instead →
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

