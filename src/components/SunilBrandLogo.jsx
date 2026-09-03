import React, { useState } from 'react';
import { Sparkles, Flame, Snowflake } from 'lucide-react';
import { motion } from 'framer-motion';

export const SunilBrandLogo = ({ className = '', onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center gap-2 sm:gap-3 cursor-pointer group select-none ${className}`}
    >
      {/* Dynamic Background Glow Halo */}
      <div
        className={`absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-amber-500/20 blur-lg transition-opacity duration-500 ${
          isHovered ? 'opacity-100 scale-110' : 'opacity-40 scale-100'
        }`}
      />

      {/* HANGING SWINGING CAN CONTAINER */}
      <div className="relative w-10 sm:w-12 h-12 sm:h-14 flex flex-col items-center justify-start flex-shrink-0">
        
        {/* Hanging Hook & Chain Wire */}
        <div className="w-0.5 h-2.5 sm:h-3 bg-gradient-to-b from-cyan-400 to-amber-400 shadow-sm" />
        <div className="w-2 sm:w-2.5 h-1 sm:h-1.5 rounded-full border border-cyan-400 bg-slate-900 -mt-0.5 z-10" />

        {/* HANGING CAN WITH ROTATION & SWING */}
        <motion.div
          animate={
            isHovered
              ? { rotateY: 360, scale: 1.15, rotateZ: [0, -15, 15, 0] }
              : { rotateZ: [-6, 6, -6] }
          }
          transition={
            isHovered
              ? { duration: 0.8, ease: 'easeInOut' }
              : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
          }
          className="relative w-8 sm:w-9 h-10 sm:h-12 rounded-xl bg-gradient-to-b from-cyan-400 via-emerald-500 to-slate-900 border border-white/30 shadow-xl shadow-cyan-500/40 flex flex-col items-center justify-between p-1 z-20 overflow-hidden transform-gpu"
        >
          {/* Metallic Top Rim */}
          <div className="w-full h-1 sm:h-1.5 rounded-t-sm bg-slate-300 shadow-inner" />

          {/* Icon Emblem inside Can */}
          <div className="flex flex-col items-center justify-center my-auto">
            <Snowflake className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />
            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white opacity-80 animate-ping" />
          </div>

          {/* Bottom Metallic Base */}
          <div className="w-full h-1 rounded-b-sm bg-slate-400" />
        </motion.div>

        {/* Sparkle Particles on Hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            className="absolute -top-1 -right-1 text-amber-400 pointer-events-none"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          </motion.div>
        )}
      </div>

      {/* BRAND TEXT: BEVERAGE VAULT */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="font-heading font-black text-lg sm:text-2xl tracking-tight bg-gradient-to-r from-cyan-300 via-emerald-400 to-amber-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-400 transition-colors">
            BEVERAGE
          </span>
          <span className="px-1 sm:px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[8px] sm:text-[9px] font-extrabold border border-amber-500/30 uppercase tracking-widest">
            PRO
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="font-heading font-black text-xs sm:text-sm text-white tracking-widest">
            VAULT
          </span>
          <span className="font-heading font-extrabold text-xs sm:text-sm text-cyan-400">
            STORE
          </span>
        </div>

        {/* Interactive Hover Tagline */}
        <motion.p
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"
        >
          <span>Cold & Refreshing</span>
          {isHovered && <Flame className="w-2.5 h-2.5 text-amber-400 animate-bounce" />}
        </motion.p>
      </div>
    </div>
  );
};
