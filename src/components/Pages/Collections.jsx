import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Enhanced Wood Collection Card with Wooden Theme ---
const WoodCollectionCard = ({ image, title, description, onClick, index, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className={`group cursor-pointer relative bg-[#F4EFE9] rounded-[2rem] overflow-hidden border-2 border-[#C9BBA8] hover:border-[#6B7F59]/50 hover:shadow-[0_20px_40px_rgba(107,127,89,0.2)] transition-all duration-500 flex flex-col h-full ${className}`}
    >
      {/* Wood Texture Overlay - Stronger */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>



      {/* Image Container */}
      <div className="relative h-64 md:h-72 overflow-hidden m-2.5 rounded-t-[1.6rem] rounded-b-[1rem]">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />

        {/* Hover Overlay Button */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-[#F4EFE9]/90 backdrop-blur text-[#2C2C2C] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl border border-[#D4C8B8]">
            Explore
            <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-4 pb-8 text-center relative z-10 flex-1 flex flex-col items-center justify-center">
        <h3 className="font-playfair text-2xl md:text-3xl text-[#3E2E1E] mb-3 group-hover:text-[#6B7F59] transition-colors duration-300">
          {title}
        </h3>
        {/* Wooden Divider */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-[#D4C8B8] group-hover:w-12 group-hover:bg-[#6B7F59] transition-all duration-500"></div>
          <svg className="w-4 h-4 text-[#8B6E4E] opacity-50" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 0 C4 6 4 14 10 20 C16 14 16 6 10 0 Z" />
          </svg>
          <div className="h-px w-8 bg-[#D4C8B8] group-hover:w-12 group-hover:bg-[#6B7F59] transition-all duration-500"></div>
        </div>
        <p className="font-inter text-[#6B6B6B] text-sm leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      {/* Bottom Wood Accent Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B6E4E]/0 via-[#8B6E4E]/30 to-[#8B6E4E]/0 group-hover:via-[#6B7F59]/40 transition-all duration-500"></div>
    </motion.div>
  );
};

export function CollectionsPage() {
  const navigate = useNavigate();

  const collections = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1624958545223-2944616555bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Minimalist Living",
      description: "Clean lines and natural textures for modern spaces designed to breathe.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1645307356404-407a1083ec59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Forest Collection",
      description: "Inspired by the serene beauty of woodland landscapes.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1722411927625-0e478acf502b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Artisan Favorites",
      description: "Hand-selected pieces showcasing exceptional craftsmanship.",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1768637087224-cffa17561c53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Sustainable Kitchen",
      description: "Eco-friendly essentials for conscious cooking.",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1743148509752-9ea6072ea35f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Plant Lovers",
      description: "Beautiful planters and botanical accessories.",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1582345486418-0eeaeecb5dda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Cozy Spaces",
      description: "Warmth and comfort for relaxing environments.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative overflow-hidden pt-24">

      {/* --- Atmospheric Background --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Moving Orbs */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6B7F59]/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#8B6E4E]/15 rounded-full blur-[80px]"
        />

        {/* Texture Grain */}
        <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

        {/* Falling Leaves Animation System - 15 leaves, 6 shapes */}
        {[
          // [startX%, size, swayDirection, duration, delay, shapeIndex, colorIndex]
          { x: 5, s: 28, sw: 60, d: 18, dl: 0, sh: 0, c: 0 },
          { x: 15, s: 45, sw: -40, d: 22, dl: 3, sh: 1, c: 1 },
          { x: 25, s: 20, sw: 35, d: 16, dl: 7, sh: 2, c: 2 },
          { x: 35, s: 55, sw: -55, d: 25, dl: 1, sh: 3, c: 0 },
          { x: 45, s: 32, sw: 45, d: 20, dl: 12, sh: 4, c: 1 },
          { x: 55, s: 40, sw: -30, d: 17, dl: 5, sh: 5, c: 2 },
          { x: 65, s: 25, sw: 50, d: 23, dl: 8, sh: 0, c: 1 },
          { x: 75, s: 50, sw: -60, d: 19, dl: 2, sh: 1, c: 0 },
          { x: 85, s: 35, sw: 40, d: 21, dl: 10, sh: 2, c: 2 },
          { x: 10, s: 60, sw: -35, d: 24, dl: 15, sh: 3, c: 1 },
          { x: 30, s: 22, sw: 55, d: 15, dl: 6, sh: 4, c: 0 },
          { x: 50, s: 38, sw: -45, d: 26, dl: 4, sh: 5, c: 2 },
          { x: 70, s: 48, sw: 30, d: 18, dl: 9, sh: 0, c: 1 },
          { x: 90, s: 30, sw: -50, d: 22, dl: 14, sh: 1, c: 0 },
          { x: 42, s: 65, sw: 35, d: 27, dl: 11, sh: 3, c: 2 },
        ].map((leaf, i) => {
          // 3 earthy color options
          const colors = ['text-[#6B7F59]', 'text-[#8B6E4E]', 'text-[#5D4037]'];
          // 6 different leaf SVG shapes
          const shapes = [
            // Shape 0: Pointed Leaf
            <path key="s0" d="M50 0 C20 40 80 60 50 100 C80 60 20 40 50 0 Z" />,
            // Shape 1: Rounded Petal
            <path key="s1" d="M50 0 C10 30 10 70 50 100 C90 70 90 30 50 0 Z" />,
            // Shape 2: Oval Leaf
            <ellipse key="s2" cx="50" cy="50" rx="40" ry="20" />,
            // Shape 3: Tropical Leaf with center vein
            <><path key="s3" d="M50 0 C20 20 5 50 15 80 C25 95 50 100 50 100 C50 100 75 95 85 80 C95 50 80 20 50 0 Z" /><line key="s3v" x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.3" /></>,
            // Shape 4: Oak-like Leaf with lobes
            <path key="s4" d="M50 0 C30 15 15 20 20 35 C10 45 15 55 25 55 C20 65 25 80 50 100 C75 80 80 65 75 55 C85 55 90 45 80 35 C85 20 70 15 50 0 Z" />,
            // Shape 5: Teardrop Petal
            <path key="s5" d="M50 0 Q15 50 50 100 Q85 50 50 0 Z" />,
          ];

          return (
            <motion.div
              key={i}
              className={`absolute ${colors[leaf.c]} opacity-[0.35]`}
              style={{ left: `${leaf.x}%` }}
              initial={{ top: -100 }}
              animate={{
                top: '110%',
                x: [0, leaf.sw, -leaf.sw * 0.5, leaf.sw * 0.3, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: leaf.d,
                repeat: Infinity,
                ease: 'linear',
                delay: leaf.dl,
              }}
            >
              <svg width={leaf.s} height={leaf.s} viewBox="0 0 100 100" fill="currentColor">
                {shapes[leaf.sh]}
              </svg>
            </motion.div>
          );
        })}
      </div>

      {/* Stationary Botanical Corner - Top Left */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-0 z-[1] opacity-[0.18] pointer-events-none origin-top-left"
      >
        <svg width="320" height="420" viewBox="0 0 320 420" fill="none">
          {/* Main Branch - tapered, organic curve */}
          <path d="M-5 -10 C15 50 25 110 40 170 C55 230 35 310 15 400" stroke="#5D4037" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Sub-branch 1 - curves right */}
          <path d="M25 100 C55 85 90 75 120 90" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Sub-branch 2 - curves right lower */}
          <path d="M40 200 C70 185 110 195 140 210" stroke="#5D4037" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Sub-branch 3 - short left twig */}
          <path d="M20 300 C-10 280 -20 260 -15 240" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* --- Leaves on Main Branch --- */}
          {/* Leaf 1 (left side, top) - pointed leaf with midrib */}
          <g transform="translate(10, 55) rotate(-50)">
            <path d="M0 0 C-8 -12 -5 -28 0 -38 C5 -28 8 -12 0 0 Z" fill="#6B7F59" />
            <line x1="0" y1="0" x2="0" y2="-36" stroke="#5D4037" strokeWidth="0.5" opacity="0.4" />
          </g>
          {/* Leaf 2 (right side) */}
          <g transform="translate(30, 130) rotate(40)">
            <path d="M0 0 C-10 -15 -6 -32 0 -44 C6 -32 10 -15 0 0 Z" fill="#6B7F59" />
            <line x1="0" y1="0" x2="0" y2="-42" stroke="#5D4037" strokeWidth="0.5" opacity="0.4" />
          </g>
          {/* Leaf 3 (left side, mid) */}
          <g transform="translate(20, 230) rotate(-55)">
            <path d="M0 0 C-9 -14 -5 -30 0 -40 C5 -30 9 -14 0 0 Z" fill="#6B7F59" />
            <line x1="0" y1="0" x2="0" y2="-38" stroke="#5D4037" strokeWidth="0.5" opacity="0.4" />
          </g>
          {/* Leaf 4 (right, lower) */}
          <g transform="translate(30, 330) rotate(35)">
            <path d="M0 0 C-7 -10 -4 -24 0 -32 C4 -24 7 -10 0 0 Z" fill="#6B7F59" />
            <line x1="0" y1="0" x2="0" y2="-30" stroke="#5D4037" strokeWidth="0.5" opacity="0.4" />
          </g>

          {/* --- Leaves on Sub-branch 1 --- */}
          <g transform="translate(75, 82) rotate(-30)">
            <path d="M0 0 C-6 -10 -4 -22 0 -30 C4 -22 6 -10 0 0 Z" fill="#8B6E4E" />
          </g>
          <g transform="translate(110, 88) rotate(20)">
            <path d="M0 0 C-8 -12 -5 -28 0 -36 C5 -28 8 -12 0 0 Z" fill="#6B7F59" />
          </g>

          {/* --- Leaves on Sub-branch 2 --- */}
          <g transform="translate(90, 192) rotate(-25)">
            <path d="M0 0 C-7 -11 -4 -25 0 -34 C4 -25 7 -11 0 0 Z" fill="#8B6E4E" />
          </g>
          <g transform="translate(130, 205) rotate(30)">
            <path d="M0 0 C-6 -10 -4 -22 0 -30 C4 -22 6 -10 0 0 Z" fill="#6B7F59" />
          </g>

          {/* Small buds / seed pods */}
          <circle cx="120" cy="90" r="3" fill="#5D4037" opacity="0.5" />
          <circle cx="140" cy="212" r="2.5" fill="#5D4037" opacity="0.4" />
          <circle cx="5" cy="370" r="3.5" fill="#5D4037" opacity="0.35" />
        </svg>
      </motion.div>

      {/* Header Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block mb-4 p-2 bg-white/50 backdrop-blur rounded-full border border-[#E6E1D6]">
            <span className="text-[#6B7F59] font-bold uppercase tracking-[0.2em] text-[10px] px-3">
              Handcrafted Series
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-playfair text-[#2C2C2C] mb-6 leading-tight">
            Curated <span className="italic relative">
              Collections
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#6B7F59]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-[#6B6B6B] font-inter max-w-2xl mx-auto leading-relaxed">
            Discover our thoughtfully gathered selections, designed to inspire your sustainable sanctuary with warmth and artistry.
          </p>
        </motion.div>
      </section>

      {/* Collections Grid - Bento Layout */}
      <section className="px-4 sm:px-6 lg:px-8 pb-32 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection, index) => (
            <WoodCollectionCard
              key={collection.id}
              index={index}
              {...collection}
              className={`${index === 0 || index === 3 || index === 4 ? "md:col-span-2 lg:col-span-2" : ""}`}
              onClick={() => navigate("/shop")}
            />
          ))}
        </div>
      </section>

      {/* CTA Section - Elegant Card Style */}
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

          {/* Decorative Leaf - Left */}
          <motion.svg
            animate={{ rotate: [0, 3, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-16 md:w-24 h-auto text-[#6B7F59] opacity-15 origin-bottom pointer-events-none"
            viewBox="0 0 100 200"
          >
            <path d="M50 200 C50 150 20 120 10 80 C0 40 30 0 50 0 C70 0 100 40 90 80 C80 120 50 150 50 200 Z" fill="currentColor" />
            <line x1="50" y1="200" x2="50" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </motion.svg>

          {/* Decorative Leaf - Right */}
          <motion.svg
            animate={{ rotate: [0, -3, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 md:w-20 h-auto text-[#8B6E4E] opacity-10 origin-bottom pointer-events-none"
            viewBox="0 0 100 200"
          >
            <path d="M50 200 C50 140 15 100 5 60 C-5 20 25 0 50 0 C75 0 105 20 95 60 C85 100 50 140 50 200 Z" fill="currentColor" />
            <line x1="50" y1="200" x2="50" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </motion.svg>

          {/* Content */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-block mb-5 px-5 py-1.5 rounded-full border border-[#C9BBA8] bg-white/40 backdrop-blur-sm">
              <span className="text-[#8B6E4E] font-bold uppercase tracking-[0.2em] text-[10px]">
                Bespoke Craftsmanship
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-playfair mb-4 text-[#3E2E1E] leading-tight">
              Can't Find Your <span className="italic text-[#6B7F59]">Perfect Piece</span>?
            </h2>

            {/* Leaf Divider */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9BBA8]"></div>
              <svg className="w-4 h-4 text-[#8B6E4E] opacity-50" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0 C4 6 4 14 10 20 C16 14 16 6 10 0 Z" />
              </svg>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9BBA8]"></div>
            </div>

            <p className="text-base md:text-lg text-[#6B6B6B] mb-8 font-inter max-w-xl mx-auto leading-relaxed">
              We offer bespoke design services. Let our artisans create a custom piece tailored specifically to your home and style.
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-[#3E2E1E] text-[#F4EFE9] rounded-full font-bold tracking-wide overflow-hidden transition-all duration-300 hover:bg-[#6B7F59] hover:scale-105 shadow-lg shadow-[#3E2E1E]/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Request Custom Order
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Bottom Wood Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F4EFE9] via-[#C9BBA8] to-[#F4EFE9]"></div>
        </motion.div>
      </section>
    </div>
  );
}
