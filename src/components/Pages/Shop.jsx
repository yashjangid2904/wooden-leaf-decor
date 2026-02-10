import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "../Cards";
import { ProductDetailsModal } from "../ProductDetailsModal";
import products from "../data/products";


export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const categories = [
    { id: "all", name: "All Products" },
    { id: "home-decor", name: "Home Decor" },
    { id: "decorative-accents", name: "Decorative Accents" },
    { id: "wall-decor", name: "Wall Decor" },
    { id: "wall-shelves", name: "Wall Shelves & Hooks" },
    { id: "tabletop-accents", name: "Tabletop & Accents" },
    { id: "furniture", name: "Furniture" },
    { id: "kitchen-dining", name: "Kitchen & Dining" },
    { id: "planters-stands", name: "Planters & Stands" },
    { id: "lighting", name: "Lighting" },
    { id: "gift-sets", name: "Gift Sets" },
    { id: "pouffes", name: "Pouffes" },
  ];

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "under-50", name: "Under ₹50" },
    { id: "50-100", name: "₹50 - ₹100" },
    { id: "100-200", name: "₹100 - ₹200" },
    { id: "over-200", name: "Over ₹200" },
  ];


  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "all" || product.category === selectedCategory;

    let priceMatch = true;
    if (priceRange === "under-50") priceMatch = product.price < 50;
    else if (priceRange === "50-100")
      priceMatch = product.price >= 50 && product.price <= 100;
    else if (priceRange === "100-200")
      priceMatch = product.price > 100 && product.price <= 200;
    else if (priceRange === "over-200") priceMatch = product.price > 200;

    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-[#F5F1E8] pt-24 pb-12 md:pt-32 md:pb-20 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-3 md:mb-4">Shop All Products</h1>
        <p className="text-[#6B6B6B] text-sm md:text-base max-w-md mx-auto">
          Discover our complete collection of handcrafted wooden home décor
        </p>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-6 md:space-y-8 md:sticky md:top-24 md:self-start">
          <div>
            <h3 className="font-serif mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
              <SlidersHorizontal size={18} />
              Categories
            </h3>
            <div className="flex flex-wrap md:flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-left transition-all text-sm md:text-base ${
                    selectedCategory === cat.id
                      ? "bg-[#6B7F59] text-white shadow-md"
                      : "bg-white border border-[#F5F1E8] hover:bg-[#F5F1E8]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif mb-3 md:mb-4 text-sm md:text-base">Price Range</h3>
            <div className="flex flex-wrap md:flex-col gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setPriceRange(range.id)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-left transition-all text-sm md:text-base ${
                    priceRange === range.id
                      ? "bg-[#6B7F59] text-white shadow-md"
                      : "bg-white border border-[#F5F1E8] hover:bg-[#F5F1E8]"
                  }`}
                >
                  {range.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <p className="mb-4 md:mb-6 text-[#6B6B6B] font-medium text-sm md:text-base">
            Showing {filteredProducts.length} products
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 md:py-20">
              <p className="text-lg md:text-xl text-[#6B6B6B] font-serif">No products found matching your filters.</p>
              <button 
                onClick={() => {setSelectedCategory("all"); setPriceRange("all");}}
                className="mt-4 text-[#6B7F59] font-bold hover:underline text-sm md:text-base"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Details Modal */}
      <ProductDetailsModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

