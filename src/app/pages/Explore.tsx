import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, MapPin, Star, Shield, X, LayoutGrid, Map as MapIcon } from "lucide-react";
import { Link } from "react-router";
import { gems, categories, categoryColors, categoryIcons, type Gem, type Category } from "../data/gems";
import { Map } from "../components/Map";

export function Explore() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedGem, setSelectedGem] = useState<Gem | null>(null);
  const [view, setView] = useState<"map" | "grid">("map");

  const filtered = gems.filter((g) => {
    const matchSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.city.toLowerCase().includes(search.toLowerCase()) ||
      g.location.toLowerCase().includes(search.toLowerCase()) ||
      g.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "All" || g.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="bg-[#050a0f] min-h-screen pt-16">
      {/* ── Sticky Header Bar ─────────────────────────────────────── */}
      <div className="px-4 py-4 border-b border-white/5 bg-[#050a0f]/90 backdrop-blur-md sticky top-16 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search gems, cities, or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 bg-[#0a1420] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00e5c0]/50 text-sm transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* View toggle */}
            <div className="flex rounded-xl border border-white/10 overflow-hidden flex-shrink-0">
              {([
                { id: "map" as const, icon: <MapIcon size={15} />, label: "Map" },
                { id: "grid" as const, icon: <LayoutGrid size={15} />, label: "Grid" },
              ]).map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => setView(id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm transition-colors ${
                    view === id
                      ? "bg-[#00e5c0]/20 text-[#00e5c0]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-3">
            {["All", ...categories].map((cat) => {
              const color = cat !== "All" ? categoryColors[cat as Category] : "#00e5c0";
              const icon = cat !== "All" ? categoryIcons[cat as Category] : "✨";
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all border ${
                    isActive ? "" : "border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                  }`}
                  style={isActive ? { backgroundColor: `${color}20`, borderColor: `${color}50`, color } : {}}
                >
                  {icon} {cat}
                </button>
              );
            })}
          </div>

          <div className="text-gray-500 text-xs mt-2">
            {filtered.length} gem{filtered.length !== 1 ? "s" : ""} found
          </div>
        </div>
      </div>

      {/* ── Views ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {view === "map" ? (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex"
            style={{ height: "calc(100vh - 178px)" }}
          >
            {/* ── Sidebar ── */}
            <div className="w-72 xl:w-80 flex-shrink-0 overflow-y-auto border-r border-white/5 bg-[#050a0f]">
            {/* Sidebar header with gem count */}
              <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Locations</span>
                <span className="text-xs bg-[#00e5c0]/15 text-[#00e5c0] px-2 py-0.5 rounded-full border border-[#00e5c0]/30 font-semibold">
                  {filtered.length}
                </span>
              </div>
              {filtered.length === 0 && (
                <div className="p-8 text-center">
                  <div className="text-3xl mb-2">🔍</div>
                  <p className="text-gray-400 text-sm font-medium">No gems found</p>
                  <p className="text-gray-600 text-xs mt-1">Try a different search or category</p>
                </div>
              )}
              {filtered.map((gem) => (
                <button
                  key={gem.id}
                  onClick={() => setSelectedGem(selectedGem?.id === gem.id ? null : gem)}
                  className={`w-full text-left p-3 border-b border-white/5 hover:bg-[#0a1420] transition-colors flex gap-3 ${
                    selectedGem?.id === gem.id
                      ? "bg-[#0a1420] border-l-2 border-l-[#00e5c0]"
                      : "border-l-2 border-l-transparent"
                  }`}
                >
                  <img
                    src={gem.image}
                    alt={gem.name}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm font-medium line-clamp-1">{gem.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                      <MapPin size={9} />{gem.location}, {gem.city}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star size={10} className="fill-[#fbbf24] text-[#fbbf24]" />
                        <span className="text-gray-300 text-xs">{gem.rating}</span>
                      </div>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${categoryColors[gem.category]}20`,
                          color: categoryColors[gem.category],
                        }}
                      >
                        {categoryIcons[gem.category]} {gem.category.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* ── Leaflet Map ── */}
            <div className="flex-1 relative">
              <Map
                gems={filtered}
                selectedGem={selectedGem}
                onSelectGem={setSelectedGem}
              />

              {/* Selected gem floating card */}
              <AnimatePresence>
                {selectedGem && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] w-80"
                  >
                    <div className="glass-card-bright rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
                      <div className="relative h-28">
                        <img
                          src={selectedGem.image}
                          alt={selectedGem.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] to-transparent" />
                        <button
                          onClick={() => setSelectedGem(null)}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                        >
                          <X size={12} />
                        </button>
                        {selectedGem.verified && (
                          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-[#00e5c0]/20 text-[#00e5c0] text-xs px-2 py-0.5 rounded-full border border-[#00e5c0]/40">
                            <Shield size={9} /> Verified
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="text-xs mb-1" style={{ color: categoryColors[selectedGem.category] }}>
                          {categoryIcons[selectedGem.category]} {selectedGem.category}
                        </div>
                        <h3 className="text-white font-semibold text-sm mb-1">{selectedGem.name}</h3>
                        <p className="text-gray-400 text-xs flex items-center gap-1 mb-2">
                          <MapPin size={9} /> {selectedGem.location}, {selectedGem.city}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star size={11} className="fill-[#fbbf24] text-[#fbbf24]" />
                            <span className="text-white text-sm font-semibold">{selectedGem.rating}</span>
                            <span className="text-gray-500 text-xs">({selectedGem.reviewCount})</span>
                          </div>
                          <Link
                            to={`/gem/${selectedGem.id}`}
                            className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-[#00e5c0] to-[#0077ff] text-[#050a0f] font-semibold hover:opacity-90 transition-opacity"
                          >
                            View Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* ── Grid View ── */
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto px-4 py-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((gem, i) => (
                <motion.div
                  key={gem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={`/gem/${gem.id}`}
                    className="block group bg-[#0a1420] border border-white/8 rounded-2xl overflow-hidden hover:border-[#00e5c0]/40 transition-all hover:shadow-lg hover:shadow-[#00e5c0]/10 hover:-translate-y-1 duration-300"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={gem.image}
                        alt={gem.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-transparent to-transparent" />
                      {gem.verified && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#00e5c0]/20 text-[#00e5c0] text-xs px-2 py-0.5 rounded-full border border-[#00e5c0]/40 backdrop-blur-sm">
                          <Shield size={9} /> Verified
                        </div>
                      )}
                      <div
                        className="absolute top-2 left-2 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full backdrop-blur-sm font-medium"
                        style={{
                          backgroundColor: `${categoryColors[gem.category]}25`,
                          color: categoryColors[gem.category],
                          border: `1px solid ${categoryColors[gem.category]}50`,
                        }}
                      >
                        {categoryIcons[gem.category]} {gem.category.split(" ")[0]}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-white text-sm font-medium line-clamp-1 group-hover:text-[#00e5c0] transition-colors">{gem.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
                        <MapPin size={9} />{gem.city}
                      </p>
                      <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">{gem.description}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star size={11} className="fill-[#fbbf24] text-[#fbbf24]" />
                        <span className="text-gray-300 text-xs font-semibold">{gem.rating}</span>
                        <span className="text-gray-600 text-xs">({gem.reviewCount})</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No gems found.</p>
                <p className="text-gray-600 text-sm mt-2">Try a different search or category.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
