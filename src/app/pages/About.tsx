import { motion } from "motion/react";
import { MapPin, Users, Code, Cpu, Globe, Zap, Shield, TrendingUp, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router";

export function About() {
  const team = [
    { name: "Saumya Agarwal", role: "Team Lead", id: "25BCE10298", emoji: "👑", color: "#00e5c0" },
    { name: "Aarya Manchanda", role: "AI & Backend", id: "25BAI10139", emoji: "🤖", color: "#0077ff" },
    { name: "Pratul Kashyap", role: "Frontend Dev", id: "25BCE10322", emoji: "🎨", color: "#8b5cf6" },
    { name: "Manthan Bobade", role: "Database & APIs", id: "25BCE10321", emoji: "⚡", color: "#fbbf24" },
  ];

  const techStack = [
    { name: "React + TypeScript", category: "Frontend", color: "#61dafb", icon: "⚛️" },
    { name: "Tailwind CSS v4", category: "Styling", color: "#06b6d4", icon: "🎨" },
    { name: "Vite 6", category: "Build Tool", color: "#a259ff", icon: "⚡" },
    { name: "React Router v7", category: "Routing", color: "#e34c4c", icon: "🛣️" },
    { name: "Leaflet.js", category: "Maps", color: "#3fb551", icon: "🗺️" },
    { name: "Framer Motion", category: "Animation", color: "#ff5757", icon: "✨" },
  ];

  const problems = [
    { icon: "🗺️", title: "Mainstream Overload", desc: "Popular apps overwhelm travelers with sponsored listings and mainstream tourist spots." },
    { icon: "❌", title: "No Local Voice", desc: "The places locals actually love never reach the front page of any travel platform." },
    { icon: "🚌", title: "Overcrowded Hotspots", desc: "Millions of tourists funnel into the same spots, destroying the experience for everyone." },
    { icon: "💸", title: "Missing Local Economy", desc: "Small local businesses and artisans miss out on visitors who would genuinely appreciate them." },
  ];

  const features = [
    { icon: <MapPin className="text-[#00e5c0]" size={20} />, title: "Interactive Map", desc: "Explore hidden gems on a live map with custom pins, filters, and location-based discovery." },
    { icon: <Users className="text-[#0077ff]" size={20} />, title: "Community Submissions", desc: "Locals submit gems. The community verifies them. No corporate influence — ever." },
    { icon: <Shield className="text-[#00e5c0]" size={20} />, title: "AI Fake Detection", desc: "Our AI system flags misleading, overhyped, or fake submissions before they reach the platform." },
    { icon: <Zap className="text-[#fbbf24]" size={20} />, title: "Ratings & Reviews", desc: "Authentic, unfiltered ratings from real visitors who've actually been to each gem." },
    { icon: <Globe className="text-[#8b5cf6]" size={20} />, title: "Sustainable Tourism", desc: "By spreading tourists across hidden gems, we reduce pressure on overcrowded hotspots." },
    { icon: <TrendingUp className="text-[#ec4899]" size={20} />, title: "Future Roadmap", desc: "AI itineraries, gamified badges for contributors, and expansion across cities and countries." },
  ];

  return (
    <div className="bg-[#050a0f] min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00e5c0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#0077ff]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-5xl mb-4">💎</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              About <span className="bg-gradient-to-r from-[#00e5c0] to-[#0077ff] bg-clip-text text-transparent">Hidden Gems</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              A hackathon project born from a simple belief: the best places in India are the ones
              that never make it onto Google's first page.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#00e5c0] text-sm uppercase tracking-widest mb-2 block">The Problem</span>
            <h2 className="text-3xl font-bold text-white mb-3">Why We Built This</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Popular travel apps focus on what's famous — not what's authentic. That leaves a massive gap.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a1420] border border-white/8 rounded-2xl p-5 flex gap-4"
              >
                <div className="text-2xl">{p.icon}</div>
                <div>
                  <h3 className="text-white font-medium mb-1">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solution / Features */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#00e5c0] text-sm uppercase tracking-widest mb-2 block">Our Solution</span>
            <h2 className="text-3xl font-bold text-white">What Hidden Gems Does</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#0a1420] border border-white/8 rounded-2xl p-5 hover:border-white/20 transition-all"
              >
                <div className="mb-3">{f.icon}</div>
                <h3 className="text-white font-medium mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="py-16 px-4 border-y border-white/5 bg-gradient-to-b from-transparent via-[#071520]/40 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#00e5c0] text-sm uppercase tracking-widest mb-2 block">Under the Hood</span>
            <h2 className="text-3xl font-bold text-white">System Architecture</h2>
          </motion.div>

          {/* Data flow diagram */}
          <div className="bg-[#0a1420] border border-white/8 rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col items-center gap-3">
              {/* Layer 1: User */}
              <div className="flex gap-3">
                {["🧑‍💻 Local User", "🌍 Explorer"].map((user, i) => (
                  <div key={i} className="bg-[#050a0f] border border-[#0077ff]/30 text-[#0077ff] px-4 py-2 rounded-xl text-sm text-center">
                    {user}
                  </div>
                ))}
              </div>

              <div className="w-px h-6 bg-[#00e5c0]/40" />

              {/* Layer 2: Frontend */}
              <div className="bg-[#050a0f] border border-[#00e5c0]/30 text-[#00e5c0] px-6 py-3 rounded-xl text-sm w-full max-w-sm text-center">
                ⚛️ React + TypeScript (Vite 6)
              </div>

              <div className="w-px h-6 bg-white/20" />

              {/* Layer 3: Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-2xl">
                {["🔍 Search & Filter", "✏️ Submit Gem", "⭐ Ratings", "🗺️ Leaflet Map"].map((f, i) => (
                  <div key={i} className="bg-[#050a0f] border border-white/10 text-gray-300 px-3 py-2 rounded-xl text-xs text-center">
                    {f}
                  </div>
                ))}
              </div>

              <div className="w-px h-6 bg-white/20" />

              {/* Layer 4: Routing */}
              <div className="bg-[#050a0f] border border-[#a259ff]/30 text-[#a259ff] px-6 py-3 rounded-xl text-sm w-full max-w-sm text-center">
                🛣️ React Router v7 (Client-side SPA)
              </div>

              <div className="w-px h-6 bg-white/20" />

              {/* Layer 5: Data */}
              <div className="bg-[#050a0f] border border-[#3fb551]/30 text-[#3fb551] px-6 py-3 rounded-xl text-sm w-full max-w-sm text-center">
                📦 Static Gems Dataset (TypeScript)
              </div>
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-[#0a1420] border border-white/8 rounded-xl p-4 flex items-center gap-3"
              >
                <div className="text-xl">{tech.icon}</div>
                <div>
                  <div className="text-white text-sm font-medium">{tech.name}</div>
                  <div className="text-xs" style={{ color: tech.color }}>{tech.category}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#00e5c0] text-sm uppercase tracking-widest mb-2 block">Hack Matrix Hackathon</span>
            <h2 className="text-3xl font-bold text-white mb-2">Team Codex Gladiators</h2>
            <p className="text-gray-400 text-sm">Built at VIT Bhopal · LINPACK Club</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-[#0a1420] border border-white/8 rounded-2xl p-5 text-center hover:border-white/20 transition-all"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3"
                  style={{ backgroundColor: `${member.color}15`, border: `1px solid ${member.color}30` }}
                >
                  {member.emoji}
                </div>
                <h3 className="text-white font-semibold text-sm mb-0.5">{member.name}</h3>
                <p className="text-xs mb-1" style={{ color: member.color }}>{member.role}</p>
                <p className="text-gray-600 text-xs font-mono">{member.id}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="text-[#00e5c0] text-sm uppercase tracking-widest mb-2 block">What's Next</span>
            <h2 className="text-3xl font-bold text-white">Future Scope</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { emoji: "🤖", title: "AI Itineraries", desc: "Personalized day trip plans generated by AI based on your interests and location.", color: "#00e5c0" },
              { emoji: "🏆", title: "Gamification", desc: "Earn badges and rewards for contributing verified gems. Level up from Explorer to Local Legend.", color: "#fbbf24" },
              { emoji: "🌍", title: "Global Expansion", desc: "Cloud-native architecture ready to scale from India to every country in the world.", color: "#8b5cf6" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a1420] border border-white/8 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#071a28] to-[#050f1a] border border-[#00e5c0]/20 rounded-3xl p-10"
          >
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Hidden Gems redefines travel by empowering locals to share their world.
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Offering tourists authentic journeys — one hidden gem at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/explore"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00e5c0] to-[#0077ff] text-[#050a0f] font-bold hover:opacity-90 transition-opacity"
              >
                Start Exploring
              </Link>
              <Link
                to="/submit"
                className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors"
              >
                Submit a Gem
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
