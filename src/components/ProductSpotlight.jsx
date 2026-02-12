import React, { useState, useRef, useEffect, useCallback } from "react";
import products from "./data/products";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function ProductSpotlight() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const cardRefs = useRef([]);

  // Take spotlight products (keeping the user's preferred IDs)
  const spotlightProducts = products
    .filter((p) => [18, 17, 22, 24, 23, 21, 26].includes(p.id))
    .slice(0, 7);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Mobile: IntersectionObserver to activate card when scrolled into view
  const setCardRef = useCallback((el, index) => {
    cardRefs.current[index] = el;
  }, []);

  useEffect(() => {
    // Only apply on mobile (below lg breakpoint)
    if (window.innerWidth >= 1024) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5 } // Activate when 50% visible
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [spotlightProducts.length]);

  return (
    <section className="py-12 md:py-20 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <span className="text-[#6B7F59] font-bold uppercase tracking-[0.2em] text-[10px] mb-3 block">
            Artisan Series
          </span>
          <h2 className="text-3xl md:text-5xl font-playfair text-[#2C2C2C] mb-4">
            Spotlight Gallery
          </h2>
          <div className="w-16 h-1 bg-[#6B7F59]/20 mx-auto rounded-full"></div>
        </motion.div>

        {/* Horizontal Accordion Layout — No framer layout animations to avoid flicker */}
        <div className="relative flex flex-col lg:flex-row justify-center items-stretch gap-3 md:gap-4 h-auto lg:h-[450px]">
          {spotlightProducts.map((product, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={product.id}
                ref={(el) => setCardRef(el, index)}
                data-index={index}
                // Desktop: Hover to activate
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) {
                    setActiveIndex(index);
                  }
                }}
                onClick={() => handleProductClick(product)}
                className={`
                  relative cursor-pointer rounded-2xl overflow-hidden shadow-md group
                  transition-all duration-500 ease-in-out
                  ${isActive
                    ? "w-full lg:w-[450px] ring-1 ring-[#6B7F59]/20 h-[450px] md:h-[500px]"
                    : "w-full lg:w-[100px] opacity-80 hover:opacity-100 h-[120px]"
                  }
                  lg:h-full bg-white
                `}
              >
                {/* Background Image — plain div, no layout animations */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-110 group-hover:scale-105'}`}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Expanded Content Overlay — CSS transition instead of AnimatePresence */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7F59] font-bold text-[10px] uppercase tracking-widest bg-white/95 px-3 py-1 rounded-full shadow-sm">
                        ₹{product.price}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl md:text-3xl text-white font-playfair leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-white/80 text-sm font-inter mt-3 line-clamp-2 max-w-sm">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button className="flex items-center gap-2 bg-[#6B7F59] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#5A6C4A] transition-all transform hover:translate-x-1 shadow-lg">
                        Explore Details
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Collapsed Label (Vertical Text for Desktop Collapsed State) */}
                {!isActive && (
                  <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none">
                    <span className="rotate-90 text-white/40 font-playfair whitespace-nowrap text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {product.title}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 text-[#6B7F59] font-semibold hover:text-[#3E3832] transition-all duration-300 group"
          >
            <span className="border-b-2 border-transparent group-hover:border-[#6B7F59] pb-0.5">
              Browse Full Artisan Catalog
            </span>
            <div className="bg-[#6B7F59]/10 p-2 rounded-full group-hover:bg-[#6B7F59] group-hover:text-white transition-all">
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </motion.div>
      </div>

      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
