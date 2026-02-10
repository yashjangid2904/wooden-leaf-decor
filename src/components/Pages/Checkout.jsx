import React from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Truck, PackageCheck } from "lucide-react";

export function CheckoutPage() {
  const { cart, cartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping = 99;
  const total = cartSubtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-16 md:py-20 px-4 text-center space-y-4 md:space-y-6">
        <h1 className="text-3xl md:text-4xl font-serif">Your cart is empty</h1>
        <p className="text-[#6B6B6B] text-sm md:text-base max-w-sm mx-auto">Add some handcrafted items to your collection before checking out.</p>
        <Link to="/shop" className="inline-block bg-[#6B7F59] text-white py-3 md:py-4 px-6 md:px-8 rounded-xl font-bold hover:bg-[#5A6C4A] transition-all text-sm md:text-base">
          Explore Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    console.log("Order Placed:", {
      items: cart,
      subtotal: cartSubtotal,
      shipping: shipping,
      total: total,
      timestamp: new Date().toISOString()
    });
    alert("Thank you for your order! (Check console for details)");
    clearCart();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
          <Link to="/shop" className="p-2 hover:bg-[#F5F1E8] rounded-full transition-colors">
            <ArrowLeft size={20} className="md:w-6 md:h-6" />
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Order Summary */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-sm border border-[#F5F1E8]">
              <h2 className="text-lg md:text-xl font-serif mb-4 md:mb-6 flex items-center gap-2">
                <PackageCheck size={18} className="text-[#6B7F59] md:w-5 md:h-5" />
                Order Summary
              </h2>
              <div className="divide-y divide-[#F5F1E8]">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 md:py-6 flex gap-4 md:gap-6 first:pt-0 last:pb-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-[#F5F1E8] rounded-xl md:rounded-2xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <h3 className="font-serif text-base md:text-lg truncate">{item.title}</h3>
                      <p className="text-xs md:text-sm text-[#6B6B6B] mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex flex-col justify-center items-end shrink-0">
                      <p className="font-bold text-sm md:text-base">₹{(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-[10px] md:text-xs text-[#A1A1A1]">₹{item.price.toFixed(2)} / item</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-[#F5F1E8] flex items-center gap-3 md:gap-4">
                <div className="p-2.5 md:p-3 bg-[#F5F1E8] rounded-lg md:rounded-xl text-[#6B7F59]"><Truck size={20} className="md:w-6 md:h-6" /></div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm">Secure Shipping</h4>
                  <p className="text-[10px] md:text-xs text-[#6B6B6B]">Packaged with sustainable materials</p>
                </div>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-[#F5F1E8] flex items-center gap-3 md:gap-4">
                <div className="p-2.5 md:p-3 bg-[#F5F1E8] rounded-lg md:rounded-xl text-[#6B7F59]"><ShieldCheck size={20} className="md:w-6 md:h-6" /></div>
                <div>
                  <h4 className="font-bold text-xs md:text-sm">Safe Checkout</h4>
                  <p className="text-[10px] md:text-xs text-[#6B6B6B]">100% encrypted payment system</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-[#F5F1E8] lg:sticky lg:top-32">
              <h2 className="text-lg md:text-xl font-serif mb-6 md:mb-8">Order Totals</h2>
              
              <div className="space-y-3 md:space-y-4 text-[#6B6B6B] text-sm md:text-base">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-[#2C2C2C] font-medium">₹{cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="text-[#2C2C2C] font-medium">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="pt-3 md:pt-4 border-t border-[#F5F1E8] flex justify-between items-center text-lg md:text-xl text-[#2C2C2C]">
                  <span className="font-serif">Grand Total</span>
                  <span className="font-bold">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#6B7F59] text-white py-4 md:py-5 rounded-xl font-bold text-base md:text-lg hover:bg-[#5A6C4A] transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl"
                >
                  Place Order
                </button>
                <p className="text-center text-[10px] md:text-xs text-[#A1A1A1]">
                  By placing your order, you agree to Wooden Leaf's terms of service and privacy policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
