import React, { useState } from "react";
import products from "./data/products";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export function ProductSpotlight() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  // Take spotlight products (keeping the user's preferred IDs)
  const spotlightProducts = products
    .filter((p) => [18,17, 22, 24, 28, 23, 21,26].includes(p.id))
    .slice(0, 8); // Increased to 5 for a better accordion effect if data allows

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

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

        {/* Horizontal Accordion Layout */}
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-3 md:gap-4 h-auto lg:h-[450px]">
          {spotlightProducts.map((product, index) => {
            const isActive = activeIndex === index;
            
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  layout: { type: "spring", stiffness: 300, damping: 30 }
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleProductClick(product)}
                className={`
                  relative cursor-pointer rounded-2xl overflow-hidden shadow-md group
                  transition-all duration-500 ease-in-out
                  ${isActive 
                    ? "w-full lg:w-[450px] ring-1 ring-[#6B7F59]/20" 
                    : "w-full lg:w-[100px] opacity-80 hover:opacity-100"
                  }
                  h-[300px] lg:h-full bg-white
                `}
              >
                {/* Background Image */}
                <motion.div 
                  className="absolute inset-0 w-full h-full"
                  layoutId={`img-container-${product.id}`}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-110 group-hover:scale-105'}`}
                  />
                  <div className={`absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500`} />
                </motion.div>

                {/* Expanded Content Overlay */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
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
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed Label (Optional Vertical Text for Collapsed State) */}
                {!isActive && (
                  <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none">
                    <span className="rotate-90 text-white/40 font-playfair whitespace-nowrap text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {product.title}
                    </span>
                  </div>
                )}
              </motion.div>
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
