import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ReactLenis } from "lenis/react";
import products from "./data/products";
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
           top: `calc(-5vh + ${i * 30}px)`,


        }}
        className="relative h-[360px] md:h-[380px] w-[90%] md:w-[60%] max-w-4xl mx-auto rounded-2xl overflow-hidden bg-white shadow-xl origin-top border-[6px] md:border-[10px] border-white"
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
            className="text-4xl md:text-6xl font-playfair text-[#2C2C2C] mb-6"
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

        {/* Stacking Cards List */}
        <div className="relative pt-0">
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
