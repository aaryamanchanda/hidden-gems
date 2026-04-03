import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { MapPin, Compass, Users, Star, ArrowRight, Sparkles, Shield, ChevronRight } from "lucide-react";
import { gems, categories, categoryColors, categoryIcons } from "../data/gems";
import { GemCard } from "../components/GemCard";



function ParticleDot({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#00e5c0]"
      style={{ left: `${x}%`, top: `${y}%`, width: 2, height: 2 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        y: [0, -30, -60],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: 50 + Math.random() * 50,
  delay: Math.random() * 4,
}));

export function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const featuredGems = gems.slice(0, 6);
  const filteredGems = activeCategory === "All"
    ? featuredGems
    : gems.filter(g => g.category === activeCategory).slice(0, 6);

  return (
    <div className="bg-[#050a0f] min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#050a0f] via-[#071520] to-[#050a0f]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00e5c0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#0077ff]/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00e5c0]/3 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#00e5c0 1px, transparent 1px), linear-gradient(90deg, #00e5c0 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Particles */}
        {particles.map((p) => (
          <ParticleDot key={p.id} x={p.x} y={p.y} delay={p.delay} />
        ))}

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#00e5c0]/10 border border-[#00e5c0]/30 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles size={14} className="text-[#00e5c0]" />
            <span className="text-[#00e5c0] text-sm">Community-powered local discoveries</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Discover the
            <span className="block bg-gradient-to-r from-[#00e5c0] via-[#00c8ff] to-[#0077ff] bg-clip-text text-transparent">
              Hidden Gems
            </span>
            Near You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Go beyond tourist traps. Explore authentic, lesser-known places handpicked and verified
            by locals who actually live there.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/explore"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00e5c0] to-[#0077ff] text-[#050a0f] font-bold text-base hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-[#00e5c0]/30"
            >
              <Compass size={18} />
              Explore the Map
            </Link>
            <Link
              to="/submit"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#00e5c0]/40 text-[#00e5c0] font-semibold text-base hover:bg-[#00e5c0]/10 transition-all"
            >
              + Add Your Hidden Gem
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Gems Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#00e5c0] text-sm uppercase tracking-widest mb-2 block">Curated by locals</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Featured Hidden Gems</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Each place is submitted and verified by real locals. No tourist traps, no paid listings.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {["All", ...categories].map((cat) => {
              const color = cat !== "All" ? categoryColors[cat as keyof typeof categoryColors] : "#00e5c0";
              const icon = cat !== "All" ? categoryIcons[cat as keyof typeof categoryIcons] : "✨";
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-200 border ${
                    isActive
                      ? "text-white border-transparent"
                      : "text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                  style={isActive ? { backgroundColor: `${color}25`, borderColor: `${color}60`, color } : {}}
                >
                  <span>{icon}</span>
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Gems grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGems.map((gem, i) => (
              <GemCard key={gem.id} gem={gem} index={i} />
            ))}
            {filteredGems.length === 0 && (
              <div className="col-span-3 text-center py-20 text-gray-500">
                No gems in this category yet. Be the first to submit one!
              </div>
            )}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#00e5c0]/40 text-[#00e5c0] hover:bg-[#00e5c0]/10 transition-all"
            >
              View all {gems.length} gems
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works — Bento grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#071520]/50 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#00e5c0] text-sm uppercase tracking-widest mb-2 block">Simple &amp; Community Driven</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">How It Works</h2>
          </motion.div>

          {/* Bento: 1 large card left, 2 stacked right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Step 01 — large tall card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-[#0a1420] border border-white/8 rounded-3xl p-8 md:row-span-2 flex flex-col justify-between overflow-hidden hover:border-[#00e5c0]/30 transition-all duration-300 group"
            >
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#00e5c0]/6 rounded-full blur-3xl aurora-blob pointer-events-none" />
              <div className="relative z-10">
                <div className="text-6xl mb-6">🔍</div>
                <div className="text-xs font-mono text-[#00e5c0] mb-3 tracking-widest">STEP 01</div>
                <h3 className="text-white text-xl font-bold mb-4">Discover on the Map</h3>
                <p className="text-gray-400 leading-relaxed">
                  Browse our interactive Leaflet map to find hidden gems near any location. Filter by
                  category, rating, or proximity to uncover spots that locals actually love.
                </p>
              </div>
              <div className="relative z-10 mt-8 flex flex-wrap gap-2">
                {["🍜 Food", "🌿 Nature", "🎨 Art", "🏛️ History", "🎵 Music", "📚 Books"].map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[#00e5c0]/10 text-[#00e5c0] border border-[#00e5c0]/20">
                    {tag}
                  </span>
                ))}
              </div>
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top left, rgba(0,229,192,0.06) 0%, transparent 70%)" }}
              />
            </motion.div>

            {/* Step 02 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="relative bg-[#0a1420] border border-white/8 rounded-3xl p-6 overflow-hidden hover:border-[#0077ff]/30 transition-all duration-300 group"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0077ff]/6 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="text-4xl mb-4">📍</div>
                <div className="text-xs font-mono text-[#0077ff] mb-2 tracking-widest">STEP 02</div>
                <h3 className="text-white font-bold mb-2">Explore the Details</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Each gem has a full detail page with photos, local tips, ratings, and authentic community reviews.
                </p>
              </div>
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top right, rgba(0,119,255,0.06) 0%, transparent 70%)" }}
              />
            </motion.div>

            {/* Step 03 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative bg-[#0a1420] border border-white/8 rounded-3xl p-6 overflow-hidden hover:border-[#8b5cf6]/30 transition-all duration-300 group"
            >
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#8b5cf6]/6 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="text-4xl mb-4">✨</div>
                <div className="text-xs font-mono text-[#8b5cf6] mb-2 tracking-widest">STEP 03</div>
                <h3 className="text-white font-bold mb-2">Share Your Secret</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Know a hidden gem? Submit it! Our AI and community verify each submission to ensure authenticity.
                </p>
              </div>
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at bottom right, rgba(139,92,246,0.06) 0%, transparent 70%)" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem / Why Us section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#00e5c0] text-sm uppercase tracking-widest mb-3 block">The Problem We Solve</span>
              <h2 className="text-3xl font-bold text-white mb-5">
                Travel apps show you tourist traps.<br />
                <span className="text-[#00e5c0]">We show you the real thing.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Google Maps, TripAdvisor, and Yelp are saturated with paid listings and popular hotspots.
                The places locals actually love — the tiny chai shops, secret viewpoints, and century-old
                bookstores — never make it to the first page.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Hidden Gems is built differently. Every submission comes from real locals, every verification
                is done by the community, and our AI system flags misleading or overhyped entries.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Zero paid listings — ever",
                  "Community-verified authenticity",
                  "AI-powered fake detection",
                  "Local-only perspectives"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Shield size={14} className="text-[#00e5c0]" />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Comparison cards */}
              <div className="bg-[#0a1420] border border-red-500/20 rounded-2xl p-5 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-red-400 text-sm font-semibold">Popular Travel Apps</span>
                </div>
                {["Crowded tourist traps", "Paid sponsored listings", "Outdated information", "One-size-fits-all"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-500 text-sm py-1">
                    <span className="text-red-500">✗</span> {item}
                  </div>
                ))}
              </div>
              <div className="bg-[#0a1420] border border-[#00e5c0]/30 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#00e5c0]" />
                  <span className="text-[#00e5c0] text-sm font-semibold">Hidden Gems</span>
                </div>
                {["Authentic, local-approved spots", "Zero paid promotions", "Continuously updated by locals", "Personalized to your interests"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm py-1">
                    <span className="text-[#00e5c0]">✓</span> {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#071a28] to-[#050f1a] border border-[#00e5c0]/20 rounded-3xl p-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00e5c0]/5 to-[#0077ff]/5 rounded-3xl" />
            <div className="relative z-10">
              <div className="text-5xl mb-4">🗺️</div>
              <h2 className="text-3xl font-bold text-white mb-4">Know a Hidden Gem?</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Join thousands of locals who have already shared their secret spots.
                Help travelers find the real India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/submit"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00e5c0] to-[#0077ff] text-[#050a0f] font-bold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-[#00e5c0]/30"
                >
                  Submit a Gem →
                </Link>
                <Link
                  to="/explore"
                  className="px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all"
                >
                  Explore the Map
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00e5c0] to-[#0077ff] flex items-center justify-center">
              <MapPin size={12} className="text-[#050a0f]" />
            </div>
            <span className="text-white font-bold">Hidden<span className="text-[#00e5c0]">Gems</span></span>
          </div>
          <p className="text-gray-500 text-sm">
            Built with ❤️ by Team Codex Gladiators · Hack Matrix Hackathon
          </p>
          <div className="flex gap-4 text-gray-500 text-sm">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
            <Link to="/submit" className="hover:text-white transition-colors">Submit</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}