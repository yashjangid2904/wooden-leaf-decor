
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'motion/react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, ArrowRight, Mail } from 'lucide-react';

export function Footer() {
  const ref = useRef(null);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Parallax transforms for different layers
  const x1 = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const y1 = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);

  const x2 = useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]);
  const y2 = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);

  const x3 = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);
  const y3 = useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10]);

  // Stagger variants for content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative bg-[#F3EFE9] text-[#3E3832] overflow-hidden pt-16 md:pt-32 pb-8 md:pb-10"
    >
      {/* Top Gradient Fade from Previous Section */}
      <div className="absolute top-0 left-0 w-full h-16 md:h-32 bg-gradient-to-b from-[#FAF8F5] via-[#F3EFE9]/50 to-[#F3EFE9] pointer-events-none" />

      {/* ==================== ANIMATED COSMETICS ==================== */}

      {/* 1. Large Wood Grain Ring (Top Left) - Parallax Layer 1 */}
      <motion.svg
        style={{ x: x1, y: y1 }}
        className="absolute -top-24 -left-24 w-48 h-48 md:w-96 md:h-96 text-[#C9A84C] opacity-10 pointer-events-none"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="8 4" />
      </motion.svg>

      {/* 2. Floating Leaves (Right Side) - Parallax Layer 2 */}
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute top-10 right-10 pointer-events-none opacity-20 text-[#6B7F59] hidden md:block"
        initial={{ y: 0, rotate: 0 }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg w="64" h="64" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
          <path d="M12 2C7.5 2 4 6.5 4 12C4 17.5 7.5 22 12 22C16.5 22 20 17.5 20 12C20 6.5 16.5 2 12 2ZM12 20C8.5 20 6 16.5 6 12C6 7.5 8.5 4 12 4C15.5 4 18 7.5 18 12C18 16.5 15.5 20 12 20Z" />
          <path d="M12 6L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 10L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 14L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* 3. Subtle Wave Line (Bottom) - Animated Path */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-10">
        <motion.svg
          className="relative block w-[calc(100%+1.3px)] h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-[#6B7F59]"
            animate={{
              d: [
                "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z",
                "M985.66,95.83C906.67,75,823.78,34,743.84,17.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,44.86A600.21,600.21,0,0,1,0,30.35V120H1200V98.8C1132.19,121.92,1055.71,114.31,985.66,95.83Z",
                "M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>

      {/* 4. Dots Grid (Bottom Right) - Parallax Layer 3 */}
      <motion.svg
        style={{ x: x3, y: y3 }}
        className="absolute bottom-20 right-5 w-16 h-16 md:w-24 md:h-24 text-[#C17F59] opacity-20 pointer-events-none hidden sm:block"
        viewBox="0 0 100 100"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        {[...Array(5)].map((_, r) => (
          [...Array(5)].map((_, c) => (
            <circle key={`${r}-${c}`} cx={10 + c * 20} cy={10 + r * 20} r="2" fill="currentColor" />
          ))
        ))}
      </motion.svg>

      <motion.div
        className="relative max-w-[1400px] mx-auto px-4 sm:px-6 z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 md:gap-12 mb-8 md:mb-16">

          {/* Brand Section */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-4 space-y-3 md:space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 bg-[#6B7F59] blur-md opacity-10 group-hover:opacity-20 transition-opacity rounded-full"></div>
                <img
                  src="/logo-new.png"
                  alt="Wooden Leaf"
                  className="relative h-10 w-10 md:h-14 md:w-14 object-contain transition-transform duration-500 group-hover:rotate-12"
                />
              </div>
              <div>
                <h3 className="font-pacifico text-xl md:text-2xl text-[#2C2C2C] tracking-wide">Wooden Leaf</h3>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#6B7F59]">Decor & Living</p>
              </div>
            </Link>
            <p className="font-inter text-[#5A544F] text-xs md:text-sm leading-relaxed max-w-sm">
              Eco-friendly home decor that brings nature's artistry into your living space.
            </p>
            <div className="flex gap-3 md:gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, rotate: 5, backgroundColor: "#6B7F59", color: "#ffffff", borderColor: "#6B7F59" }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 md:p-2 bg-white border border-[#D4C7B0]/50 rounded-full text-[#5A544F] shadow-sm flex items-center justify-center"
                >
                  <Icon className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Directory Links */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 space-y-2 md:space-y-6">
            <h4 className="font-playfair text-sm md:text-lg text-[#2C2C2C] font-semibold">Company</h4>
            <ul className="space-y-2 md:space-y-4 font-inter text-xs md:text-sm">
              {['About Us', 'Sustainability', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-[#5A544F] hover:text-[#6B7F59] transition-colors flex items-center gap-2 group">
                    <motion.span
                      className="w-0 h-px bg-[#6B7F59]"
                      animate={{ width: "0px" }}
                      whileHover={{ width: "12px" }}
                      transition={{ duration: 0.3 }}
                    ></motion.span>
                    <motion.span whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                      {item}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 space-y-2 md:space-y-6">
            <h4 className="font-playfair text-sm md:text-lg text-[#2C2C2C] font-semibold">Support</h4>
            <ul className="space-y-2 md:space-y-4 font-inter text-xs md:text-sm">
              {['FAQ', 'Shipping Returns', 'Care Guide', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-[#5A544F] hover:text-[#6B7F59] transition-colors flex items-center gap-2 group">
                    <motion.span
                      className="w-0 h-px bg-[#6B7F59]"
                      animate={{ width: "0px" }}
                      whileHover={{ width: "12px" }}
                      transition={{ duration: 0.3 }}
                    ></motion.span>
                    <motion.span whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                      {item}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-4 space-y-3 md:space-y-6">
            <h4 className="font-playfair text-sm md:text-lg text-[#2C2C2C] font-semibold">Stay Connected</h4>
            <p className="font-inter text-[#5A544F] text-xs md:text-sm">
              Subscribe for updates and exclusive deals.
            </p>
            <div className="group relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white border border-[#D4C7B0]/50 text-[#3E3832] px-4 py-3 md:px-5 md:py-4 rounded-lg focus:outline-none focus:border-[#6B7F59] focus:ring-1 focus:ring-[#6B7F59]/20 transition-all pr-12 md:pr-14 font-inter text-sm shadow-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-2 p-2 bg-[#6B7F59] text-white rounded-md hover:bg-[#5a6b48] transition-colors shadow-md"
              >
                <ArrowRight size={18} />
              </motion.button>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#6B7F59] font-inter">
              <Mail size={14} />
              <span>No spam, unsubscribe anytime.</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div variants={itemVariants} className="border-t border-[#D4C7B0]/40 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-[10px] md:text-xs font-inter text-[#8B847C]">
          <p>&copy; {new Date().getFullYear()} Wooden Leaf. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="hover:text-[#6B7F59] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#6B7F59] transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-[#6B7F59] transition-colors">Cookie Policy</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
