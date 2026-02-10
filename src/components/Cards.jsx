import React from "react";

/* =======================
   Product Card
======================= */

export function ProductCard({ image, title, price, badge, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-[#F5F1E8] hover:border-[#6B7F59]/20"
    >
      <div className="relative overflow-hidden aspect-square flex items-center justify-center bg-[#F5F1E8]/50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />

        {badge && (
          <div className="absolute top-4 right-4 bg-[#6B7F59] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg z-10">
            {badge}
          </div>
        )}
        
        {/* Overlay effect on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6">
        <h3 className="font-serif text-lg mb-2 text-[#2C2C2C] group-hover:text-[#6B7F59] transition-colors duration-300">
          {title}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-[#6B7F59] font-medium text-lg">₹{Number(price).toFixed(2)}</p>
          <span className="text-[10px] text-[#A1A1A1] uppercase tracking-wider font-bold group-hover:text-[#6B7F59] transition-colors">
            View Details
          </span>
        </div>
      </div>
    </div>
  );
}

/* =======================
   Collection Card
======================= */

export function CollectionCard({ image, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-96"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h3 className="text-3xl font-serif mb-2">{title}</h3>
        <p className="text-white/90">{description}</p>
      </div>
    </div>
  );
}

/* =======================
   Blog Card
======================= */

export function BlogCard({ image, title, excerpt, date, category, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-[#6B6B6B] mb-3">
          <span className="text-[#6B7F59]">{category}</span>
          <span>•</span>
          <span>{date}</span>
        </div>

        <h3 className="text-xl font-serif mb-3 group-hover:text-[#6B7F59] transition-colors">
          {title}
        </h3>

        <p className="text-[#6B6B6B] leading-relaxed line-clamp-3">{excerpt}</p>
      </div>
    </div>
  );
}

/* =======================
   Feature Card
======================= */

export function FeatureCard({ icon, title, description }) {
  return (
    <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="w-16 h-16 bg-[#F5F1E8] rounded-full flex items-center justify-center mx-auto mb-4 text-[#6B7F59]">
        {icon}
      </div>

      <h3 className="font-serif mb-2">{title}</h3>
      <p className="text-[#6B6B6B] leading-relaxed">{description}</p>
    </div>
  );
}
