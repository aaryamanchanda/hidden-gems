import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Menu, X, Compass, Plus, Info } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home", icon: <MapPin size={16} /> },
    { to: "/explore", label: "Explore", icon: <Compass size={16} /> },
    { to: "/about", label: "About", icon: <Info size={16} /> },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050a0f]/95 backdrop-blur-md border-b border-[#00e5c0]/25 shadow-lg shadow-[#00e5c0]/8 neon-glow"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00e5c0] to-[#0077ff] flex items-center justify-center"
              >
                <MapPin size={14} className="text-[#050a0f]" />
              </motion.div>
              <span className="text-white font-bold tracking-wide">
                Hidden<span className="text-[#00e5c0]">Gems</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-[#00e5c0]/20 text-[#00e5c0] border border-[#00e5c0]/40"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/submit"
                className="ml-2 flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#00e5c0] to-[#0077ff] text-[#050a0f] text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Plus size={14} />
                Add a Gem
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#050a0f]/98 border-b border-[#00e5c0]/20"
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all ${
                        isActive
                          ? "bg-[#00e5c0]/20 text-[#00e5c0]"
                          : "text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
