import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ReactLenis } from "lenis/react";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

// Featured Categories Card Component
const CategoryCard = ({ i, category, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="min-h-[70vh] flex items-center justify-center sticky top-16 px-4 md:px-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 30}px)`,
        }}
        className="relative h-[360px] md:h-[380px] w-[90%] md:w-[60%] max-w-4xl mx-auto rounded-2xl overflow-hidden bg-white shadow-xl origin-top border-[6px] md:border-[10px] border-white"
      >
        <div className="flex flex-col md:flex-row h-full">
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

          <div className="w-full md:w-[55%] h-full overflow-hidden relative">
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              <img
                src={category.featuredProduct.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) console.error('Error fetching category products:', error);
    else setProducts(data || []);
    setLoading(false);
  }

  const categoryList = [
    { id: "home-decor", name: "Home Decor" },
    { id: "wall-decor", name: "Wall Decor" },
    { id: "furniture", name: "Furniture" },
    { id: "kitchen-dining", name: "Kitchen & Dining" },
    { id: "tabletop-accents", name: "Tabletop & Accents" },
  ];

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
      <div
        ref={container}
        className="relative bg-[#FAF8F5] pt-6 pb-16 -mt-10"
      >
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

        <div className="relative pt-0">
          {loading ? (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-[#8B847C]">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p className="font-playfair italic">Organizing our collections...</p>
            </div>
          ) : (
            <>
              {/* =============== DECORATIONS =============== */}
              <motion.svg
                className="absolute top-[10%] left-[2%] w-20 h-20 text-[#6B7F59]/15 hidden lg:block pointer-events-none"
                viewBox="0 0 80 80"
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                {[0, 1, 2, 3].map(row =>
                  [0, 1, 2, 3].map(col => (
                    <circle key={`${row}-${col}`} cx={10 + col * 20} cy={10 + row * 20} r="3" fill="currentColor" />
                  ))
                )}
              </motion.svg>

              <motion.svg
                className="absolute top-[30%] left-[3%] w-24 h-24 text-[#D4C7B0]/20 hidden lg:block pointer-events-none"
                viewBox="0 0 100 100"
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

              <motion.svg
                className="absolute top-[12%] right-[2%] w-24 h-24 text-[#D4C7B0]/18 hidden lg:block pointer-events-none"
                viewBox="0 0 100 100"
                animate={{ y: [0, 12, 0], x: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <circle cx="20" cy="25" r="5" fill="currentColor" opacity="0.7" />
                <circle cx="50" cy="15" r="3" fill="currentColor" opacity="0.5" />
                <circle cx="75" cy="30" r="4" fill="currentColor" opacity="0.6" />
                <circle cx="35" cy="55" r="6" fill="currentColor" opacity="0.4" />
                <circle cx="65" cy="50" r="3.5" fill="currentColor" opacity="0.5" />
                <circle cx="80" cy="70" r="5" fill="currentColor" opacity="0.3" />
                <circle cx="25" cy="80" r="4" fill="currentColor" opacity="0.4" />
                <circle cx="55" cy="80" r="3" fill="currentColor" opacity="0.6" />
              </motion.svg>

              {featuredCategories.map((category, i) => {
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
            </>
          )}
        </div>
      </div>
    </ReactLenis>
  );
}
