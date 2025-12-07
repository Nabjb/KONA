"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter, Mail, MapPin, Phone, ArrowUpRight, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Web Design", href: "#" },
      { name: "Web Development", href: "#" },
      { name: "Social Media", href: "#" },
      { name: "Brand Strategy", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Work", href: "#portfolio" },
      { name: "Services", href: "#services" },
      { name: "Contact", href: "#contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="relative w-full bg-[#020010] overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Main footer content */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/kona websites screenshots/KONALOGO.png"
                  alt="KONA SOCIALS"
                  className="w-12 h-12 rounded-full"
                />
                <span className="text-xl font-bold text-white">KONA SOCIALS</span>
              </div>

              <p className="text-white/40 mb-6 max-w-xs leading-relaxed">
                Crafting premium digital experiences that help brands stand out and convert visitors into customers.
              </p>

              {/* Contact info */}
              <div className="space-y-3">
                <a href="mailto:hello@konasocials.com" className="flex items-center gap-3 text-white/50 hover:text-blue-400 transition-colors group">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">hello@konasocials.com</span>
                </a>
                <div className="flex items-center gap-3 text-white/50">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Cyprus</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-5">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/40 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-5">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/40 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-5">Stay Updated</h4>
              <p className="text-white/40 text-sm mb-4">
                Get the latest tips on web design and digital marketing.
              </p>
              
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-shadow"
                >
                  Subscribe
                </motion.button>
              </form>

              <p className="text-white/20 text-xs mt-3">
                No spam, unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.05]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm flex items-center gap-1">
              © {currentYear} KONA SOCIALS. Made with{" "}
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />{" "}
              in Cyprus
            </p>
            
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/30 hover:text-white/60 transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

