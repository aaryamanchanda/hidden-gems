import { Link } from "react-router";
import { motion } from "motion/react";
import { Star, MapPin, Shield, ChevronRight } from "lucide-react";
import type { Gem } from "../data/gems";
import { categoryColors, categoryIcons } from "../data/gems";

interface GemCardProps {
  gem: Gem;
  index?: number;
}

export function GemCard({ gem, index = 0 }: GemCardProps) {
  const color = categoryColors[gem.category];
  const icon = categoryIcons[gem.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#00e5c0]/10"
    >
      {/* Glassmorphism card body */}
      <div className="relative bg-[#0a1420]/80 backdrop-blur-md border border-white/[0.08] rounded-2xl overflow-hidden hover:border-[#00e5c0]/30 transition-colors duration-300">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={gem.image}
            alt={gem.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-[#0a1420]/20 to-transparent" />

          {/* Category badge */}
          <div
            className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
            style={{ backgroundColor: `${color}25`, color, border: `1px solid ${color}50` }}
          >
            <span>{icon}</span>
            {gem.category}
          </div>

          {/* Verified badge */}
          {gem.verified && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#00e5c0]/15 text-[#00e5c0] text-xs px-2 py-1 rounded-full border border-[#00e5c0]/30 backdrop-blur-md">
              <Shield size={10} />
              Verified
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-white font-semibold mb-1 group-hover:text-[#00e5c0] transition-colors duration-300 line-clamp-1">
            {gem.name}
          </h3>

          <div className="flex items-center gap-1 text-gray-400 text-sm mb-2">
            <MapPin size={12} className="text-gray-500" />
            <span className="line-clamp-1">{gem.location}, {gem.city}</span>
          </div>

          <p className="text-gray-400 text-sm line-clamp-2 mb-3 leading-relaxed">{gem.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {gem.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-white/[0.05] text-gray-400 border border-white/[0.08] hover:border-white/20 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <Star size={13} className="fill-[#fbbf24] text-[#fbbf24]" />
              <span className="text-white text-sm font-semibold">{gem.rating}</span>
              <span className="text-gray-500 text-xs">({gem.reviewCount})</span>
            </div>
            <Link
              to={`/gem/${gem.id}`}
              className="flex items-center gap-1 text-[#00e5c0] text-sm font-medium hover:gap-2 transition-all duration-200"
            >
              Explore
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${color}06 0%, transparent 70%)`,
            boxShadow: `inset 0 1px 0 0 ${color}15`,
          }}
        />
      </div>
    </motion.div>
  );
}
