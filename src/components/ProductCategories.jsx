import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ReactLenis } from "lenis/react";
import { supabase } from "../lib/supabase";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// Featured Categories Card Component
const CategoryCard = ({ i, category, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  // Image scale effect within the card
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  // Overall card scale effect as it scrolls
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      //   className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0"
      className="min-h-[70vh] flex items-center justify-center sticky top-16 px-4 md:px-0"

    >
      <motion.div
        style={{
          scale,
          //   top: `calc(10vh + ${i * 40}px)`, // Increased stacking offset for shorter cards
          top: `calc(5vh + ${i * 25}px)`,


        }}
        className="relative h-[420px] md:h-[380px] w-[92%] md:w-[60%] max-w-4xl mx-auto rounded-2xl overflow-hidden bg-white shadow-xl origin-top border-[6px] md:border-[10px] border-white"
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* Text Content */}
          <div className="w-full md:w-[45%] p-6 md:p-10 flex flex-col justify-center bg-[#FAF8F5]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-block px-3 py-1 bg-[#6B7F59] text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full">
                {category.name}
              </span>
            </motion.div>

            <h2 className="text-2xl md:text-3xl font-playfair text-[#2C2C2C] mb-4 leading-tight font-medium">
              {category.featuredProduct.title}
            </h2>

            <p className="hidden md:block text-[#6B6B6B] mb-6 font-inter leading-relaxed text-xs max-w-sm">
              Explore our handcrafted selection of {category.name.toLowerCase()} items, made with natural materials.
            </p>

            <Link
              to={`/shop?category=${category.id}`}
              className="inline-flex items-center gap-2 bg-[#3E3832] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6B7F59] transition-all w-fit group shadow-md text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              Explore
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-[55%] h-full overflow-hidden relative">
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              <img
                src={category.featuredProduct.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Subtle Overlay for 3D Depth */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function ProductCategories() {
  const container = useRef(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      if (!error && data) {
        setProducts(data);
      }
    }
    fetchProducts();
  }, []);

  // Define relevant categories (matching Shop.jsx logic)
  const categoryList = [
    { id: "home-decor", name: "Home Decor" },
    { id: "wall-decor", name: "Wall Decor" },
    { id: "furniture", name: "Furniture" },
    { id: "kitchen-dining", name: "Kitchen & Dining" },
    { id: "tabletop-accents", name: "Tabletop & Accents" },
  ];

  // Get one featured product for each category
  const featuredCategories = categoryList.map(cat => {
    const featuredProduct = products.find(p => p.category === cat.id);
    return {
      ...cat,
      featuredProduct
    };
  }).filter(item => item.featuredProduct);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      {/* <div 
        ref={container} 
              // className="relative bg-[#FAF8F5] py-16"
              className="relative bg-[#FAF8F5] pt-10 pb-16" */}
      <div
        ref={container}
        className="relative bg-[#FAF8F5] pt-6 pb-16 -mt-10"
      >





        {/* ================================================================= */}
        {/* MOBILE-ONLY BACKGROUND COSMETICS — block lg:hidden                */}
        {/* All animations use y/scale/rotate/opacity only — NO x animations  */}
        {/* to prevent horizontal scroll bleed on mobile                      */}
        {/* ================================================================= */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden block lg:hidden z-0">

          {/* ── Warm gradient orb — top right corner (inset, no x animate) ── */}
          <motion.div
            animate={{ y: [0, 15, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[220px] h-[220px] bg-[#6B7F59]/12 rounded-full blur-[70px]"
          />

          {/* ── Earthy warm orb — bottom left corner (inset, no x animate) ── */}
          <motion.div
            animate={{ y: [0, 20, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#8B6E4E]/10 rounded-full blur-[60px]"
          />

          {/* ── Amber glow — bottom right (inset safe) ── */}
          <motion.div
            animate={{ y: [0, -20, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-[180px] h-[180px] bg-[#C9A84C]/8 rounded-full blur-[50px]"
          />

          {/* ── Sage orb — top left (inset safe) ── */}
          <motion.div
            animate={{ y: [0, 10, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 left-0 w-[160px] h-[160px] bg-[#6B7F59]/8 rounded-full blur-[50px]"
          />

          {/* ── Subtle wood-grain texture overlay ── */}
          <div className="absolute inset-0 opacity-[0.25] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

          {/* ── TOP botanical branch — top left corner (scale only) ── */}
          <motion.svg
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[160px] h-[200px] opacity-[0.12] origin-top-left"
          >
            {/* Main stem */}
            <path d="M-5 -5 C10 30 20 70 30 110 C40 150 25 200 10 240" stroke="#5D4037" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Sub-branch right */}
            <path d="M18 60 C40 48 65 50 80 62" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Sub-branch right lower */}
            <path d="M28 130 C52 118 78 125 95 138" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            {/* Leaves on main branch */}
            <g transform="translate(8 40) rotate(-50)">
              <path d="M0 0 C-6 -10 -4 -22 0 -30 C4 -22 6 -10 0 0 Z" fill="#6B7F59" />
            </g>
            <g transform="translate(22 100) rotate(40)">
              <path d="M0 0 C-8 -12 -5 -26 0 -36 C5 -26 8 -12 0 0 Z" fill="#6B7F59" />
            </g>
            <g transform="translate(15 170) rotate(-45)">
              <path d="M0 0 C-6 -9 -4 -20 0 -28 C4 -20 6 -9 0 0 Z" fill="#6B7F59" />
            </g>
            {/* Leaves on sub-branches */}
            <g transform="translate(55 50) rotate(-20)">
              <path d="M0 0 C-5 -8 -3 -18 0 -24 C3 -18 5 -8 0 0 Z" fill="#8B6E4E" />
            </g>
            <g transform="translate(70 130) rotate(25)">
              <path d="M0 0 C-5 -8 -3 -18 0 -24 C3 -18 5 -8 0 0 Z" fill="#6B7F59" />
            </g>
            {/* Seed buds */}
            <circle cx="82" cy="62" r="2.5" fill="#5D4037" opacity="0.5" />
            <circle cx="96" cy="138" r="2" fill="#5D4037" opacity="0.4" />
          </motion.svg>

          {/* ── TOP right corner — decorative ring cluster (rotate only) ── */}
          <motion.svg
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute top-6 right-4 w-[80px] h-[80px] opacity-[0.18]"
            viewBox="0 0 90 90"
            style={{ transformOrigin: "40px 40px" }}
          >
            <circle cx="45" cy="45" r="38" fill="none" stroke="#C9A84C" strokeWidth="1" />
            <circle cx="45" cy="45" r="28" fill="none" stroke="#C9A84C" strokeWidth="0.8" strokeDasharray="4 5" />
            <circle cx="45" cy="45" r="16" fill="none" stroke="#6B7F59" strokeWidth="0.8" />
            <circle cx="45" cy="7" r="3" fill="#C9A84C" opacity="0.6" />
          </motion.svg>

          {/* ── Scattered dot pattern — upper mid area (y only) ── */}
          <motion.svg
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[12%] left-[35%] w-20 h-20 opacity-[0.15]"
            viewBox="0 0 100 100"
          >
            <circle cx="15" cy="20" r="4" fill="#6B7F59" />
            <circle cx="50" cy="10" r="3" fill="#8B6E4E" />
            <circle cx="80" cy="30" r="5" fill="#6B7F59" />
            <circle cx="30" cy="60" r="3.5" fill="#C9A84C" />
            <circle cx="70" cy="55" r="4" fill="#8B6E4E" />
            <circle cx="55" cy="80" r="3" fill="#6B7F59" />
          </motion.svg>

          {/* ── BOTTOM right botanical sprig (rotate only, NO x animate) ── */}
          <motion.svg
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 right-2 w-[100px] h-[130px] opacity-[0.10]"
            viewBox="0 0 120 150"
            style={{ transformOrigin: "60px 75px" }}
          >
            {/* Stem */}
            <path d="M60 150 Q58 110 55 80 Q52 50 60 10" fill="none" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" />
            {/* Leaves */}
            <g transform="translate(48 30) rotate(-40)">
              <path d="M0 0 C-8 -12 -5 -26 0 -36 C5 -26 8 -12 0 0 Z" fill="#6B7F59" />
            </g>
            <g transform="translate(65 55) rotate(35)">
              <path d="M0 0 C-7 -10 -4 -22 0 -30 C4 -22 7 -10 0 0 Z" fill="#6B7F59" />
            </g>
            <g transform="translate(45 80) rotate(-30)">
              <path d="M0 0 C-6 -9 -4 -20 0 -28 C4 -20 6 -9 0 0 Z" fill="#8B6E4E" />
            </g>
            <g transform="translate(65 105) rotate(25)">
              <path d="M0 0 C-6 -9 -4 -20 0 -28 C4 -20 6 -9 0 0 Z" fill="#6B7F59" />
            </g>
            {/* Small bud */}
            <circle cx="60" cy="8" r="2.5" fill="#5D4037" opacity="0.45" />
          </motion.svg>

          {/* ── BOTTOM left diamond accent (rotate + y only) ── */}
          <motion.svg
            animate={{ rotate: [0, 90, 180, 270, 360], y: [0, -8, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 left-5 w-12 h-12 opacity-[0.18]"
            viewBox="0 0 60 60"
            style={{ transformOrigin: "30px 30px" }}
          >
            <rect x="15" y="15" width="30" height="30" rx="4" fill="#C17F59" opacity="0.4" transform="rotate(45 30 30)" />
            <rect x="22" y="22" width="16" height="16" rx="2" fill="#C17F59" opacity="0.2" transform="rotate(45 30 30)" />
          </motion.svg>

          {/* ── Bottom center wavy amber line (opacity only, NO x animate) ── */}
          <motion.svg
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-4 left-[5%] w-[90%] h-10"
            viewBox="0 0 300 40"
          >
            <path d="M0 20 Q37 5 75 20 Q112 35 150 20 Q187 5 225 20 Q262 35 300 20" fill="none" stroke="#D4A574" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <path d="M0 30 Q37 15 75 30 Q112 45 150 30 Q187 15 225 30 Q262 45 300 30" fill="none" stroke="#D4A574" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
          </motion.svg>

          {/* ── Top center horizontal dots row (opacity only) ── */}
          <motion.svg
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[7%] left-[15%] w-[70%] h-4"
            viewBox="0 0 200 16"
          >
            {[0,1,2,3,4,5,6,7,8].map(i => (
              <circle key={i} cx={12 + i * 22} cy="8" r="2.5" fill="#6B7F59" opacity={0.3 + (i % 3) * 0.1} />
            ))}
          </motion.svg>

        </div>

        {/* Section Header */}
        <div className="max-w-3xl mx-auto px-6 text-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles size={16} className="text-[#6B7F59]" />
            <span className="text-[#6B7F59] font-bold uppercase tracking-[0.3em] text-[10px]">
              Earthy Aesthetics
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-6xl font-playfair text-[#2C2C2C] mb-6"
          >
            Our Collections
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#6B6B6B] italic font-inter text-sm md:text-base"
          >
            Scroll down to explore each curated category
          </motion.p>
        </div>

        {/* Stacking Cards List with animated SVG decorations */}
        <div className="relative pt-0">

          {/* =============================================================== */}
          {/* MOBILE-ONLY DECORATIONS (block lg:hidden)                       */}
          {/* These replace the desktop decorations that are all hidden lg:block */}
          {/* =============================================================== */}

          {/* Large centered gold triple ring — safe size, scale/opacity only (no rotate = no diagonal overflow) */}
          <motion.svg
            className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[200px] h-[200px] text-[#C9A84C]/20 block lg:hidden pointer-events-none z-0"
            viewBox="0 0 70 70"
            animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="35" cy="35" r="32" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.8" />
            <circle cx="35" cy="35" r="26" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" strokeDasharray="4 6" />
            <circle cx="35" cy="35" r="19" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
            <circle cx="35" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            <circle cx="35" cy="35" r="5" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
          </motion.svg>

          {/* Top-left dot cluster — y only, no x */}
          <motion.svg
            className="absolute top-[5%] left-[2%] w-16 h-16 text-[#D4C7B0]/25 block lg:hidden pointer-events-none z-0"
            viewBox="0 0 80 80"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* 3x3 dot grid */}
            {[0, 1, 2].map(row =>
              [0, 1, 2].map(col => (
                <circle key={`${row}-${col}`} cx={12 + col * 22} cy={12 + row * 22} r="3" fill="currentColor" />
              ))
            )}
          </motion.svg>

          {/* Top-right scattered dots — y only, no x */}
          <motion.svg
            className="absolute top-[8%] right-[2%] w-16 h-16 text-[#D4C7B0]/20 block lg:hidden pointer-events-none z-0"
            viewBox="0 0 100 100"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="20" cy="25" r="5" fill="currentColor" opacity="0.7" />
            <circle cx="55" cy="15" r="3" fill="currentColor" opacity="0.5" />
            <circle cx="80" cy="35" r="4" fill="currentColor" opacity="0.6" />
            <circle cx="40" cy="60" r="6" fill="currentColor" opacity="0.35" />
            <circle cx="70" cy="55" r="3" fill="currentColor" opacity="0.4" />
          </motion.svg>

          {/* Left leaf branch — rotate only, no x, explicit transformOrigin */}
          <motion.svg
            className="absolute top-[30%] left-[0%] w-20 h-20 text-[#6B7F59]/10 block lg:hidden pointer-events-none z-0"
            viewBox="0 0 120 120"
            style={{ transformOrigin: "60px 60px" }}
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Stem */}
            <path d="M60 110 Q55 80 50 50 Q48 30 55 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Left leaves */}
            <ellipse cx="38" cy="35" rx="14" ry="7" transform="rotate(-35 38 35)" fill="currentColor" opacity="0.6" />
            <ellipse cx="42" cy="60" rx="12" ry="6" transform="rotate(-40 42 60)" fill="currentColor" opacity="0.5" />
            {/* Right leaves */}
            <ellipse cx="65" cy="25" rx="13" ry="6" transform="rotate(30 65 25)" fill="currentColor" opacity="0.5" />
            <ellipse cx="62" cy="48" rx="11" ry="5.5" transform="rotate(35 62 48)" fill="currentColor" opacity="0.4" />
          </motion.svg>

          {/* Right wavy amber lines — opacity only, no x */}
          <motion.svg
            className="absolute top-[45%] right-[0%] w-16 h-12 block lg:hidden pointer-events-none z-0"
            viewBox="0 0 100 60"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M5 15 Q25 5 45 15 Q65 25 85 15" fill="none" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
            <path d="M5 30 Q25 20 45 30 Q65 40 85 30" fill="none" stroke="#D4A574" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
            <path d="M5 45 Q25 35 45 45 Q65 55 85 45" fill="none" stroke="#D4A574" strokeWidth="1" strokeLinecap="round" opacity="0.18" />
          </motion.svg>

          {/* Bottom-left pulsing concentric rings */}
          <motion.svg
            className="absolute top-[75%] left-[3%] w-14 h-14 text-[#D4C7B0]/20 block lg:hidden pointer-events-none z-0"
            viewBox="0 0 60 60"
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="30" cy="30" r="17" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </motion.svg>

          {/* Bottom-right spiral — explicit transformOrigin to avoid overflow */}
          <motion.svg
            className="absolute top-[80%] right-[4%] w-16 h-16 text-[#6B7F59]/12 block lg:hidden pointer-events-none z-0"
            viewBox="0 0 100 100"
            style={{ transformOrigin: "32px 32px" }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <path
              d="M50 50 C50 40, 60 35, 65 45 C70 55, 60 65, 50 60 C40 55, 35 45, 45 38 C55 31, 70 40, 72 52 C74 65, 58 75, 45 70 C32 65, 28 48, 38 35 C48 22, 72 28, 78 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.svg>

          {/* Sage green star - explicit transformOrigin so rotate stays in bounds */}
          <motion.svg
            className="absolute top-[60%] right-[2%] w-12 h-12 block lg:hidden pointer-events-none z-0"
            viewBox="0 0 60 60"
            style={{ transformOrigin: "24px 24px" }}
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z" fill="#6B7F59" opacity="0.15" />
          </motion.svg>

          {/* =============== LEFT SIDE DECORATIONS =============== */}

          {/* Dot Grid - top left, slow floating animation */}
          <motion.svg
            className="absolute top-[10%] left-[2%] w-20 h-20 text-[#6B7F59]/15 hidden lg:block pointer-events-none"
            viewBox="0 0 80 80"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* 4x4 grid of small circles */}
            {[0, 1, 2, 3].map(row =>
              [0, 1, 2, 3].map(col => (
                <circle key={`${row}-${col}`} cx={10 + col * 20} cy={10 + row * 20} r="3" fill="currentColor" />
              ))
            )}
          </motion.svg>

          {/* Spiral - mid left, slow rotation */}
          <motion.svg
            className="absolute top-[30%] left-[3%] w-24 h-24 text-[#D4C7B0]/20 hidden lg:block pointer-events-none"
            viewBox="0 0 100 100"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {/* Spiral path */}
            <path
              d="M50 50 C50 40, 60 35, 65 45 C70 55, 60 65, 50 60 C40 55, 35 45, 45 38 C55 31, 70 40, 72 52 C74 65, 58 75, 45 70 C32 65, 28 48, 38 35 C48 22, 72 28, 78 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.svg>

          {/* Leaf Branch - lower left, gentle sway */}
          <motion.svg
            className="absolute top-[55%] left-[1%] w-28 h-28 text-[#6B7F59]/12 hidden lg:block pointer-events-none"
            viewBox="0 0 120 120"
            animate={{ rotate: [-5, 5, -5], x: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Stem */}
            <path d="M60 110 Q55 80 50 50 Q48 30 55 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Left leaves */}
            <ellipse cx="38" cy="35" rx="14" ry="7" transform="rotate(-35 38 35)" fill="currentColor" opacity="0.6" />
            <ellipse cx="42" cy="60" rx="12" ry="6" transform="rotate(-40 42 60)" fill="currentColor" opacity="0.5" />
            <ellipse cx="45" cy="82" rx="10" ry="5" transform="rotate(-30 45 82)" fill="currentColor" opacity="0.4" />
            {/* Right leaves */}
            <ellipse cx="65" cy="25" rx="13" ry="6" transform="rotate(30 65 25)" fill="currentColor" opacity="0.5" />
            <ellipse cx="62" cy="48" rx="11" ry="5.5" transform="rotate(35 62 48)" fill="currentColor" opacity="0.4" />
            <ellipse cx="58" cy="72" rx="10" ry="5" transform="rotate(25 58 72)" fill="currentColor" opacity="0.3" />
          </motion.svg>

          {/* Circle Ring - bottom left, pulsing */}
          <motion.svg
            className="absolute top-[78%] left-[4%] w-16 h-16 text-[#D4C7B0]/15 hidden lg:block pointer-events-none"
            viewBox="0 0 60 60"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="30" cy="30" r="17" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </motion.svg>

          {/* =============== RIGHT SIDE DECORATIONS =============== */}

          {/* Dot Cluster - top right, gentle drift */}
          <motion.svg
            className="absolute top-[12%] right-[2%] w-24 h-24 text-[#D4C7B0]/18 hidden lg:block pointer-events-none"
            viewBox="0 0 100 100"
            animate={{ y: [0, 12, 0], x: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Scattered dots of varying sizes */}
            <circle cx="20" cy="25" r="5" fill="currentColor" opacity="0.7" />
            <circle cx="50" cy="15" r="3" fill="currentColor" opacity="0.5" />
            <circle cx="75" cy="30" r="4" fill="currentColor" opacity="0.6" />
            <circle cx="35" cy="55" r="6" fill="currentColor" opacity="0.4" />
            <circle cx="65" cy="50" r="3.5" fill="currentColor" opacity="0.5" />
            <circle cx="80" cy="70" r="5" fill="currentColor" opacity="0.3" />
            <circle cx="25" cy="80" r="4" fill="currentColor" opacity="0.4" />
            <circle cx="55" cy="80" r="3" fill="currentColor" opacity="0.6" />
          </motion.svg>

          {/* Spiral - mid right, reverse slow rotation */}
          <motion.svg
            className="absolute top-[38%] right-[3%] w-20 h-20 text-[#6B7F59]/15 hidden lg:block pointer-events-none"
            viewBox="0 0 80 80"
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <path
              d="M40 40 C40 33, 47 28, 52 36 C57 44, 48 52, 40 48 C32 44, 28 36, 36 30 C44 24, 56 32, 58 42 C60 52, 46 60, 36 56 C26 52, 22 38, 32 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.svg>

          {/* Tangle / Abstract Lines - lower right, swaying */}
          <motion.svg
            className="absolute top-[60%] right-[1%] w-28 h-28 text-[#6B7F59]/10 hidden lg:block pointer-events-none"
            viewBox="0 0 120 120"
            animate={{ rotate: [3, -3, 3], y: [0, -8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Intertwined curved lines - tangle effect */}
            <path d="M20 100 Q40 60 30 30 Q25 10 50 15 Q75 20 60 50 Q45 80 70 90 Q95 100 100 70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 80 Q35 50 55 40 Q75 30 85 55 Q95 80 75 95 Q55 110 40 85" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d="M30 95 Q50 70 45 45 Q40 20 65 25 Q90 30 80 60" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
          </motion.svg>

          {/* Small Dot Ring - bottom right, pulsing */}
          <motion.svg
            className="absolute top-[82%] right-[5%] w-14 h-14 text-[#D4C7B0]/20 hidden lg:block pointer-events-none"
            viewBox="0 0 60 60"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Ring of dots */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <circle
                key={angle}
                cx={30 + 20 * Math.cos((angle * Math.PI) / 180)}
                cy={30 + 20 * Math.sin((angle * Math.PI) / 180)}
                r="2.5"
                fill="currentColor"
              />
            ))}
          </motion.svg>

          {/* =============== ADDITIONAL COLORED DECORATIONS - LEFT =============== */}

          {/* Terracotta Diamond - left side, rotating float */}
          <motion.svg
            className="absolute top-[20%] left-[5%] w-14 h-14 hidden lg:block pointer-events-none"
            viewBox="0 0 60 60"
            animate={{ rotate: [0, 90, 180, 270, 360], y: [0, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="15" y="15" width="30" height="30" rx="4" fill="#C17F59" opacity="0.25" transform="rotate(45 30 30)" />
            <rect x="20" y="20" width="20" height="20" rx="2" fill="#C17F59" opacity="0.15" transform="rotate(45 30 30)" />
          </motion.svg>

          {/* Amber Wavy Lines - left mid, gentle sway */}
          <motion.svg
            className="absolute top-[42%] left-[4%] w-24 h-16 hidden lg:block pointer-events-none"
            viewBox="0 0 100 60"
            animate={{ x: [0, 8, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M5 15 Q25 5 45 15 Q65 25 85 15" fill="none" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            <path d="M5 30 Q25 20 45 30 Q65 40 85 30" fill="none" stroke="#D4A574" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
            <path d="M5 45 Q25 35 45 45 Q65 55 85 45" fill="none" stroke="#D4A574" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
          </motion.svg>

          {/* Sage Green Cross Star - left lower-mid, pulsing */}
          <motion.svg
            className="absolute top-[65%] left-[6%] w-16 h-16 hidden lg:block pointer-events-none"
            viewBox="0 0 60 60"
            animate={{ scale: [0.9, 1.1, 0.9], rotate: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* 4-pointed star shape */}
            <path d="M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z" fill="#6B7F59" opacity="0.2" />
            <path d="M30 15 L33 27 L45 30 L33 33 L30 45 L27 33 L15 30 L27 27 Z" fill="#6B7F59" opacity="0.12" />
          </motion.svg>

          {/* Coral Scattered Dots - left bottom area, drifting */}
          <motion.svg
            className="absolute top-[88%] left-[2%] w-20 h-20 hidden lg:block pointer-events-none"
            viewBox="0 0 80 80"
            animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="15" cy="20" r="4" fill="#E8927C" opacity="0.35" />
            <circle cx="40" cy="10" r="3" fill="#E8927C" opacity="0.25" />
            <circle cx="60" cy="30" r="5" fill="#E8927C" opacity="0.2" />
            <circle cx="25" cy="50" r="3.5" fill="#E8927C" opacity="0.3" />
            <circle cx="55" cy="55" r="4" fill="#E8927C" opacity="0.2" />
            <circle cx="70" cy="65" r="3" fill="#E8927C" opacity="0.25" />
          </motion.svg>

          {/* Olive Gold Hexagon - left side, slow spin */}
          <motion.svg
            className="absolute top-[48%] left-[1%] w-16 h-16 hidden lg:block pointer-events-none"
            viewBox="0 0 60 60"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <polygon points="30,5 52,17 52,42 30,55 8,42 8,17" fill="none" stroke="#8B7D3C" strokeWidth="1.5" opacity="0.2" />
            <polygon points="30,15 42,22 42,38 30,45 18,38 18,22" fill="none" stroke="#8B7D3C" strokeWidth="1" opacity="0.15" />
          </motion.svg>

          {/* =============== ADDITIONAL COLORED DECORATIONS - RIGHT =============== */}

          {/* Burnt Orange Flower - right top, blooming pulse */}
          <motion.svg
            className="absolute top-[5%] right-[4%] w-20 h-20 hidden lg:block pointer-events-none"
            viewBox="0 0 80 80"
            animate={{ scale: [0.85, 1.05, 0.85], rotate: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Flower petals arranged in a circle */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <ellipse
                key={angle}
                cx="40"
                cy="20"
                rx="8"
                ry="15"
                fill="#C17F59"
                opacity="0.2"
                transform={`rotate(${angle} 40 40)`}
              />
            ))}
            {/* Center dot */}
            <circle cx="40" cy="40" r="6" fill="#D4A574" opacity="0.3" />
          </motion.svg>

          {/* Teal Zigzag - right mid-top, sliding */}
          <motion.svg
            className="absolute top-[25%] right-[5%] w-20 h-20 hidden lg:block pointer-events-none"
            viewBox="0 0 80 80"
            animate={{ y: [0, 10, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <polyline points="10,20 25,10 40,20 55,10 70,20" fill="none" stroke="#5A8A7A" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
            <polyline points="10,40 25,30 40,40 55,30 70,40" fill="none" stroke="#5A8A7A" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
            <polyline points="10,60 25,50 40,60 55,50 70,60" fill="none" stroke="#5A8A7A" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
          </motion.svg>

          {/* Warm Gold Triple Ring - right center, orbiting */}
          <motion.svg
            className="absolute top-[50%] right-[4%] w-18 h-18 hidden lg:block pointer-events-none"
            viewBox="0 0 70 70"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="35" cy="35" r="28" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.2" />
            <circle cx="35" cy="35" r="20" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.15" strokeDasharray="4 6" />
            <circle cx="35" cy="35" r="12" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.25" />
            <circle cx="35" cy="7" r="3" fill="#C9A84C" opacity="0.3" />
          </motion.svg>

          {/* Earthy Red Abstract Curves - right lower, swaying */}
          <motion.svg
            className="absolute top-[70%] right-[2%] w-24 h-24 hidden lg:block pointer-events-none"
            viewBox="0 0 100 100"
            animate={{ rotate: [-4, 4, -4], x: [0, -6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M20 80 Q30 40 50 50 Q70 60 80 20" fill="none" stroke="#B5634B" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
            <path d="M15 90 Q40 50 60 55 Q80 60 90 30" fill="none" stroke="#B5634B" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
            <circle cx="50" cy="50" r="4" fill="#B5634B" opacity="0.2" />
            <circle cx="80" cy="20" r="3" fill="#B5634B" opacity="0.25" />
          </motion.svg>

          {/* Moss Green Plus Signs - right bottom, floating */}
          <motion.svg
            className="absolute top-[90%] right-[3%] w-20 h-20 hidden lg:block pointer-events-none"
            viewBox="0 0 80 80"
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Plus sign 1 */}
            <line x1="20" y1="15" x2="20" y2="35" stroke="#4A6741" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
            <line x1="10" y1="25" x2="30" y2="25" stroke="#4A6741" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
            {/* Plus sign 2 */}
            <line x1="55" y1="40" x2="55" y2="56" stroke="#4A6741" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
            <line x1="47" y1="48" x2="63" y2="48" stroke="#4A6741" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
            {/* Plus sign 3 */}
            <line x1="30" y1="58" x2="30" y2="72" stroke="#4A6741" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />
            <line x1="23" y1="65" x2="37" y2="65" stroke="#4A6741" strokeWidth="1.5" strokeLinecap="round" opacity="0.15" />
          </motion.svg>

          {/* Category Cards */}
          {featuredCategories.map((category, i) => {
            // Calculate scale and scroll range for each card
            const targetScale = 1 - (featuredCategories.length - i) * 0.04;
            const startRange = i * (1 / (featuredCategories.length + 1));

            return (
              <CategoryCard
                key={category.id}
                i={i}
                category={category}
                progress={scrollYProgress}
                range={[startRange, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>

        {/* Bottom CTA */}
        {/* <div className="relative h-[40vh] flex flex-col items-center justify-center bg-white z-[60] rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
          <h3 className="text-3xl md:text-4xl font-playfair text-[#2C2C2C] mb-8 text-center px-6">
            Ready to browse our full collection?
          </h3>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 bg-[#2C2C2C] text-white px-12 py-5 rounded-2xl font-bold hover:bg-[#3E3832] transition-all transform hover:-translate-y-1 shadow-2xl group"
          >
            Shop All Products
            <ArrowRight size={24} className="transition-transform group-hover:translate-x-1" />
          </Link> */}
        {/* </div> */}
      </div>
    </ReactLenis>
  );
}