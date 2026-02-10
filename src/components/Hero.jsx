// export function Hero() {
//   return (
//     <section className="bg-[#FAF8F5] py-16 md:py-24">
//       <div className="max-w-[1400px] mx-auto px-6">
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           {/* Content Side */}
//           <div className="space-y-6">
//             <h1
//               style={{ fontFamily: "var(--font-heading)" }}
//               className="text-5xl md:text-6xl text-[#3E3832] leading-tight"
//             >
//               Welcome to <br /> Wooden Leaf
//             </h1>

//             <p
//               style={{ fontFamily: "var(--font-body)" }}
//               className="text-lg text-[#8B7E74] leading-relaxed max-w-lg"
//             >
//               Discover our curated collection of eco-friendly, handcrafted home
//               decor. Each piece tells a story of sustainability, artisan
//               craftsmanship, and timeless beauty. Transform your space with
//               nature-inspired designs that care for the planet.
//             </p>

//             <button
//               style={{ fontFamily: "var(--font-body)" }}
//               className="bg-[#6B7C59] text-white px-8 py-3 rounded-md hover:bg-[#8B9D7C] transition-colors"
//             >
//               Shop Now
//             </button>
//           </div>

//           {/* Image Side */}
//           <div className="relative">
//             <img
//               src="https://images.unsplash.com/photo-1718939042031-6c6b5a99ebaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
//               alt="Natural wooden furniture and home decor"
//               className="w-full h-[500px] object-cover rounded-lg shadow-lg"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Use a reliable high-quality image from public as fallback background
  const placeholderImage = "/clock.jpeg";

  // Reset isPlaying when component mounts (navigation)
  useEffect(() => {
    setIsPlaying(false);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#3E3832]">
      {/* 1. Permanent Image Fallback */}
      <img 
        src={placeholderImage} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 2. The Background Video */}
      <video
        src="/Premium_Wooden_Home_Décor_Video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={placeholderImage}
        onPlaying={() => setIsPlaying(true)}
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* 3. Fail-safe Loading Overlay (The "Curtain") */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            key="hero-curtain"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#3E3832] z-20"
            style={{ 
              backgroundImage: `url(${placeholderImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
      </AnimatePresence>

      {/* 4. Dark Overlay for Text Contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-30" />

      {/* 5. Content Side */}
      <div className="relative z-40 max-w-[1400px] mx-auto px-4 sm:px-6 py-12 md:py-24 text-center w-full">
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-tight drop-shadow-lg">
              Welcome to <br /> 
              <span className="text-[#D4C7B0]">Wooden Leaf</span>
            </h1>

            <p className="font-inter text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto drop-shadow-md px-2 mt-6">
              Discover our curated collection of eco-friendly, handcrafted home
              decor. Each piece tells a story of sustainability, artisan
              craftsmanship, and timeless beauty.
            </p>

            <div className="pt-8 md:pt-12">
              <Link 
                to="/shop" 
                className="inline-block font-inter bg-[#D4C7B0] text-[#3E3832] px-8 sm:px-10 py-3 sm:py-4 rounded-md text-base sm:text-lg font-semibold hover:bg-white transition-all transform hover:scale-105 shadow-xl"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
