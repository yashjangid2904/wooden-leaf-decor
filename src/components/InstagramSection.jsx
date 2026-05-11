import { Instagram, Heart, MessageCircle, ArrowUpRight, Users, Image, Star, TrendingUp } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

/**
 * AnimatedCounter — Animates a number from 0 to `target` using Framer Motion spring physics.
 * Triggers once when the element scrolls into view.
 * @param {number} target - The final number to animate to
 * @param {string} suffix - Text appended after the number (e.g. "K+", "%", "+")
 * @param {string} suffixColor - Tailwind text color class for the suffix
 */
function AnimatedCounter({ target, suffix = "", suffixColor = "text-[#6B7F59]" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  // Create a motion value that starts at 0
  const motionValue = useMotionValue(0);

  // Apply spring physics — bouncy overshoot for a lively feel
  const springValue = useSpring(motionValue, {
    stiffness: 80,
    damping: 20,
    mass: 1,
  });

  // When element comes into view, animate to target
  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  // Subscribe to spring value changes and update display
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <p ref={ref} className="font-playfair text-2xl sm:text-4xl md:text-5xl text-[#2C2C2C] font-bold tracking-tight leading-none whitespace-nowrap">
      {displayValue}<span className={suffixColor}>{suffix}</span>
    </p>
  );
}

const instagramImages = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Minimalist dining room",
    likes: "2.4k",
    comments: "56",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1765277789225-a6a5e57b708e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Natural wooden shelves",
    likes: "1.8k",
    comments: "42",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1681081108013-9b029f2a944e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Cozy living room with plants",
    likes: "3.1k",
    comments: "89",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Modern wooden decor",
    likes: "2.9k",
    comments: "64",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Handcrafted wooden stool",
    likes: "1.5k",
    comments: "31",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Warm lighting in library",
    likes: "4.2k",
    comments: "102",
  },

];

