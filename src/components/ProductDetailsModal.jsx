import React, { useState, useEffect } from "react";
import { X, Minus, Plus, ShoppingCart, Star, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export function ProductDetailsModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      document.body.style.overflow = 'hidden';
      
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          if (isPreviewOpen) setIsPreviewOpen(false);
          else onClose();
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen, onClose, isPreviewOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleGoToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      >
        <div 
          className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in fade-in zoom-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#F5F1E8] text-[#6B6B6B] hover:bg-[#6B7F59] hover:text-white transition-all z-10"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="bg-[#F5F1E8] flex items-center justify-center p-8 md:p-12">
              <div 
                className="aspect-square w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white cursor-zoom-in group relative"
                onClick={() => setIsPreviewOpen(true)}
              >
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-[#6B7F59] shadow-lg">
                    <Plus size={20} />
                  </span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-[#6B7F59] text-xs font-bold uppercase tracking-widest mb-2 block">
                    {product.category.replace('-', ' ')}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] leading-tight">
                    {product.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center text-[#FBBF24]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} strokeWidth={i < 4 ? 0 : 2} />
                      ))}
                    </div>
                    <span className="text-xs text-[#6B6B6B] font-medium">(45 reviews)</span>
                  </div>
                </div>

                <p className="text-2xl text-[#6B7F59] font-medium">₹{Number(product.price).toFixed(2)}</p>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">Description</h4>
                  <p className="text-[#6B6B6B] leading-relaxed text-sm">
                    {product.description || "Individually handcrafted with precision, this piece represents the perfect blend of natural aesthetics and artisanal skill. Made from sustainably sourced materials, it's designed to bring warmth and timeless elegance to your living space."}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3 pt-4 border-t border-[#F5F1E8]">
                  <h4 className="text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">Quantity</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-[#F5F1E8] rounded-xl overflow-hidden bg-white">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-[#F5F1E8] transition-colors text-[#6B6B6B]"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-bold text-[#2C2C2C]">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-[#F5F1E8] transition-colors text-[#6B6B6B]"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="text-xs text-[#6B6B6B]">Only matching artisan pieces available</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 mt-8 border-t border-[#F5F1E8] flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#6B7F59] text-white py-4 px-8 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#5A6C4A] transition-all transform hover:-translate-y-0.5 shadow-md active:scale-95"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button 
                  onClick={handleGoToCheckout}
                  className="flex-1 border-2 border-[#6B7F59] text-[#6B7F59] py-4 px-8 rounded-xl font-bold hover:bg-[#6B7F59] hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Go to Checkout
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Image Preview Overlay */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setIsPreviewOpen(false)}
        >
          <button 
            onClick={() => setIsPreviewOpen(false)}
            className="absolute top-8 right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-10"
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 md:p-12 animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={product.image} 
              alt={product.title}
              className="max-w-[95%] max-h-[90%] object-contain shadow-2xl rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
