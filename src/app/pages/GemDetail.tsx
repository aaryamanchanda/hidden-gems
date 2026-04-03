import { useState } from "react";
import { useParams, Link, Navigate } from "react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  MapPin, Star, Shield, Clock, Lightbulb, ArrowLeft, Heart, Share2,
  Tag, User, ChevronRight
} from "lucide-react";
import { gems, categoryColors, categoryIcons } from "../data/gems";
import { StarRating } from "../components/StarRating";
import { GemCard } from "../components/GemCard";

/** Deterministic like count seeded from gem id — no flicker on re-render */
function seededLikeCount(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return 20 + (hash % 80);
}

export function GemDetail() {
  const { id } = useParams();
  const gem = gems.find((g) => g.id === id);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(() => seededLikeCount(gem?.id ?? "0"));
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(gem?.reviews || []);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewName, setReviewName] = useState("");

  if (!gem) return <Navigate to="/explore" />;

  const color = categoryColors[gem.category];
  const icon = categoryIcons[gem.category];
  const relatedGems = gems.filter((g) => g.id !== gem.id && g.category === gem.category).slice(0, 3);

  function handleLike() {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  }

  function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reviewRating || !reviewText.trim() || !reviewName.trim()) return;
    setReviews((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        author: reviewName,
        avatar: reviewName[0].toUpperCase(),
        rating: reviewRating,
        text: reviewText,
        date: "April 2026",
      },
    ]);
    setReviewSubmitted(true);
    setReviewText("");
    setReviewRating(0);
    setReviewName("");
  }

  function handleShare() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success("Link copied to clipboard!", { description: gem?.name }))
      .catch(() => toast.error("Could not copy link"));
  }

  return (
    <div className="bg-[#050a0f] min-h-screen pt-16">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96">
        <img src={gem.image} alt={gem.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a0f] via-[#050a0f]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050a0f]/60 to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 left-4">
          <Link
            to="/explore"
            className="flex items-center gap-2 text-white bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full text-sm hover:bg-black/60 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Explore
          </Link>
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-sm text-sm transition-all ${
              liked
                ? "bg-red-500/30 text-red-400 border border-red-500/40"
                : "bg-black/40 text-white hover:bg-black/60"
            }`}
          >
            <Heart size={14} className={liked ? "fill-red-400" : ""} />
            {likeCount}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm hover:bg-black/60 transition-colors"
          >
            <Share2 size={14} />
            Share
          </button>
        </div>

        {/* Gem name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-8">
          <div className="max-w-5xl mx-auto">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
              style={{ backgroundColor: `${color}25`, color, border: `1px solid ${color}50` }}
            >
              {icon} {gem.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{gem.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-gray-300">
                <MapPin size={14} className="text-[#00e5c0]" />
                {gem.location}, {gem.city}, {gem.country}
              </span>
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-[#fbbf24] text-[#fbbf24]" />
                <span className="text-white font-semibold">{gem.rating}</span>
                <span className="text-gray-400">({gem.reviewCount} reviews)</span>
              </div>
              {gem.verified && (
                <span className="flex items-center gap-1 text-[#00e5c0] text-xs border border-[#00e5c0]/30 px-2 py-0.5 rounded-full">
                  <Shield size={11} /> Verified Local Gem
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0a1420] border border-white/8 rounded-2xl p-6"
            >
              <h2 className="text-white font-semibold mb-4">About this place</h2>
              <p className="text-gray-300 leading-relaxed">{gem.longDescription}</p>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {gem.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10 hover:border-white/30 transition-colors"
                >
                  <Tag size={12} className="text-[#00e5c0]" />#{tag}
                </span>
              ))}
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0a1420] border border-white/8 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-semibold">
                  Community Reviews <span className="text-gray-500 text-sm font-normal">({reviews.length})</span>
                </h2>
                <div className="flex items-center gap-2">
                  <Star size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
                  <span className="text-white font-bold text-lg">{gem.rating}</span>
                  <span className="text-gray-400 text-sm">/ 5</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                        style={{ backgroundColor: color + "40" }}
                      >
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm font-medium">{review.author}</span>
                          <span className="text-gray-500 text-xs">{review.date}</span>
                        </div>
                        <StarRating value={review.rating} readonly size={13} />
                        <p className="text-gray-300 text-sm mt-2 leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              {reviewSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#00e5c0]/10 border border-[#00e5c0]/30 rounded-xl p-4 text-center"
                >
                  <div className="text-2xl mb-2">🎉</div>
                  <p className="text-[#00e5c0] font-medium">Review submitted!</p>
                  <p className="text-gray-400 text-sm mt-1">Thank you for helping the community.</p>
                  <button
                    onClick={() => setReviewSubmitted(false)}
                    className="mt-3 text-gray-400 text-sm hover:text-white"
                  >
                    Write another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="bg-[#050a0f] border border-white/8 rounded-xl p-4 space-y-3">
                  <h3 className="text-white text-sm font-medium">Write a Review</h3>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a1420] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00e5c0]/50 text-sm"
                  />
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block">Your Rating</label>
                    <StarRating value={reviewRating} onChange={setReviewRating} size={22} />
                  </div>
                  <textarea
                    placeholder="Share your experience..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-[#0a1420] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00e5c0]/50 text-sm resize-none"
                  />
                  <button
                    type="submit"
                    disabled={!reviewRating || !reviewText.trim() || !reviewName.trim()}
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#00e5c0] to-[#0077ff] text-[#050a0f] font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Quick info card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0a1420] border border-white/8 rounded-2xl p-5 space-y-4"
            >
              <h3 className="text-white font-semibold">Local Tips</h3>

              <div className="flex gap-3">
                <Clock size={16} className="text-[#00e5c0] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Best Time to Visit</p>
                  <p className="text-white text-sm">{gem.bestTime}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Lightbulb size={16} className="text-[#fbbf24] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Local Insider Tip</p>
                  <p className="text-white text-sm leading-relaxed">"{gem.localTip}"</p>
                </div>
              </div>

              <div className="flex gap-3">
                <User size={16} className="text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Submitted by</p>
                  <p className="text-white text-sm">{gem.submittedBy}</p>
                </div>
              </div>
            </motion.div>

            {/* Rating breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0a1420] border border-white/8 rounded-2xl p-5"
            >
              <h3 className="text-white font-semibold mb-4">Rating Breakdown</h3>
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter((r) => r.rating === stars).length;
                const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 text-xs w-4">{stars}</span>
                    <Star size={11} className="fill-[#fbbf24] text-[#fbbf24]" />
                    <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full bg-[#fbbf24]"
                      />
                    </div>
                    <span className="text-gray-500 text-xs w-4">{count}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* Share */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={handleShare}
              className="w-full bg-[#0a1420] border border-white/8 rounded-2xl p-4 flex items-center justify-center gap-2 text-gray-300 hover:text-white hover:border-white/20 transition-all text-sm"
            >
              <Share2 size={14} />
              Share this gem with a friend
            </motion.button>
          </div>
        </div>

        {/* Related Gems */}
        {relatedGems.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold">More {gem.category} Gems</h2>
              <Link
                to="/explore"
                className="flex items-center gap-1 text-[#00e5c0] text-sm hover:gap-2 transition-all"
              >
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedGems.map((g, i) => (
                <GemCard key={g.id} gem={g} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