export function InstagramSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-16 md:py-32 bg-[#FAF8F5]"
    >
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>

      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#6B7F59]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#D4C7B0]/20 rounded-full blur-[150px]"></div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-md border border-[#E5E5E5] text-[#6B7F59] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6B7F59] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6B7F59]"></span>
              </span>
              Community Showcase
            </div>
            <h2 className="font-playfair text-5xl sm:text-6xl md:text-7xl text-[#2C2C2C] leading-[1.1] mb-6">
              Living with <br /> <span className="italic font-light">Nature's Essence</span>
            </h2>
            <p className="font-inter text-[#6B6B6B] text-lg max-w-md leading-relaxed">
              <span className="text-[#2C2C2C] font-semibold underline decoration-[#D4C7B0] decoration-2 underline-offset-4 cursor-pointer hover:text-[#6B7F59] transition-colors">#WoodenLeafHome</span> to be featured in our monthly editorial.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a
              href="https://www.instagram.com/woodenleaf.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white pl-8 pr-2 py-2 rounded-full font-semibold transition-all duration-500 hover:shadow-[0_20px_50px_rgba(238,42,123,0.3)] shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Instagram className="w-5 h-5 transition-transform group-hover:rotate-12" />
                Explore Our Daily Journal
              </span>
              <div className="relative z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#ee2a7b] transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
          </motion.div>
        </div>

        {/* Cinematic Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-5 md:gap-8 auto-rows-[200px] md:auto-rows-[250px]">
          {instagramImages.map((item, index) => {
            const gridClasses = [
              "col-span-2 md:col-span-4 md:row-span-2", // 1st - Big Feature
              "col-span-1 md:col-span-5 md:row-span-1", // 2nd
              "col-span-1 md:col-span-3 md:row-span-2", // 3rd - Right Tall
              "col-span-1 md:col-span-2 md:row-span-1", // 4th
              "col-span-1 md:col-span-3 md:row-span-1", // 5th
              "col-span-2 md:col-span-12 md:row-span-2", // 6th - Bottom Wide Feature
            ][index] || "col-span-1 md:col-span-4 md:row-span-1";

            const parallaxY = index % 2 === 0 ? y1 : y2;

            return (
              <motion.a
                key={item.id}
                href="https://www.instagram.com/woodenleaf.co/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ y: parallaxY }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "circOut" }}
                className={`relative overflow-hidden rounded-[2rem] group cursor-pointer block border border-white/20 shadow-xl ${gridClasses}`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-all duration-[1500ms] ease-out-expo group-hover:scale-[1.15] group-hover:rotate-1"
                />

                {/* Glassmorphism Stats Badge */}
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 flex items-center justify-between">
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                    <div className="flex items-center gap-1.5 text-white">
                      <Heart className="w-4 h-4 fill-white animate-pulse" />
                      <span className="text-xs font-bold font-inter">{item.likes}</span>
                    </div>
                    <div className="w-px h-3 bg-white/20"></div>
                    <div className="flex items-center gap-1.5 text-white">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs font-bold font-inter">{item.comments}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#2C2C2C]">
                    <Instagram className="w-5 h-5" />
                  </div>
                </div>

                {/* Subtle Grain over image */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </motion.a>
            );
          })}
        </div>

        {/* ====== Redesigned Impact Stats Section ====== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-16 md:mt-32 relative"
        >
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6B7F59]/10 text-[#6B7F59] text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Our Impact
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-2xl sm:text-3xl md:text-4xl text-[#2C2C2C]"
            >
              The Wooden Leaf <span className="italic font-light">Impact</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm text-[#6B6B6B] font-inter mt-2 sm:mt-3 max-w-md mx-auto px-4 sm:px-0"
            >
              Join a growing community of conscious lovers who choose sustainable living
            </motion.p>
          </div>

          {/* Stats Cards Grid - 3 Columns on all screens for compactness */}
          <div className="grid grid-cols-3 gap-1 sm:gap-5 mb-6 md:mb-10 max-w-2xl mx-auto">
            {/* Stat Card 1 - Followers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative group p-2 sm:p-6 text-center"
            >
              {/* Enhanced Pulsing Background Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-32 h-20 sm:h-32 bg-[#6B7F59]/15 rounded-full blur-2xl sm:blur-3xl pointer-events-none"
              />

              {/* Decorative SVG Pattern - Wood Rings */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-32 h-20 sm:h-32 text-[#6B7F59] opacity-[0.04] sm:opacity-[0.05] pointer-events-none"
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" />
              </motion.svg>

              <div className="relative z-10">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#6B7F59]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-sm"
                >
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B7F59]" />
                </motion.div>
                <AnimatedCounter target={12} suffix="K+" suffixColor="text-[#6B7F59]" />
                <p className="text-[#8B847C] text-[7px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] mt-1 sm:mt-3 font-inter">Followers</p>
              </div>

              {/* Vertical Divider */}
              <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-[#E5E5E5]/60 sm:bg-[#E5E5E5]"></div>
            </motion.div>

            {/* Stat Card 2 - Curated Posts */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group p-2 sm:p-6 text-center"
            >
              {/* Enhanced Pulsing Background Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.08, 0.15, 0.08],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-32 h-20 sm:h-32 bg-[#C9A84C]/15 rounded-full blur-2xl sm:blur-3xl pointer-events-none"
              />

              {/* Decorative SVG Pattern - Floating Shapes */}
              <motion.svg
                animate={{
                  y: [0, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-2 right-1/4 w-16 sm:w-20 h-16 sm:h-20 text-[#C9A84C] opacity-[0.05] sm:opacity-[0.06] pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                <path d="M12 2L15 8H9L12 2Z" />
                <circle cx="12" cy="14" r="4" />
                <rect x="8" y="10" width="8" height="8" rx="1" />
              </motion.svg>

              <div className="relative z-10">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-sm"
                >
                  <Image className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A84C]" />
                </motion.div>
                <AnimatedCounter target={500} suffix="+" suffixColor="text-[#C9A84C]" />
                <p className="text-[#8B847C] text-[7px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] mt-1 sm:mt-3 font-inter">Curated Posts</p>
              </div>

              {/* Vertical Divider */}
              <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-[#E5E5E5]/60 sm:bg-[#E5E5E5]"></div>
            </motion.div>

            {/* Stat Card 3 - Satisfaction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative group p-2 sm:p-6 text-center"
            >
              {/* Enhanced Pulsing Background Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.08, 0.15, 0.08],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 sm:w-32 h-20 sm:h-32 bg-[#C17F59]/15 rounded-full blur-2xl sm:blur-3xl pointer-events-none"
              />

              {/* Decorative SVG Pattern - Dots & Lines */}
              <motion.svg
                animate={{
                  scale: [0.9, 1.1, 0.9],
                  opacity: [0.05, 0.08, 0.05]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-4 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 text-[#C17F59] pointer-events-none"
                viewBox="0 0 100 100"
              >
                <circle cx="20" cy="20" r="3" fill="currentColor" />
                <circle cx="50" cy="20" r="3" fill="currentColor" />
                <circle cx="80" cy="20" r="3" fill="currentColor" />
                <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="20" cy="80" r="3" fill="currentColor" />
                <circle cx="50" cy="80" r="3" fill="currentColor" />
                <circle cx="80" cy="80" r="3" fill="currentColor" />
              </motion.svg>

              <div className="relative z-10">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#C17F59]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-sm"
                >
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C17F59]" />
                </motion.div>
                <AnimatedCounter target={98} suffix="%" suffixColor="text-[#C17F59]" />
                <p className="text-[#8B847C] text-[7px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] mt-1 sm:mt-3 font-inter">Satisfaction</p>
              </div>
            </motion.div>
          </div>

          {/* Community Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 pt-4 sm:pt-6"
          >
            {/* Stacked Avatars */}
            <div className="flex items-center -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-[3px] border-[#FAF8F5] overflow-hidden shadow-md hover:scale-110 hover:z-10 transition-transform duration-300 relative"
                >
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="community member" className="w-full h-full object-cover" />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-[3px] border-[#FAF8F5] bg-[#6B7F59] flex items-center justify-center text-white text-[8px] sm:text-[10px] font-bold shadow-md"
              >
                +1k
              </motion.div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-[#E1E1E1]" />

            {/* CTA text + button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm text-[#5A544F] font-inter">
                Be part of the <span className="font-semibold text-[#2C2C2C]">community</span>
              </p>
              <motion.a
                href="https://www.instagram.com/woodenleaf.co/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#2C2C2C] text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-[#6B7F59] transition-colors duration-300 shadow-lg"
              >
                Follow Us
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
