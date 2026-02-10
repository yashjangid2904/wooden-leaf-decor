import { Instagram, Heart, MessageCircle, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const instagramImages = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Minimalist dining room",
    likes: "2.4k",
    comments: "56",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1765277789225-a6a5e57b708e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Natural wooden shelves",
    likes: "1.8k",
    comments: "42",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1681081108013-9b029f2a944e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Cozy living room with plants",
    likes: "3.1k",
    comments: "89",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Modern wooden decor",
    likes: "2.9k",
    comments: "64",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Handcrafted wooden stool",
    likes: "1.5k",
    comments: "31",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Warm lighting in library",
    likes: "4.2k",
    comments: "102",
  },
];

export function InstagramSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden py-16 md:py-32 bg-[#FAF8F5]"
    >
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
      
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#6B7F59]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#D4C7B0]/20 rounded-full blur-[150px]"></div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-md border border-[#E5E5E5] text-[#6B7F59] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6B7F59] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6B7F59]"></span>
              </span>
              Community Showcase
            </div>
            <h2 className="font-playfair text-5xl sm:text-6xl md:text-7xl text-[#2C2C2C] leading-[1.1] mb-6">
              Living with <br /> <span className="italic font-light">Nature's Essence</span>
            </h2>
            <p className="font-inter text-[#6B6B6B] text-lg max-w-md leading-relaxed">
              <span className="text-[#2C2C2C] font-semibold underline decoration-[#D4C7B0] decoration-2 underline-offset-4 cursor-pointer hover:text-[#6B7F59] transition-colors">#WoodenLeafHome</span> to be featured in our monthly editorial.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a
              href="https://www.instagram.com/woodenleaf.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white pl-8 pr-2 py-2 rounded-full font-semibold transition-all duration-500 hover:shadow-[0_20px_50px_rgba(238,42,123,0.3)] shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Instagram className="w-5 h-5 transition-transform group-hover:rotate-12" />
                Explore Our Daily Journal
              </span>
              <div className="relative z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#ee2a7b] transition-all duration-500">
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
          </motion.div>
        </div>

        {/* Cinematic Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
          {instagramImages.map((item, index) => {
            const gridClasses = [
              "col-span-2 md:col-span-4 md:row-span-2", // 1st - Big Feature
              "col-span-1 md:col-span-5 md:row-span-1", // 2nd
              "col-span-1 md:col-span-3 md:row-span-2", // 3rd - Right Tall
              "col-span-1 md:col-span-2 md:row-span-1", // 4th
              "col-span-1 md:col-span-3 md:row-span-1", // 5th
              "col-span-2 md:col-span-8 md:row-span-2", // 6th - Bottom Wide Feature
            ][index] || "col-span-1 md:col-span-4 md:row-span-1";

            const parallaxY = index % 2 === 0 ? y1 : y2;

            return (
              <motion.a
                key={item.id}
                href="https://www.instagram.com/woodenleaf.co/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ y: parallaxY }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "circOut" }}
                className={`relative overflow-hidden rounded-[2rem] group cursor-pointer block border border-white/20 shadow-xl ${gridClasses}`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-all duration-[1500ms] ease-out-expo group-hover:scale-[1.15] group-hover:rotate-1"
                />

                {/* Glassmorphism Stats Badge */}
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 flex items-center justify-between">
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                    <div className="flex items-center gap-1.5 text-white">
                      <Heart className="w-4 h-4 fill-white animate-pulse" />
                      <span className="text-xs font-bold font-inter">{item.likes}</span>
                    </div>
                    <div className="w-px h-3 bg-white/20"></div>
                    <div className="flex items-center gap-1.5 text-white">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs font-bold font-inter">{item.comments}</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#2C2C2C]">
                    <Instagram className="w-5 h-5" />
                  </div>
                </div>

                {/* Subtle Grain over image */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </motion.a>
            );
          })}
        </div>

        {/* Stats & Trust Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 md:mt-32 pt-16 border-t border-[#E5E5E5] flex flex-wrap lg:flex-nowrap justify-between items-center gap-12"
        >
          <div className="flex flex-col gap-2">
            <h4 className="font-playfair text-2xl text-[#2C2C2C]">The Wooden Leaf <br /> <span className="italic">Impact</span></h4>
            <p className="text-sm text-[#6B6B6B] font-inter">Join a growing community of conscious lovers</p>
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap items-center gap-8 md:gap-16">
            <div className="text-center sm:text-left">
              <p className="font-playfair text-4xl md:text-5xl text-[#6B7F59] font-bold tracking-tight">12K+</p>
              <p className="text-[#A1A1A1] text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Active Followers</p>
            </div>
            <div className="w-px h-12 bg-[#E1E1E1] hidden sm:block"></div>
            <div className="text-center sm:text-left">
              <p className="font-playfair text-4xl md:text-5xl text-[#6B7F59] font-bold tracking-tight">500+</p>
              <p className="text-[#A1A1A1] text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Curated Posts</p>
            </div>
            <div className="w-px h-12 bg-[#E1E1E1] hidden sm:block"></div>
            <div className="text-center sm:text-left">
              <p className="font-playfair text-4xl md:text-5xl text-[#6B7F59] font-bold tracking-tight">98%</p>
              <p className="text-[#A1A1A1] text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Satisfaction Rate</p>
            </div>
          </div>

          <div className="flex items-center -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-[#D4C7B0] overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-white bg-[#6B7F59] flex items-center justify-center text-white text-xs font-bold">
              +1k
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
