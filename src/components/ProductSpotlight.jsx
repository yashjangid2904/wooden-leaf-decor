
import React, { useState } from "react";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import localProducts from "./data/products";

export function ProductSpotlight() {
  // Using local product data — first 7 items for spotlight
  const [products] = useState(localProducts.slice(0, 7));
  const [loading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const spotlightProducts = products;

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

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* MOBILE LAYOUT: Hero Card + 2-Column Grid (visible only < md)  */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <div className="md:hidden">
          {loading ? (
            /* Loading state for mobile */
            <div className="w-full flex flex-col items-center justify-center py-20 text-[#8B847C]">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p className="font-playfair italic">Curating your artisan gallery...</p>
            </div>
          ) : spotlightProducts.length === 0 ? (
            /* Empty state for mobile */
            <div className="w-full text-center py-20 text-[#8B847C]">
              <p>No products available in spotlight.</p>
            </div>
          ) : (
            <>
              {/* ── Hero Card: first product, full-width, tall ── */}
              {spotlightProducts[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  onClick={() => handleProductClick(spotlightProducts[0])}
                  className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg mb-3 h-[300px]"
                >
                  {/* Hero background image */}
                  <img
                    src={spotlightProducts[0].image}
                    alt={spotlightProducts[0].title}
                    className="w-full h-full object-cover scale-105"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Hero content — price badge + title + CTA */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    {/* Price badge */}
                    <span className="inline-block self-start text-[#6B7F59] font-bold text-[10px] uppercase tracking-widest bg-white/95 px-3 py-1 rounded-full shadow-sm mb-3">
                      ₹{spotlightProducts[0].price}
                    </span>

                    {/* Product title */}
                    <h3 className="text-2xl text-white font-playfair leading-tight mb-1">
                      {spotlightProducts[0].title}
                    </h3>

                    {/* Short description */}
                    <p className="text-white/75 text-xs line-clamp-2 mb-4">
                      {spotlightProducts[0].description}
                    </p>

                    {/* CTA button */}
                    <button className="self-start flex items-center gap-2 bg-[#6B7F59] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-lg active:scale-95 transition-transform">
                      Explore Details
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* "Featured" label in top-right corner */}
                  <div className="absolute top-4 right-4 bg-[#6B7F59] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow">
                    Featured
                  </div>
                </motion.div>
              )}

              {/* ── 2-Column Grid: remaining products ── */}
              {spotlightProducts.length > 1 && (
                <div className="grid grid-cols-2 gap-3">
                  {spotlightProducts.slice(1).map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      onClick={() => handleProductClick(product)}
                      className="relative cursor-pointer rounded-xl overflow-hidden shadow-md h-[160px] group active:scale-95 transition-transform"
                    >
                      {/* Grid card background image */}
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-active:scale-105 transition-transform duration-300"
                      />

                      {/* Gradient overlay always visible at bottom for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* Price badge top-left */}
                      <span className="absolute top-2 left-2 text-[#6B7F59] font-bold text-[9px] uppercase tracking-widest bg-white/95 px-2 py-0.5 rounded-full shadow-sm">
                        ₹{product.price}
                      </span>

                      {/* Product title at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-xs font-playfair leading-tight line-clamp-2">
                          {product.title}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────────── */}
        {/* DESKTOP/TABLET LAYOUT: Horizontal Accordion (md and above only)    */}
        {/* ─────────────────────────────────────────────────────────────────── */}
        <div className="relative hidden md:flex flex-col lg:flex-row justify-center items-stretch gap-3 md:gap-4 h-auto lg:h-[450px]">
          {loading ? (
            <div className="w-full flex flex-col items-center justify-center py-20 text-[#8B847C]">
              <Loader2 className="animate-spin mb-4" size={32} />
              <p className="font-playfair italic">Curating your artisan gallery...</p>
            </div>
          ) : spotlightProducts.length === 0 ? (
             <div className="w-full text-center py-20 text-[#8B847C]">
                <p>No products available in spotlight.</p>
             </div>
          ) : (
            spotlightProducts.map((product, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={product.id}
                // Desktop: Hover to activate
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) {
                    setActiveIndex(index);
                  }
                }}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    if (!isActive) {
                      setActiveIndex(index);
                    } else {
                      handleProductClick(product);
                    }
                  } else {
                    handleProductClick(product);
                  }
                }}
                className={`
                  relative cursor-pointer rounded-2xl overflow-hidden shadow-md group
                  transition-all duration-500 ease-in-out
                  ${
                    isActive
                      ? "w-full lg:w-[450px] ring-1 ring-[#6B7F59]/20 h-[450px] md:h-[500px]"
                      : "w-full lg:w-[100px] opacity-80 hover:opacity-100 h-[120px]"
                  }
                  lg:h-full bg-white border border-[#E6E1D6]/30
                `}
              >
                {/* Background Image — plain div, no layout animations */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? "scale-105" : "scale-110 group-hover:scale-105"}`}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Expanded Content Overlay — CSS transition instead of AnimatePresence */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
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
          })
        )}
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
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
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