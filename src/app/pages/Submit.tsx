import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Plus, X, CheckCircle, Sparkles, Shield, AlertTriangle, XCircle } from "lucide-react";
import { gems, categories, categoryColors, categoryIcons, type Category, type Gem } from "../data/gems";
import { Link } from "react-router";
import { runAiCheck as executeAiCheck, type AiCheckResult } from "../utils/aiChecker";
import { LocationPicker } from "../components/LocationPicker";
interface FormData {
  name: string;
  category: Category | "";
  location: string;
  city: string;
  country: string;
  description: string;
  bestTime: string;
  localTip: string;
  imageUrl: string;
  tags: string[];
  lat: string;
  lng: string;
}

export function Submit() {
  const [form, setForm] = useState<FormData>({
    name: "",
    category: "",
    location: "",
    city: "",
    country: "India",
    description: "",
    bestTime: "",
    localTip: "",
    imageUrl: "",
    tags: [],
    lat: "",
    lng: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [aiChecking, setAiChecking] = useState(false);
  const [aiResult, setAiResult] = useState<AiCheckResult | null>(null);

  function update(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (t && !form.tags.includes(t) && form.tags.length < 6) {
      setForm((f) => ({ ...f, tags: [...f.tags, t] }));
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  }

  async function runAiCheck() {
    setAiChecking(true);
    setAiResult(null);
    // Simulate AI processing delay for UX
    await new Promise((r) => setTimeout(r, 1800));
    const result = executeAiCheck({
      name: form.name,
      location: form.location,
      city: form.city,
      description: form.description,
      localTip: form.localTip,
      bestTime: form.bestTime,
      tags: form.tags,
      lat: form.lat !== "" ? parseFloat(form.lat) : undefined,
      lng: form.lng !== "" ? parseFloat(form.lng) : undefined,
    });
    setAiResult(result);
    setAiChecking(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 3) {
      if (step === 2) await runAiCheck();
      setStep((s) => s + 1);
      return;
    }

    const newGem: Gem = {
      id: "gem_" + Date.now().toString(),
      name: form.name,
      category: form.category as Category,
      location: form.location,
      city: form.city,
      country: form.country,
      rating: 5.0,
      reviewCount: 0,
      description: form.description,
      longDescription: form.description,
      image: form.imageUrl || "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      tags: form.tags,
      verified: aiResult?.status === "pass",
      submittedBy: "Community",
      pinX: 50,
      pinY: 50,
      lat: form.lat ? parseFloat(form.lat) : 20.5937,
      lng: form.lng ? parseFloat(form.lng) : 78.9629,
      reviews: [],
      bestTime: form.bestTime,
      localTip: form.localTip,
    };
    gems.unshift(newGem);

    setSubmitted(true);
  }

  const step1Valid = form.name && form.category && form.location && form.city;
  const step2Valid = form.description && form.bestTime && form.localTip;

  if (submitted) {
    return (
      <div className="bg-[#050a0f] min-h-screen flex items-center justify-center pt-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center px-4"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-6"
          >
            💎
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-3">Gem Submitted!</h1>
          <p className="text-gray-400 mb-2">
            Thank you for sharing <span className="text-[#00e5c0]">{form.name}</span> with the community.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Your submission is under review. Our AI system and local moderators will verify it within 48 hours.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/explore"
              className="py-3 rounded-full bg-gradient-to-r from-[#00e5c0] to-[#0077ff] text-[#050a0f] font-bold hover:opacity-90 transition-opacity"
            >
              Explore More Gems
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setForm({ name: "", category: "", location: "", city: "", country: "India", description: "", bestTime: "", localTip: "", imageUrl: "", tags: [], lat: "", lng: "" });
                setAiResult(null);
              }}
              className="py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors"
            >
              Submit Another Gem
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#050a0f] min-h-screen pt-16">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-[#00e5c0]/10 border border-[#00e5c0]/30 rounded-full px-4 py-1.5 mb-4">
            <Sparkles size={14} className="text-[#00e5c0]" />
            <span className="text-[#00e5c0] text-sm">Share a local secret</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Submit a Hidden Gem</h1>
          <p className="text-gray-400 text-sm">
            Help travelers discover the real India. All submissions go through our community & AI verification.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 gap-2">
          {[
            { n: 1, label: "Basic Info" },
            { n: 2, label: "Details" },
            { n: 3, label: "AI Review" },
          ].map(({ n, label }, i) => (
            <div key={n} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step > n
                      ? "bg-[#00e5c0] text-[#050a0f]"
                      : step === n
                      ? "bg-gradient-to-br from-[#00e5c0] to-[#0077ff] text-[#050a0f]"
                      : "bg-white/10 text-gray-500"
                  }`}
                >
                  {step > n ? <CheckCircle size={16} /> : n}
                </div>
                <span className={`text-xs mt-1 ${step >= n ? "text-white" : "text-gray-600"}`}>{label}</span>
              </div>
              {i < 2 && <div className={`w-12 h-0.5 mb-4 ${step > n ? "bg-[#00e5c0]" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-[#0a1420] border border-white/8 rounded-2xl p-6 space-y-4">
                  <h2 className="text-white font-semibold mb-1">Basic Information</h2>

                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Gem Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. The Whispering Alley Café"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full px-4 py-3 bg-[#050a0f] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00e5c0]/50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Category *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => {
                        const color = categoryColors[cat];
                        const isSelected = form.category === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => update("category", cat)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm border transition-all ${
                              isSelected ? "" : "border-white/10 text-gray-400 hover:border-white/20 bg-[#050a0f]"
                            }`}
                            style={
                              isSelected
                                ? { backgroundColor: `${color}15`, borderColor: `${color}50`, color }
                                : {}
                            }
                          >
                            <span>{categoryIcons[cat]}</span>
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-gray-400 text-sm mb-1.5 block">Neighborhood / Area *</label>
                      <input
                        type="text"
                        placeholder="e.g. Old Quarter"
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        className="w-full px-4 py-3 bg-[#050a0f] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00e5c0]/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-1.5 block">City *</label>
                      <input
                        type="text"
                        placeholder="e.g. Jaipur"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        className="w-full px-4 py-3 bg-[#050a0f] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00e5c0]/50 text-sm"
                      />
                    </div>
                  </div>

                  {/* Coordinates — optional, validated by AI checker */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-gray-400 text-sm block">
                        Exact Location
                        <span className="text-gray-600 text-xs ml-2">(click on the map to drop a pin)</span>
                      </label>
                    </div>
                    
                    <div className="mb-3">
                      <LocationPicker 
                        lat={form.lat} 
                        lng={form.lng} 
                        onChange={(lat, lng) => {
                          update("lat", lat);
                          update("lng", lng);
                        }} 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        step="any"
                        placeholder="Latitude"
                        value={form.lat}
                        onChange={(e) => update("lat", e.target.value)}
                        className="w-full px-4 py-3 bg-[#050a0f] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00e5c0]/50 text-sm"
                      />
                      <input
                        type="number"
                        step="any"
                        placeholder="Longitude"
                        value={form.lng}
                        onChange={(e) => update("lng", e.target.value)}
                        className="w-full px-4 py-3 bg-[#050a0f] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00e5c0]/50 text-sm"
                      />
                    </div>
                    <p className="text-gray-600 text-xs mt-1">You can also manually enter coordinates from Google Maps.</p>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Tags (up to 6)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                        className="flex-1 px-4 py-2.5 bg-[#050a0f] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00e5c0]/50 text-sm"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2.5 bg-[#00e5c0]/10 border border-[#00e5c0]/30 text-[#00e5c0] rounded-xl text-sm hover:bg-[#00e5c0]/20"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    {form.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.tags.map((tag) => (
                          <span key={tag} className="flex items-center gap-1 text-xs px-2.5 py-1 bg-white/5 text-gray-300 rounded-full border border-white/10">
                            #{tag}
                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400">
                              <X size={10} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!step1Valid}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00e5c0] to-[#0077ff] text-[#050a0f] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  Continue →
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-[#0a1420] border border-white/8 rounded-2xl p-6 space-y-4">
                  <h2 className="text-white font-semibold">Details & Insider Knowledge</h2>

                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Description *</label>
                    <textarea
                      placeholder="Tell the story of this place. What makes it special? Why do locals love it?"
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 bg-[#050a0f] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00e5c0]/50 text-sm resize-none"
                    />
                    <p className="text-gray-600 text-xs mt-1">{form.description.length}/500 characters</p>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Best Time to Visit *</label>
                    <input
                      type="text"
                      placeholder="e.g. Early morning (7–9 AM) or Post-monsoon"
                      value={form.bestTime}
                      onChange={(e) => update("bestTime", e.target.value)}
                      className="w-full px-4 py-3 bg-[#050a0f] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00e5c0]/50 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Local Insider Tip *</label>
                    <textarea
                      placeholder="Share a secret tip that only a local would know..."
                      value={form.localTip}
                      onChange={(e) => update("localTip", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#050a0f] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00e5c0]/50 text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Photo URL (optional)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={form.imageUrl}
                      onChange={(e) => update("imageUrl", e.target.value)}
                      className="w-full px-4 py-3 bg-[#050a0f] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00e5c0]/50 text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={!step2Valid}
                    className="flex-2 flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#00e5c0] to-[#0077ff] text-[#050a0f] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  >
                    Run AI Check →
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="bg-[#0a1420] border border-white/8 rounded-2xl p-6">
                  <h2 className="text-white font-semibold mb-4">AI Authenticity Verification</h2>

                  <AnimatePresence mode="wait">
                    {aiChecking && (
                      <motion.div
                        key="checking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          className="text-4xl mb-4"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          🤖
                        </motion.div>
                        <p className="text-[#00e5c0] font-medium mb-1">AI is analyzing your submission...</p>
                        <p className="text-gray-500 text-sm">Checking for authenticity, misleading content, and tourist traps</p>
                        <div className="flex justify-center gap-1 mt-4">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-[#00e5c0]"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {!aiChecking && aiResult?.status === "pass" && (
                      <motion.div
                        key="pass"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#00e5c0]/20 border border-[#00e5c0]/40 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle size={32} className="text-[#00e5c0]" />
                        </div>
                        <p className="text-[#00e5c0] font-semibold text-lg mb-2">✅ Authenticity Verified!</p>
                        <p className="text-gray-400 text-sm mb-4">
                          Our AI found no signs of misleading content, overhyped claims, or tourist-trap characteristics.
                          This looks like a genuine hidden gem!
                        </p>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          {[
                            { label: "Authenticity", score: aiResult.scores.authenticity },
                            { label: "Uniqueness", score: aiResult.scores.uniqueness },
                            { label: "Quality", score: aiResult.scores.quality },
                            { label: "Local Feel", score: aiResult.scores.localness },
                          ].map(({ label, score }) => (
                            <div key={label} className="bg-[#050a0f] rounded-xl p-3">
                              <div className={`font-bold text-lg mb-0.5 ${score >= 70 ? "text-[#00e5c0]" : "text-yellow-400"}`}>{score}%</div>
                              <div className="text-gray-500">{label}</div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {!aiChecking && aiResult?.status === "warn" && (
                      <motion.div
                        key="warn"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-6"
                      >
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle size={32} className="text-yellow-400" />
                          </div>
                          <p className="text-yellow-400 font-semibold text-lg mb-2">⚠️ Needs Review</p>
                          <p className="text-gray-400 text-sm">
                            Our AI flagged some items. A human moderator will review your submission. You can still submit!
                          </p>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-xs mb-4">
                          {[
                            { label: "Authenticity", score: aiResult.scores.authenticity },
                            { label: "Uniqueness", score: aiResult.scores.uniqueness },
                            { label: "Quality", score: aiResult.scores.quality },
                            { label: "Local Feel", score: aiResult.scores.localness },
                          ].map(({ label, score }) => (
                            <div key={label} className="bg-[#050a0f] rounded-xl p-3">
                              <div className={`font-bold text-lg mb-0.5 ${score >= 70 ? "text-[#00e5c0]" : score >= 40 ? "text-yellow-400" : "text-red-400"}`}>{score}%</div>
                              <div className="text-gray-500">{label}</div>
                            </div>
                          ))}
                        </div>
                        {(aiResult.issues.length > 0 || aiResult.warnings.length > 0) && (
                          <div className="bg-[#050a0f] rounded-xl p-3 space-y-1.5">
                            {aiResult.warnings.map((w, i) => (
                              <div key={`w${i}`} className="flex items-start gap-2 text-xs text-yellow-400">
                                <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" /> {w}
                              </div>
                            ))}
                            {aiResult.issues.map((issue, i) => (
                              <div key={`i${i}`} className="flex items-start gap-2 text-xs text-gray-400">
                                <span className="text-gray-500 mt-0.5 flex-shrink-0">•</span> {issue}
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {!aiChecking && aiResult?.status === "fail" && (
                      <motion.div
                        key="fail"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-6"
                      >
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto mb-4">
                            <XCircle size={32} className="text-red-400" />
                          </div>
                          <p className="text-red-400 font-semibold text-lg mb-2">❌ Not Approved</p>
                          <p className="text-gray-400 text-sm">
                            Our AI found significant issues with your submission. Please review and fix the items below.
                          </p>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-xs mb-4">
                          {[
                            { label: "Authenticity", score: aiResult.scores.authenticity },
                            { label: "Uniqueness", score: aiResult.scores.uniqueness },
                            { label: "Quality", score: aiResult.scores.quality },
                            { label: "Local Feel", score: aiResult.scores.localness },
                          ].map(({ label, score }) => (
                            <div key={label} className="bg-[#050a0f] rounded-xl p-3">
                              <div className={`font-bold text-lg mb-0.5 ${score >= 70 ? "text-[#00e5c0]" : score >= 40 ? "text-yellow-400" : "text-red-400"}`}>{score}%</div>
                              <div className="text-gray-500">{label}</div>
                            </div>
                          ))}
                        </div>
                        {aiResult.issues.length > 0 && (
                          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3 space-y-1.5">
                            {aiResult.issues.map((issue, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-red-300">
                                <XCircle size={12} className="mt-0.5 flex-shrink-0 text-red-400" /> {issue}
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submission summary */}
                {aiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0a1420] border border-white/8 rounded-2xl p-5 space-y-2"
                  >
                    <h3 className="text-white text-sm font-medium mb-3">Submission Summary</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-400">Name</div>
                      <div className="text-white">{form.name}</div>
                      <div className="text-gray-400">Category</div>
                      <div className="text-white">{form.category}</div>
                      <div className="text-gray-400">Location</div>
                      <div className="text-white">{form.location}, {form.city}</div>
                    </div>
                  </motion.div>
                )}

                {aiResult && (
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 py-3.5 rounded-xl border border-white/20 text-white hover:bg-white/5"
                    >
                      ← Edit
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#00e5c0] to-[#0077ff] text-[#050a0f] font-bold hover:opacity-90 transition-opacity"
                    >
                      Submit Gem 💎
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          {[
            { icon: <Shield size={12} />, text: "Community Verified" },
            { icon: <Sparkles size={12} />, text: "AI Fake Detection" },
            { icon: <MapPin size={12} />, text: "Zero Paid Listings" },
          ].map(({ icon, text }, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-[#00e5c0]">{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
