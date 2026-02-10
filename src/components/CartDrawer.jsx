import React from "react";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, cartSubtotal } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckoutClick = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#F5F1E8] flex items-center justify-between">
            <h2 className="text-xl font-serif text-[#2C2C2C] flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#6B7F59]" />
              Your Shopping Bag
            </h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F5F1E8] text-[#6B6B6B] transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-[#F5F1E8] rounded-full flex items-center justify-center text-[#A1A1A1]">
                  <ShoppingBag size={40} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-serif mb-1">Your bag is empty</h3>
                  <p className="text-sm text-[#6B6B6B]">Looks like you haven't added anything yet.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="text-[#6B7F59] font-bold text-sm hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-24 h-24 bg-[#F5F1E8] rounded-xl overflow-hidden shrink-0 border border-[#F5F1E8]">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-[#2C2C2C] leading-tight group-hover:text-[#6B7F59] transition-colors">
                          {item.title}
                        </h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#A1A1A1] hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-[#6B7F59] font-medium mt-1">₹{item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#F5F1E8] rounded-lg overflow-hidden bg-white">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 hover:bg-[#F5F1E8] text-[#6B6B6B]"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 hover:bg-[#F5F1E8] text-[#6B6B6B]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-bold text-sm text-[#2C2C2C]">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#F5F1E8] bg-[#F5F1E8]/30 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#6B6B6B] font-medium">Subtotal</span>
                <span className="text-2xl font-serif text-[#2C2C2C]">₹{cartSubtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-[#6B6B6B]">Shipping and taxes calculated at checkout</p>
              
              <div className="grid gap-3 pt-2">
                <button 
                  onClick={handleCheckoutClick}
                  className="w-full bg-[#6B7F59] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#5A6C4A] transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-lg"
                >
                  Go to Checkout
                  <ArrowRight size={18} />
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-2 text-sm text-[#6B6B6B] hover:text-[#6B7F59] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
