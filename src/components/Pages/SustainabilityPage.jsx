import React, { useRef, useEffect } from "react";
import { motion, useSpring, useInView, useMotionValue } from "motion/react";
import { Leaf, Recycle, TreePine, Droplet, Heart, Award, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SustainabilityPage() {
  const navigate = useNavigate();

  // --- Existing Data (Preserved) ---
  const practices = [
    {
      icon: <TreePine className="w-8 h-8" />,
      title: "Sustainable Sourcing",
      description: "100% FSC-certified wood from responsibly managed forests",
      stats: "500+ acres of forest protected annually",
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Zero Waste Production",
      description: "All wood offcuts are recycled or composted",
      stats: "95% waste diversion rate",
    },
    {
      icon: <Droplet className="w-8 h-8" />,
      title: "Water Conservation",
      description: "Closed-loop water systems in all production facilities",
      stats: "80% reduction in water usage",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Fair Trade Certified",
      description: "Ethical wages and safe working conditions for all artisans",
      stats: "200+ artisan families supported",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Carbon Neutral",
      description: "Fully offset emissions through reforestation projects",
      stats: "10,000 trees planted in 2025",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Natural Finishes",
      description: "Only non-toxic, plant-based oils and waxes",
      stats: "100% chemical-free products",
    },
  ];

  const impacts = [
    { number: "100%", label: "Sustainably Sourced Wood" },
    { number: "95%", label: "Waste Diverted from Landfills" },
    { number: "200+", label: "Artisan Families Supported" },
    { number: "10K+", label: "Trees Planted in 2025" },
    { number: "Carbon Neutral", label: "Since 2023" },
    { number: "12", label: "Countries with Artisan Partners" },
  ];

  // --- Leaf Divider Component ---
  const LeafDivider = () => (
    <div className="flex items-center justify-center gap-3">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9BBA8]"></div>
      <svg className="w-4 h-4 text-[#8B6E4E] opacity-50" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 0 C4 6 4 14 10 20 C16 14 16 6 10 0 Z" />
      </svg>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9BBA8]"></div>
    </div>
  );

  const Counter = ({ value }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });

    // Parse numeric part (looks for starting number)
    const match = value.match(/^([\d.]+)(.*)$/);
    const numericValue = match ? parseFloat(match[1]) : NaN;
    const suffix = match ? match[2] : "";

    useEffect(() => {
      if (isInView && !isNaN(numericValue)) {
        motionValue.set(numericValue);
      }
    }, [isInView, numericValue, motionValue]);

    useEffect(() => {
      if (isNaN(numericValue)) return;

      const unsubscribe = springValue.on("change", (latest) => {
        if (ref.current) {
          // Check if integer or float content to decide formatting
          const isFloat = value.includes(".");
          const formatted = isFloat ? latest.toFixed(1) : Math.round(latest);
          ref.current.textContent = formatted + suffix;
        }
      });
      return unsubscribe;
    }, [springValue, suffix, numericValue, value]);

    if (isNaN(numericValue)) {
      return <span>{value}</span>;
    }

    return <span ref={ref}>0{suffix}</span>;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative overflow-hidden">

      {/* --- Background Texture (Global) --- */}
      <div className="fixed inset-0 opacity-[0.4] pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-[75vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1645307356404-407a1083ec59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Sustainable forest"
            className="w-full h-full object-cover"
          />
          {/* Warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3E2E1E]/80 via-[#3E2E1E]/50 to-transparent" />
          {/* Bottom fade to page background */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAF8F5] to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            {/* Badge */}
            <div className="inline-block mb-6 px-5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <span className="text-white/80 font-bold uppercase tracking-[0.2em] text-[10px]">
                Our Commitment
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-playfair mb-6 leading-tight">
              Our Commitment to the <span className="italic text-[#C9BBA8]">Planet</span>
            </h1>
            <p className="text-lg md:text-xl font-inter leading-relaxed text-white/80 max-w-xl">
              Sustainability isn't just a buzzword for us—it's the foundation of
              everything we create.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== MISSION SECTION ==================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#C9BBA8] bg-white/50">
            <span className="text-[#8B6E4E] font-bold uppercase tracking-[0.2em] text-[10px]">
              Our Purpose
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair text-[#3E2E1E] mb-3">
            Design That <span className="italic text-[#6B7F59]">Gives Back</span>
          </h2>
          <LeafDivider />
          <p className="text-lg text-[#6B6B6B] font-inter leading-relaxed mt-5 max-w-2xl mx-auto">
            Every piece we create reflects our commitment to sustainability,
            ethical craftsmanship, and protecting the planet.
          </p>
        </motion.div>
      </section>

      {/* ==================== PRACTICES SECTION ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Warm Background Band */}
        <div className="absolute inset-0 bg-[#F4EFE9]"></div>
        <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#C9BBA8] bg-white/50">
              <span className="text-[#8B6E4E] font-bold uppercase tracking-[0.2em] text-[10px]">
                Our Approach
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair text-[#3E2E1E] mb-3">How We Do It</h2>
            <LeafDivider />
            <p className="text-lg text-[#6B6B6B] font-inter max-w-2xl mx-auto mt-4">
              Our comprehensive approach to sustainability
            </p>
          </motion.div>

          {/* Practice Cards Grid/Scroll */}
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 scrollbar-hide">
            {practices.map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-[85vw] md:w-auto snap-center mr-4 md:mr-0 last:mr-0 group bg-[#FAF8F5] rounded-[1.5rem] border-2 border-[#C9BBA8] p-8 hover:shadow-lg hover:border-[#6B7F59]/40 transition-all duration-500 relative overflow-hidden"
              >
                {/* Wood Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 bg-[#F4EFE9] border border-[#C9BBA8] rounded-full flex items-center justify-center mb-5 text-[#6B7F59] group-hover:bg-[#6B7F59] group-hover:text-white transition-all duration-300">
                  {practice.icon}
                </div>

                {/* Title & Description */}
                <h3 className="relative z-10 font-playfair text-xl text-[#3E2E1E] mb-2">{practice.title}</h3>
                <p className="relative z-10 text-[#6B6B6B] font-inter text-sm leading-relaxed mb-5">
                  {practice.description}
                </p>

                {/* Stats Highlight */}
                <div className="relative z-10 pt-4 border-t border-[#C9BBA8]/50">
                  <p className="text-[#6B7F59] font-bold text-sm font-inter flex items-center gap-2">
                    <Leaf className="w-4 h-4 opacity-50" />
                    {practice.stats}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9BBA8]/50 to-transparent group-hover:via-[#6B7F59]/40 transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== IMPACT NUMBERS SECTION ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#C9BBA8] bg-white/50">
            <span className="text-[#8B6E4E] font-bold uppercase tracking-[0.2em] text-[10px]">
              Real Results
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair text-[#3E2E1E] mb-3">
            Our Impact by the <span className="italic text-[#6B7F59]">Numbers</span>
          </h2>
          <LeafDivider />
          <p className="text-lg text-[#6B6B6B] font-inter mt-4">Measuring what matters</p>
        </motion.div>

        {/* Impact Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="text-center bg-[#F4EFE9] rounded-[1.5rem] border-2 border-[#C9BBA8] p-6 relative overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Wood Texture */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

              <div className="relative z-10">
                <div className="text-3xl md:text-4xl font-playfair text-[#6B7F59] mb-2 leading-tight">
                  <Counter value={impact.number} />
                </div>
                <p className="text-[#6B6B6B] font-inter text-xs leading-snug">{impact.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 pt-8 max-w-5xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#F4EFE9] rounded-[2.5rem] border-2 border-[#C9BBA8] overflow-hidden py-16 md:py-20 px-6 md:px-16 text-center"
        >
          {/* Wood Texture */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

          {/* Warm Gradient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#8B6E4E]/10 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="inline-block mb-5 px-5 py-1.5 rounded-full border border-[#C9BBA8] bg-white/40 backdrop-blur-sm">
              <span className="text-[#8B6E4E] font-bold uppercase tracking-[0.2em] text-[10px]">
                Shop Responsibly
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-playfair mb-4 text-[#3E2E1E] leading-tight">
              Shop with <span className="italic text-[#6B7F59]">Purpose</span>
            </h2>

            <LeafDivider />

            <p className="text-base md:text-lg text-[#6B6B6B] mb-8 font-inter max-w-xl mx-auto leading-relaxed mt-4">
              Every purchase supports sustainable forestry and artisan
              communities around the world.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="group inline-flex items-center gap-2 px-10 py-4 bg-[#3E2E1E] text-[#F4EFE9] rounded-full font-bold tracking-wide transition-all duration-300 hover:bg-[#6B7F59] hover:scale-105 shadow-lg shadow-[#3E2E1E]/20"
            >
              Explore Our Products
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F4EFE9] via-[#C9BBA8] to-[#F4EFE9]"></div>
        </motion.div>
      </section>
    </div>
  );
}
