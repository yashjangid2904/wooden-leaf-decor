import { Leaf, Recycle, TreePine, Droplet, Heart, Award } from "lucide-react";

import { Button } from "../Button";

export function SustainabilityPage({ onNavigate }) {
  const practices = [
    {
      icon: <TreePine className="w-12 h-12" />,
      title: "Sustainable Sourcing",
      description: "100% FSC-certified wood from responsibly managed forests",
      stats: "500+ acres of forest protected annually",
    },
    {
      icon: <Recycle className="w-12 h-12" />,
      title: "Zero Waste Production",
      description: "All wood offcuts are recycled or composted",
      stats: "95% waste diversion rate",
    },
    {
      icon: <Droplet className="w-12 h-12" />,
      title: "Water Conservation",
      description: "Closed-loop water systems in all production facilities",
      stats: "80% reduction in water usage",
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Fair Trade Certified",
      description: "Ethical wages and safe working conditions for all artisans",
      stats: "200+ artisan families supported",
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: "Carbon Neutral",
      description: "Fully offset emissions through reforestation projects",
      stats: "10,000 trees planted in 2025",
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Natural Finishes",
      description: "Only non-toxic, plant-based oils and waxes",
      stats: "100% chemical-free products",
    },
  ];

  const impacts = [
    { number: "100%", label: "Sustainably Sourced Wood" },
    { number: "95%", label: "Waste Diverted from Landfills" },
    { number: "200+", label: "Artisan Families Supported" },
    { number: "10K+", label: "Trees Planted in 2025" },
    { number: "Carbon Neutral", label: "Since 2023" },
    { number: "12", label: "Countries with Artisan Partners" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1645307356404-407a1083ec59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Sustainable forest"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
              Our Commitment to the Planet
            </h1>
            <p className="text-xl leading-relaxed">
              Sustainability isn't just a buzzword for us—it's the foundation of
              everything we create.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-6">
          Design That Gives Back
        </h2>
        <p className="text-xl text-[#6B6B6B] leading-relaxed">
          Every piece we create reflects our commitment to sustainability,
          ethical craftsmanship, and protecting the planet.
        </p>
      </section>

      {/* Practices */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              How We Do It
            </h2>
            <p className="text-xl text-[#6B6B6B]">
              Our comprehensive approach to sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practices.map((practice, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 bg-[#F5F1E8] rounded-full flex items-center justify-center mb-6 text-[#6B7F59]">
                  {practice.icon}
                </div>
                <h3 className="text-2xl font-serif mb-3">{practice.title}</h3>
                <p className="text-[#6B6B6B] mb-4 leading-relaxed">
                  {practice.description}
                </p>
                <div className="pt-4 border-t border-[rgba(107,127,89,0.15)]">
                  <p className="text-[#6B7F59]">{practice.stats}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Our Impact by the Numbers
          </h2>
          <p className="text-xl text-[#6B6B6B]">Measuring what matters</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {impacts.map((impact, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-serif text-[#6B7F59] mb-3">
                {impact.number}
              </div>
              <p className="text-[#6B6B6B]">{impact.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#6B7F59] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Shop with Purpose
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Every purchase supports sustainable forestry and artisan
            communities.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => onNavigate("shop")}
          >
            Explore Our Products
          </Button>
        </div>
      </section>
    </div>
  );
}
