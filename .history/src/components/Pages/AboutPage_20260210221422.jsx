import { Leaf, Heart, Users, Award } from "lucide-react";

import { Button } from "../Button";
import { FeatureCard } from "../Cards";

export function AboutPage({ onNavigate }) {
  const values = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainability First",
      description:
        "Every decision we make considers our impact on the planet, from material sourcing to packaging.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Crafted with Love",
      description:
        "We believe in the power of handmade goods to bring joy and meaning to everyday life.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Fair Trade",
      description:
        "We partner with artisans worldwide, ensuring fair wages and ethical working conditions.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Over Quantity",
      description:
        "We create timeless pieces built to last generations, not trends.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Founded",
      description: "Wooden Leaf was born from a passion for sustainable design",
    },
    {
      year: "2019",
      title: "First Collection",
      description: "Launched our inaugural line of handcrafted vases",
    },
    {
      year: "2021",
      title: "Fair Trade Certified",
      description: "Achieved certification for ethical artisan partnerships",
    },
    {
      year: "2023",
      title: "Carbon Neutral",
      description: "Reached full carbon neutrality across all operations",
    },
    {
      year: "2026",
      title: "Global Impact",
      description: "Now partnering with artisan communities in 12 countries",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1722411927625-0e478acf502b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Artisan at work"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
              Crafting a Sustainable Future
            </h1>
            <p className="text-xl leading-relaxed">
              We're on a mission to prove that beautiful design and
              environmental responsibility can coexist in perfect harmony.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-[#6B6B6B] leading-relaxed">
              <p>
                Wooden Leaf began in 2018 when founder Yash Jangid noticed a gap
                in the home décor market.
              </p>
              <p>
                She envisioned a company that would celebrate traditional
                craftsmanship while embracing modern sustainability practices.
              </p>
              <p>
                Today, we work with skilled craftspeople across 12 countries,
                creating pieces that honor cultural heritage and the planet.
              </p>
            </div>
          </div>

          <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1645307356404-407a1083ec59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Sustainable forest"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Values</h2>
            <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FeatureCard key={index} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Journey</h2>
          <p className="text-xl text-[#6B6B6B]">Key milestones in our story</p>
        </div>

        <div className="space-y-8">
          {milestones.map((m, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-24 h-24 bg-[#6B7F59] rounded-full flex items-center justify-center">
                <span className="text-2xl font-serif text-white">{m.year}</span>
              </div>
              <div>
                <h3 className="text-2xl font-serif mb-2">{m.title}</h3>
                <p className="text-[#6B6B6B] text-lg">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-6">
          Join Our Mission
        </h2>
        <p className="text-xl text-[#6B6B6B] mb-8 max-w-2xl mx-auto">
          Every purchase supports sustainable forestry and fair-trade artisan
          communities
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" onClick={() => onNavigate("shop")}>
            Shop Now
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate("sustainability")}
          >
            Learn About Our Impact
          </Button>
        </div>
      </section>
    </div>
  );
}
