import { motion } from "motion/react";
import { Leaf, Heart, Users, Award, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AboutPage() {
  const navigate = useNavigate();

  // --- Existing Data (Preserved) ---
  const values = [
    {
      icon: <Leaf className="w-7 h-7" />,
      title: "Sustainability First",
      description:
        "Every decision we make considers our impact on the planet, from material sourcing to packaging.",
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Crafted with Love",
      description:
        "We believe in the power of handmade goods to bring joy and meaning to everyday life.",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Fair Trade",
      description:
        "We partner with artisans worldwide, ensuring fair wages and ethical working conditions.",
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Quality Over Quantity",
      description:
        "We create timeless pieces built to last generations, not trends.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Founded",
      description: "Wooden Leaf was born from a passion for sustainable design",
    },
    {
      year: "2019",
      title: "First Collection",
      description: "Launched our inaugural line of handcrafted vases",
    },
    {
      year: "2021",
      title: "Fair Trade Certified",
      description: "Achieved certification for ethical artisan partnerships",
    },
    {
      year: "2023",
      title: "Carbon Neutral",
      description: "Reached full carbon neutrality across all operations",
    },
    {
      year: "2026",
      title: "Global Impact",
      description: "Now partnering with artisan communities in 12 countries",
    },
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative overflow-hidden">

      {/* --- Background Texture (Global) --- */}
      <div className="fixed inset-0 opacity-[0.4] pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-[75vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1722411927625-0e478acf502b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Artisan at work"
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
                Our Story
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-playfair mb-6 leading-tight">
              Crafting a <span className="italic text-[#C9BBA8]">Sustainable</span> Future
            </h1>
            <p className="text-lg md:text-xl font-inter leading-relaxed text-white/80 max-w-xl">
              We're on a mission to prove that beautiful design and
              environmental responsibility can coexist in perfect harmony.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== OUR STORY SECTION ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Section Label */}
            <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#C9BBA8] bg-white/50">
              <span className="text-[#8B6E4E] font-bold uppercase tracking-[0.2em] text-[10px]">
                How It Began
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-playfair text-[#3E2E1E] mb-3">Our Story</h2>
            <LeafDivider />

            <div className="space-y-5 text-base md:text-lg text-[#6B6B6B] font-inter leading-relaxed mt-6">
              <p>
                Wooden Leaf began in 2018 when founder Yash Jangid noticed a gap
                in the home décor market.
              </p>
              <p>
                She envisioned a company that would celebrate traditional
                craftsmanship while embracing modern sustainability practices.
              </p>
              <p>
                Today, we work with skilled craftspeople across 12 countries,
                creating pieces that honor cultural heritage and the planet.
              </p>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[450px] rounded-[2rem] overflow-hidden border-2 border-[#C9BBA8] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1645307356404-407a1083ec59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Sustainable forest"
                className="w-full h-full object-cover"
              />
              {/* Wood Texture Overlay on Image */}
              <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
            </div>
            {/* Decorative accent behind image */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-[2rem] border-2 border-[#C9BBA8]/30 -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* ==================== OUR VALUES SECTION ==================== */}
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
                What We Believe
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-playfair text-[#3E2E1E] mb-3">Our Values</h2>
            <LeafDivider />
            <p className="text-lg text-[#6B6B6B] font-inter max-w-2xl mx-auto mt-4">
              The principles that guide everything we do
            </p>
          </motion.div>

          {/* Value Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-[#FAF8F5] rounded-[1.5rem] border-2 border-[#C9BBA8] p-8 text-center hover:shadow-lg hover:border-[#6B7F59]/40 transition-all duration-500 relative overflow-hidden"
              >
                {/* Wood Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 bg-[#F4EFE9] border border-[#C9BBA8] rounded-full flex items-center justify-center mx-auto mb-5 text-[#6B7F59] group-hover:bg-[#6B7F59] group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>

                <h3 className="relative z-10 font-playfair text-xl text-[#3E2E1E] mb-2">{value.title}</h3>
                <p className="relative z-10 text-[#6B6B6B] font-inter text-sm leading-relaxed">{value.description}</p>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9BBA8]/50 to-transparent group-hover:via-[#6B7F59]/40 transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TIMELINE / OUR JOURNEY ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
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
              Milestones
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-playfair text-[#3E2E1E] mb-3">Our Journey</h2>
          <LeafDivider />
          <p className="text-lg text-[#6B6B6B] font-inter mt-4">Key milestones in our story</p>
        </motion.div>

        {/* Timeline Items */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C9BBA8] via-[#6B7F59]/30 to-[#C9BBA8] -translate-x-1/2"></div>

          <div className="space-y-12">
            {milestones.map((m, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
              >
                {/* Year Badge (Center on Desktop) */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-[#3E2E1E] rounded-full flex items-center justify-center z-10 border-4 border-[#FAF8F5] shadow-md">
                  <span className="text-sm font-bold text-[#F4EFE9] font-playfair">{m.year}</span>
                </div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:pr-4 md:text-right" : "md:pl-4 md:text-left"}`}>
                  <div className="bg-[#F4EFE9] rounded-[1.5rem] border-2 border-[#C9BBA8] p-6 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                    {/* Wood Texture */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                    <h3 className="relative z-10 font-playfair text-2xl text-[#3E2E1E] mb-1">{m.title}</h3>
                    <p className="relative z-10 text-[#6B6B6B] font-inter text-sm leading-relaxed">{m.description}</p>
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]"></div>
              </motion.div>
            ))}
          </div>
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
                Make A Difference
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-playfair mb-4 text-[#3E2E1E] leading-tight">
              Join Our <span className="italic text-[#6B7F59]">Mission</span>
            </h2>

            <LeafDivider />

            <p className="text-base md:text-lg text-[#6B6B6B] mb-8 font-inter max-w-xl mx-auto leading-relaxed mt-4">
              Every purchase supports sustainable forestry and fair-trade artisan
              communities around the world.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate("/shop")}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#3E2E1E] text-[#F4EFE9] rounded-full font-bold tracking-wide transition-all duration-300 hover:bg-[#6B7F59] hover:scale-105 shadow-lg shadow-[#3E2E1E]/20"
              >
                Shop Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/sustainability")}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-transparent text-[#3E2E1E] rounded-full font-bold tracking-wide border-2 border-[#C9BBA8] transition-all duration-300 hover:bg-[#3E2E1E] hover:text-[#F4EFE9] hover:border-[#3E2E1E] hover:scale-105"
              >
                Learn About Our Impact
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F4EFE9] via-[#C9BBA8] to-[#F4EFE9]"></div>
        </motion.div>
      </section>
    </div>
  );
}
