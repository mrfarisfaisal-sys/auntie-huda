"use client";

/**
 * CosmicBackground - Subtle ambient background
 * Design principle: Support, don't distract
 * - Reduced particle count for performance
 * - Slower, subtler animations
 * - Lower opacity to not compete with content
 */
export function CosmicBackground() {
  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-purple-900/15" />
      
      {/* Ambient glow - top left */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
          left: "-10%",
          top: "10%",
          filter: "blur(60px)",
        }}
      />
      
      {/* Ambient glow - bottom right */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
          right: "-5%",
          bottom: "20%",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
