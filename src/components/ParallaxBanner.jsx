import { motion } from "motion/react";

/**
 * ParallaxBanner - A full-width parallax section with a fixed background image
 * and a transparent "window" cutout that reveals the background as you scroll.
 * Uses home.jpg from public folder as the background image.
 * Placed between ProductSpotlight and EcoCredentials sections.
 * 
 * Approach: Uses a simple rounded container inside a solid-colored section
 * to create the window frame effect without complex overlay hacks.
 */
export function ParallaxBanner() {
    return (
        <section className="bg-white py-12 md:py-20">
            {/* Centered container with horizontal padding for the frame effect */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* 
          Rounded window container - clips the parallax background image.
          The rounded corners + overflow-hidden create the "window" look.
        */}
                <div
                    className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden"
                    style={{ height: "500px" }}
                >
                    {/* 
            Fixed background image for parallax scrolling effect.
            backgroundAttachment: fixed keeps the image stationary while
            the window scrolls over it, revealing different parts of the image.
          */}
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: "url('/home.jpg')",
                            backgroundAttachment: "fixed",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                        }}
                    />

                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Banner content - centered text with scroll-triggered animations */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 text-center px-6"
                        >
                            {/* Decorative label */}
                            <span className="text-white/70 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">
                                Handcrafted with Love
                            </span>

                            {/* Main heading */}
                            <h2 className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
                                Nature's Artistry, <br />
                                <span className="italic text-[#D4C7B0]">Your Home</span>
                            </h2>

                            {/* Subtitle */}
                            <p className="text-white/80 text-sm md:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
                                Discover eco-friendly décor pieces that bring the beauty of
                                nature indoors, crafted by skilled artisans.
                            </p>

                            {/* CTA Button */}
                            <motion.a
                                href="/shop"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#3E3832] transition-all duration-300 group"
                            >
                                Explore Collection
                                <span className="group-hover:translate-x-1 transition-transform">
                                    →
                                </span>
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
