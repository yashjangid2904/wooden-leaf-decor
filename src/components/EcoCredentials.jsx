import { motion } from "motion/react";
import { Leaf, Users, Globe } from "lucide-react";

export function EcoCredentials() {
  const features = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sustainable Sourcing",
      text: "Ethically harvested materials that preserve forest, ensuring nature thrives."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Fair Trade Artisan",
      text: "Supporting local craftsmen with fair wages and safe working amenities."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Impact",
      text: "Preserving ancestral techniques across communities in Asia and Africa."
    }
  ];

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="bg-[#6B7F59] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative py-10 md:py-12 px-6 md:px-12">

          {/* Decorative Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3E3832]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

              {/* Left Content Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1720156351990-67afa28e4aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    alt="Sustainable handmade interior"
                    className="w-full h-[220px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-[#F5F1E8] p-6 rounded-xl shadow-xl max-w-[200px]"
                >
                  <p className="font-serif text-[#3E3832] text-3xl font-bold mb-1">100%</p>
                  <p className="text-xs text-[#6B6B6B] uppercase tracking-wider font-bold">Eco-Friendly Materials</p>
                </motion.div>
              </motion.div>

              {/* Right Text Content */}
              <div className="order-1 lg:order-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-[#F5F1E8]/80 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                    Our Values
                  </span>
                  <h2 className="font-playfair text-4xl md:text-5xl text-[#F5F1E8] leading-tight mb-6">
                    Conscious Design <br />
                    <span className="italic text-[#D4C7B0]">For Modern Living</span>
                  </h2>
                  <p className="text-[#F5F1E8]/80 text-lg leading-relaxed max-w-lg">
                    We believe beauty shouldn't cost the earth. Every piece in our collection
                    is a testament to the harmony between nature and craftsmanship.
                  </p>
                </motion.div>

                {/* Features List */}
                <div className="space-y-6">
                  {features.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                    >
                      <div className="bg-[#D4C7B0] p-3 rounded-full text-[#3E3832] shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-[#F5F1E8] font-serif text-xl mb-2">{item.title}</h3>
                        <p className="text-[#F5F1E8]/70 text-sm leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4"
                >
                  <button className="text-[#D4C7B0] font-bold border-b-2 border-[#D4C7B0] pb-1 hover:text-white hover:border-white transition-all">
                    Meet Our Artisans →
                  </button>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
