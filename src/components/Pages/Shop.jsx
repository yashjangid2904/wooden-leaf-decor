import { useState } from "react";
import { SlidersHorizontal, Search, X, Check } from "lucide-react";
import { ProductDetailsModal } from "../ProductDetailsModal";
import { Footer } from "../Footer";
import products from "../data/products";
import { motion, AnimatePresence } from "motion/react";

// --- Enhanced Wood Card Component ---
const WoodProductCard = ({ image, title, price, badge, category, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group cursor-pointer relative bg-[#FAF8F5] rounded-t-full rounded-b-[1.5rem] overflow-hidden border border-[#E6E1D6] hover:border-[#6B7F59]/30 hover:shadow-[0_10px_30px_rgba(107,127,89,0.15)] transition-all duration-500"
    >
      {/* Wood Texture Overlay (Subtle noise) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

      {/* Image Container with Arch */}
      <div className="relative aspect-[4/5] overflow-hidden m-1.5 rounded-t-full rounded-b-[1.2rem]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#6B7F59] text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full shadow-sm z-10 border border-[#6B7F59]/10">
            {badge}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white/90 backdrop-blur text-[#2C2C2C] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
            View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 pt-2 text-center relative z-10">
        <p className="text-[9px] text-[#6B7F59] uppercase tracking-widest font-bold mb-1 opacity-80">{category}</p>
        <h3 className="font-playfair text-base text-[#2C2C2C] leading-tight mb-1.5 group-hover:text-[#6B7F59] transition-colors duration-300 line-clamp-1">
          {title}
        </h3>
        <p className="font-inter font-medium text-sm text-[#8B6E4E]">₹{Number(price).toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const categories = [
    { id: "all", name: "All Collection" },
    { id: "home-decor", name: "Home Decor" },
    { id: "decorative-accents", name: "Decorative Accents" },
    { id: "wall-decor", name: "Wall Decor" },
    { id: "wall-shelves", name: "Shelves & Hooks" },
    { id: "tabletop-accents", name: "Tabletop Accents" },
    { id: "furniture", name: "Furniture" },
    { id: "kitchen-dining", name: "Kitchen & Dining" },
    { id: "planters-stands", name: "Planters & Stands" },
    { id: "lighting", name: "Lighting" },
    { id: "gift-sets", name: "Gift Sets" },
    { id: "pouffes", name: "Pouffes" },
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under-50", name: "Under ₹50" },
    { id: "50-100", name: "₹50 - ₹100" },
    { id: "100-200", name: "₹100 - ₹200" },
    { id: "over-200", name: "Over ₹200" },
  ];

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" || product.category === selectedCategory;

    let priceMatch = true;
    if (priceRange === "under-50") priceMatch = product.price < 50;
    else if (priceRange === "50-100")
      priceMatch = product.price >= 50 && product.price <= 100;
    else if (priceRange === "100-200")
      priceMatch = product.price > 100 && product.price <= 200;
    else if (priceRange === "over-200") priceMatch = product.price > 200;

    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative overflow-hidden">

      {/* --- Background SVG Decor Elements --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top Left Leaves */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 1 }}
          className="absolute -top-20 -left-20 w-[400px] h-[400px] text-[#6B7F59]"
          viewBox="0 0 100 100"
        >
          <path d="M50 50 Q40 20 10 10 T50 50" fill="currentColor" />
          <path d="M50 50 Q80 20 90 10 T50 50" fill="currentColor" transform="rotate(20 50 50)" />
          <path d="M50 50 Q20 80 10 90 T50 50" fill="currentColor" transform="rotate(-10 50 50)" />
        </motion.svg>



        {/* Bottom Left Geometric */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 -left-10 w-64 h-64 bg-[#C17F59]/5 rounded-full blur-3xl"
        />
      </div>

      {/* --- Main Layout Container --- */}
      <div className="flex h-screen pt-20"> {/* PT-20 to clear fixed navbar approx height */}

        {/* --- Fixed Sidebar (Left) - Wooden Theme --- */}
        <aside className={`
            fixed top-20 left-0 bottom-0 w-72 z-20
            bg-[#F4EFE9] border-r border-[#E6E1D6]
            transform transition-transform duration-300 ease-in-out
            ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        `}>
          {/* Wood Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

          {/* Decorative Corner SVG - Top Left */}
          <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-20 z-0 text-[#8B6E4E]">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M0 0 L100 0 Q50 0 0 50 Z" />
              <path d="M0 0 L0 100 Q0 50 50 0 Z" />
            </svg>
          </div>

          {/* Decorative Corner SVG - Bottom Right */}
          <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-10 z-0 text-[#6B7F59] rotate-180">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M0 0 C30 10 50 30 60 60 C70 90 90 100 100 100 L0 100 Z" />
            </svg>
          </div>

          {/* Mobile Close Button */}
          <div className="lg:hidden p-4 flex justify-end relative z-10">
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-[#5D4037] hover:bg-[#E6E1D6] rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Filter Content - Hidden Scrollbar */}
          <div className="flex-1 overflow-y-auto p-8 space-y-10 [&::-webkit-scrollbar]:hidden relative z-10">
            {/* Categories */}
            <div className="">
              <h3 className="font-playfair text-xl text-[#5D4037] mb-6 flex items-center gap-3 border-b border-[#D4C7B0] pb-3">
                <SlidersHorizontal size={18} className="text-[#6B7F59]" />
                Categories
              </h3>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsMobileFiltersOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-300 text-sm flex items-center justify-between group ${selectedCategory === cat.id
                      ? "bg-[#6B7F59] text-white shadow-md font-medium tracking-wide"
                      : "text-[#8B847C] hover:bg-[#E6E1D6]/50 hover:text-[#5D4037] hover:pl-6"
                      }`}
                  >
                    {cat.name}
                    {selectedCategory === cat.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="">
              <h3 className="font-playfair text-xl text-[#5D4037] mb-6 border-b border-[#D4C7B0] pb-3">Price Range</h3>
              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => {
                      setPriceRange(range.id);
                      setIsMobileFiltersOpen(false);
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-300 text-sm border flex items-center justify-between group ${priceRange === range.id
                      ? "bg-[#5D4037] text-white border-[#5D4037] shadow-md"
                      : "bg-[#FAF8F5] border-[#E6E1D6] text-[#8B847C] hover:border-[#8B6E4E] hover:text-[#5D4037]"
                      }`}
                  >
                    {range.name}
                    {priceRange === range.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* --- Main Content Area (Right) --- */}
        <main className="flex-1 lg:ml-72 h-full overflow-y-auto scroll-smooth relative z-10">

          {/* Header within Content Area - Moves with product scroll */}
          <section className="relative pt-12 pb-12 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <span className="text-[#6B7F59] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 block">
                Curated Collection
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair text-[#2C2C2C] mb-6 leading-tight">
                Shop The <span className="italic font-light text-[#6B7F59]">Artisan</span> Edit
              </h1>
              <p className="text-[#6B6B6B] text-sm md:text-base max-w-lg mx-auto font-inter leading-relaxed">
                Discover our complete collection of handcrafted wooden home décor, thoughtfully designed to bring nature's warmth into your sanctuary.
              </p>
            </motion.div>

            {/* Mobile Filter Toggle Button (Visible only on mobile) */}
            <div className="lg:hidden mt-8 sticky top-0 z-30">
              <button
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="mx-auto w-full max-w-md bg-white/80 backdrop-blur-md border border-[#E6E1D6] py-3 px-6 rounded-xl flex items-center justify-between shadow-sm text-[#2C2C2C] font-serif"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal size={18} />
                  Filters & Categories
                </span>
                {isMobileFiltersOpen ? <X size={20} /> : <span className="text-xs font-bold bg-[#6B7F59] text-white px-2 py-0.5 rounded-full">{selectedCategory !== 'all' || priceRange !== 'all' ? '!' : '+'}</span>}
              </button>
            </div>
          </section>

          {/* Product Grid */}
          <div className="px-4 md:px-8 pb-20 max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <p className="text-[#8B847C] font-inter text-sm">
                Showing <span className="font-bold text-[#2C2C2C]">{filteredProducts.length}</span> handcrafted items
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-8">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <WoodProductCard
                    key={product.id}
                    {...product}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white/50 rounded-3xl border border-[#E6E1D6] border-dashed"
              >
                <div className="w-16 h-16 bg-[#F5F1E8] rounded-full flex items-center justify-center mx-auto mb-4 text-[#6B7F59]">
                  <Search size={24} />
                </div>
                <h3 className="text-2xl font-playfair text-[#2C2C2C] mb-2">No artisans found</h3>
                <p className="text-[#6B6B6B] font-inter mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={() => { setSelectedCategory("all"); setPriceRange("all"); }}
                  className="px-8 py-3 bg-[#2C2C2C] text-white rounded-xl font-bold hover:bg-[#6B7F59] transition-colors shadow-lg text-sm"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
          <Footer />
        </main>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
