import { motion } from "motion/react";

export function EcoCredentials() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#D4C5B0] py-12 md:py-20"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2
              
              className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#3E3832] leading-tight"
            >
              Our Eco <br /> Credentials
            </h2>

            <div className="space-y-4">
              <p
          
                className="text-[#3E3832] leading-relaxed"
              >
                We believe in creating products that are as ethical as they are
                beautiful. Our mission is simple: combine contemporary design
                with traditional craftsmanship.
              </p>

              <p
               
                className="text-[#3E3832] leading-relaxed"
              >
                Proudly working with artisans across Australia, Asia, and
                Africa, each item is thoughtfully sourced from sustainable
                materials. Every purchase supports fair wages and preserves
                ancestral craft techniques.
              </p>
            </div>

            <button
             
              className="text-[#3E3832] underline hover:text-[#6B7C59] transition-colors mt-4"
            >
              Our Artisan Partners →
            </button>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1720156351990-67afa28e4aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Sustainable handmade interior"
              className="w-full h-[300px] sm:h-[400px] md:h-[450px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
