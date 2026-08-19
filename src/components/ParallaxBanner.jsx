import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Check, ShoppingBag, Sparkles, Plus, Minus, RotateCcw } from "lucide-react";
import { useCart } from "../context/CartContext";
import products from "./data/products";

/**
 * CustomizableBlocks - An interactive showcase for the Wooden Memory Blocks product.
 * Features:
 * 1. 3D Easel Stand visualization (rendering "comes with the stand").
 * 2. Original 7 uploaded wooden block designs as selectable thumbnails.
 * 3. Custom photo uploader (mockup prints photo onto the block live!).
 * 4. Custom engraving text input overlaying onto the wood live.
 * 5. Black button and #eeeeee background to comply with UX rules.
 * 6. Loaded with premium, spring-based micro-interactions and scroll entries.
 */
export function CustomizableBlocks() {
  const { addToCart } = useCart();
  
  // Find the product in the products database (added with ID 100)
  const productData = products.find(p => p.id === 100) || {
    id: 100,
    title: "Customizable Wooden Block with Stand",
    price: 499,
    image: "/WOODEN_BLOCKS/1.jpeg",
    description: "Individually handcrafted wooden blocks. Personalize with your own photo or text. Comes with a sleek, minimalist wooden stand to display your custom piece."
  };

  // State management
  const [activeIndex, setActiveIndex] = useState(0);
  const [customText, setCustomText] = useState("");
  const [fontFamily, setFontFamily] = useState("font-serif");
  const [textColor, setTextColor] = useState("text-stone-900");
  const [userUploadedImage, setUserUploadedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const fileInputRef = useRef(null);

  // Dynamic pricing for style 4 (index 3), which is a set of 3 blocks
  const isSetOf3 = activeIndex === 3 && !userUploadedImage;
  const currentPrice = isSetOf3 ? 999 : 499;
  const strikePrice = isSetOf3 ? 1999 : 999;

  // Original 7 uploaded wooden block images
  const woodenBlockImages = [
    "/WOODEN_BLOCKS/1.jpeg",
    "/WOODEN_BLOCKS/2.jpeg",
    "/WOODEN_BLOCKS/3.png",
    "/WOODEN_BLOCKS/4.jpeg",
    "/WOODEN_BLOCKS/5.jpeg",
    "/WOODEN_BLOCKS/6.jpeg",
    "/WOODEN_BLOCKS/7.jpeg",
  ];

  // Font options for the live preview text overlay
  const fontOptions = [
    { name: "Classic Serif", value: "font-serif tracking-wide" },
    { name: "Clean Sans", value: "font-sans uppercase tracking-widest font-bold" },
    { name: "Chic Script", value: "font-mono italic font-semibold" },
  ];

  // Ink color options
  const colorOptions = [
    { name: "Charcoal", value: "text-stone-900" },
    { name: "Warm White", value: "text-stone-100" },
    { name: "Wood Burn", value: "text-amber-950" },
  ];

  // Handle image upload and generate preview URL
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file selection input
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  // Reset custom configuration to original defaults
  const handleReset = () => {
    setUserUploadedImage(null);
    setCustomText("");
  };

  // Add customized item to shopping cart
  const handleAddToCart = () => {
    const customizedProduct = {
      ...productData,
      price: currentPrice,
      image: userUploadedImage || woodenBlockImages[activeIndex],
      // Attach custom options for cart order clarity
      title: userUploadedImage 
        ? "Custom Photo Wooden Block with Stand" 
        : isSetOf3
          ? "Artisan Wooden Block Set of 3 with Stands"
          : `Custom Wooden Block (Style ${activeIndex + 1})`,
      description: isSetOf3
        ? "Set of 3 handcrafted wooden blocks with stands."
        : `Includes minimalist wooden stand. Custom text engraving: "${customText || 'None'}"`,
    };
    
    addToCart(customizedProduct, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section className="bg-[#eeeeee] py-16 md:py-24 text-[#2C2C2C] overflow-hidden border-y border-stone-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Section with Scroll Trigger Entry */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <span className="text-[#6B7F59] font-bold uppercase tracking-[0.2em] text-[10px] mb-3 block">
            Bespoke Creation
          </span>
          <h2 className="text-3xl md:text-5xl font-playfair text-[#2C2C2C] mb-4">
            Customizable Wooden Blocks
          </h2>
          <p className="text-stone-600 text-sm md:text-base font-inter">
            Create a timeless keepsake. Choose from our hand-painted artisan styles or upload your own cherished photo, printed beautifully on sustainable solid wood.
          </p>
          <div className="w-16 h-1 bg-[#6B7F59]/20 mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Live Mockup with Entry & Hover Tilt Animations */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative w-full max-w-[360px] md:max-w-[380px]">
              
              {/* Wooden Block Container with Hover Lift/Tilt */}
              <motion.div 
                layout
                whileHover={{ y: -8, rotate: 1.5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="aspect-square w-full rounded-2xl overflow-hidden shadow-2xl bg-[#FAF8F5] relative border-[8px] border-[#e7e1d5] flex items-center justify-center cursor-pointer group"
              >
                {/* Visual wood texture overlay */}
                <div 
                  className="absolute inset-0 bg-[#8B7E74] mix-blend-overlay opacity-15 pointer-events-none z-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                  }}
                />
                
                {/* 3D shadow depth overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none z-10" />

                {/* Main Image Display (Animate change with a spring) */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={userUploadedImage || activeIndex}
                    src={userUploadedImage || woodenBlockImages[activeIndex]}
                    alt="Bespoke Wooden Block Preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 180, damping: 20 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Live Custom Text Engraving Overlay with Pop & Fade */}
                <AnimatePresence>
                  {customText && (
                    <motion.div 
                      key="engraving"
                      initial={{ opacity: 0, scale: 0.8, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className={`absolute bottom-8 left-0 right-0 px-4 text-center select-none ${fontFamily} ${textColor} text-lg md:text-xl drop-shadow-md font-bold tracking-wide z-20`}
                    >
                      {customText}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Wooden Stand (3D Easel styling) */}
              <div className="relative w-[85%] mx-auto -mt-1.5 h-3.5 bg-[#beab90] rounded-b-md shadow-md z-20 flex justify-between px-8 border-t border-[#dccfb9]">
                {/* Left peg supporting the block */}
                <div className="w-4 h-6 bg-[#a28e72] rounded-t-sm -mt-3.5 shadow-inner transform -rotate-12 border-r border-black/10" />
                {/* Right peg supporting the block */}
                <div className="w-4 h-6 bg-[#a28e72] rounded-t-sm -mt-3.5 shadow-inner transform rotate-12 border-l border-black/10" />
              </div>
              
              {/* Stand floor shadow */}
              <div className="w-[75%] mx-auto h-2 bg-black/15 blur-sm rounded-full mt-1.5" />
            </div>

            {/* Micro details indicator */}
            <div className="mt-8 flex items-center gap-2 text-stone-500 text-xs font-inter bg-white/50 px-3 py-1.5 rounded-full border border-stone-300/30">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Preview • Real Handcrafted Stand Included
            </div>
          </motion.div>

          {/* Right Column: Customization Controls with Slide Entry Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
            className="lg:col-span-7 space-y-6 font-inter"
          >
            
            {/* Header / Badges */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#6B7F59] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm animate-pulse">
                  Special Offer
                </span>
                <span className="text-stone-500 text-xs font-medium">
                  ★ Hand-Finished Solid Pine
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-stone-850">
                Personalized Wood Block Setup
              </h3>
              <div className="flex items-baseline gap-4 pt-1">
                <span className="text-3xl font-serif text-[#2C2C2C] font-bold">₹{currentPrice.toLocaleString()}.00</span>
                <span className="text-stone-400 line-through text-base">₹{strikePrice.toLocaleString()}.00</span>
                <span className="text-emerald-700 text-xs font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  Save 50%
                </span>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">
                {isSetOf3 ? (
                  "* Includes 3x Handcrafted Solid Wood Blocks (approx 4\"x4\"), 3x Custom Prints, and 3x Sleek Desktop Display Stands."
                ) : (
                  "* Includes 1x Handcrafted Solid Wood Block (approx 4\"x4\"), 1x Custom Print, and 1x Sleek Desktop Display Stand."
                )}
              </p>
            </div>

            <hr className="border-stone-300" />

            {/* Customizer Option 1: Select Style / Upload */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-stone-500 flex justify-between">
                <span>1. Select Artisan Style or Upload Photo</span>
                {userUploadedImage && (
                  <button 
                    onClick={handleReset} 
                    className="text-[#6B7F59] hover:underline flex items-center gap-1 normal-case tracking-normal font-semibold font-inter"
                  >
                    <RotateCcw size={12} className="animate-spin-once" />
                    Reset to Default
                  </button>
                )}
              </div>

              {/* Thumbnails Row with spring scale interactions */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {woodenBlockImages.map((img, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setUserUploadedImage(null);
                      setActiveIndex(i);
                    }}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                      !userUploadedImage && activeIndex === i 
                        ? "border-[#6B7F59] ring-2 ring-[#6B7F59]/20 scale-95" 
                        : "border-stone-300 hover:border-stone-400"
                    }`}
                  >
                    <img src={img} alt={`Style ${i+1}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>

              {/* Upload Drop Zone Box with spring micro-interaction */}
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={triggerFileSelect}
                  className={`w-full py-4 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                    userUploadedImage 
                      ? "border-[#6B7F59] bg-[#6B7F59]/5 text-[#6B7F59]" 
                      : "border-stone-300 hover:border-[#6B7F59] bg-stone-50 hover:bg-stone-100/50 text-stone-600"
                  }`}
                >
                  {userUploadedImage ? (
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="flex flex-col items-center justify-center gap-1.5"
                    >
                      <Check size={20} className="stroke-[3] text-emerald-600 animate-bounce" />
                      <span className="text-xs font-bold">Custom Photo Uploaded Successfully!</span>
                      <span className="text-[10px] opacity-75">Click to choose another photo</span>
                    </motion.div>
                  ) : (
                    <>
                      <Upload size={20} className="text-stone-400 group-hover:text-[#6B7F59]" />
                      <span className="text-xs font-bold">Have your own photo? Upload here</span>
                      <span className="text-[10px] text-stone-400">Supports JPG, PNG (Max 5MB)</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Customizer Option 2: Custom Text Engraving */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-stone-500 flex justify-between">
                <span>2. Add Custom Engraving Text (Optional)</span>
                <span className="text-[10px] text-stone-400 normal-case tracking-normal">{customText.length}/25 chars</span>
              </label>

              <input
                type="text"
                maxLength={25}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g., Family, Love, Memories..."
                className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-850 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#6B7F59]/30 focus:border-[#6B7F59] transition-all text-sm font-medium"
              />

              {/* Text Style Sub-options (smooth slide-down) */}
              <AnimatePresence>
                {customText && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="grid grid-cols-2 gap-3 pt-1 overflow-hidden"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-stone-400 uppercase">Font style</span>
                      <div className="flex gap-1">
                        {fontOptions.map((f, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFontFamily(f.value)}
                            className={`px-2.5 py-1 text-[10px] font-medium rounded-md border transition-all ${
                              fontFamily === f.value
                                ? "bg-stone-800 text-white border-stone-800"
                                : "bg-white text-stone-600 border-stone-300 hover:bg-stone-50"
                            }`}
                          >
                            {f.name.split(" ")[1]}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-stone-400 uppercase">Ink Tone</span>
                      <div className="flex gap-1">
                        {colorOptions.map((c, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setTextColor(c.value)}
                            className={`px-2.5 py-1 text-[10px] font-medium rounded-md border transition-all ${
                              textColor === c.value
                                ? "bg-stone-800 text-white border-stone-800"
                                : "bg-white text-stone-600 border-stone-300 hover:bg-stone-50"
                            }`}
                          >
                            {c.name}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Customizer Option 3: Quantity and Solid Black Checkout button */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-4">
                
                {/* Quantity adjustments */}
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-stone-600 hover:bg-stone-50 transition-colors"
                  >
                    <Minus size={16} />
                  </motion.button>
                  <motion.span 
                    key={quantity}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-12 text-center font-bold text-stone-850 text-sm block"
                  >
                    {quantity}
                  </motion.span>
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-stone-600 hover:bg-stone-50 transition-colors"
                  >
                    <Plus size={16} />
                  </motion.button>
                </div>

                {/* SOLID BLACK BUTTON (Rule compliance: Buttons: Black (#000000)) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="flex-1 bg-black text-white py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-stone-900 active:scale-98 transition-all shadow-lg select-none disabled:bg-stone-800"
                >
                  <AnimatePresence mode="wait">
                    {isAdded ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={18} className="stroke-[3] text-emerald-400 animate-pulse" />
                        <span>Added to Bag!</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag size={18} />
                        <span>Add to Bag • ₹{(currentPrice * quantity).toLocaleString()}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Secure checkout info */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <Sparkles size={12} className="text-[#6B7F59] animate-pulse" />
                <span>Individually custom-made by hand, ships within 2-3 business days.</span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
