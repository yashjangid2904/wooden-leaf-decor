import { CollectionCard } from "../Cards";

export function CollectionsPage({ onNavigate }) {
  const collections = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1624958545223-2944616555bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Minimalist Living",
      description: "Clean lines and natural textures for modern spaces",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1645307356404-407a1083ec59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Forest Collection",
      description: "Inspired by the serene beauty of woodland landscapes",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1722411927625-0e478acf502b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Artisan Favorites",
      description: "Hand-selected pieces showcasing exceptional craftsmanship",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1768637087224-cffa17561c53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Sustainable Kitchen",
      description: "Eco-friendly essentials for conscious cooking",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1743148509752-9ea6072ea35f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Plant Lovers",
      description: "Beautiful planters and botanical accessories",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1582345486418-0eeaeecb5dda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      title: "Cozy Spaces",
      description: "Warmth and comfort for relaxing environments",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#F5F1E8] pt-24 pb-20 md:pt-32 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">
            Our Collections
          </h1>
          <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">
            Curated selections of handcrafted pieces designed to bring natural
            beauty to every corner of your home
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              image={collection.image}
              title={collection.title}
              description={collection.description}
              onClick={() => onNavigate("shop")}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#6B7F59] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            We offer custom orders and can create bespoke pieces tailored to
            your space.
          </p>
          <button
            onClick={() => onNavigate("contact")}
            className="bg-white text-[#6B7F59] px-10 py-4 rounded-full hover:bg-[#E8DCC4] transition-colors"
          >
            Request Custom Order
          </button>
        </div>
      </section>
    </div>
  );
}
