import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Truck, PackageCheck, MapPin } from "lucide-react";

export function CheckoutPage() {
  const { cart, cartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: ""
  });

  const total = cartSubtotal;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.address || !formData.city || !formData.phone) {
      alert("Please fill in all required shipping and contact fields.");
      return;
    }

    // Replace this with your actual WhatsApp business number (include country code, no +)
    // For India, start with 91 followed by the 10-digit number
    const whatsappNumber = "917737863869";

    const message = `*New Order Request*%0A%0A*Customer Details:*%0A👤 Name: ${formData.firstName} ${formData.lastName}%0A📧 Email: ${formData.email}%0A📞 Phone: ${formData.phone}%0A📍 Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}%0A%0A*Order Items:*%0A${cart.map(item => `▪️ ${item.title} (x${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}`).join('%0A')}%0A%0A*Payment Summary:*%0ASubtotal: ₹${cartSubtotal.toFixed(2)}%0AShipping: To be calculated based on delivery location%0A*Grand Total: ₹${cartSubtotal.toFixed(2)} + Shipping*`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Clear cart and go back home
    clearCart();
    navigate("/");
    window.scrollTo(0, 0);
  };

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

  return (
    <div className="min-h-screen bg-[#FDFCF9] py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
          <Link to="/shop" className="p-2 hover:bg-[#F5F1E8] rounded-full transition-colors">
            <ArrowLeft size={20} className="md:w-6 md:h-6" />
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif">Checkout</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Form Fields */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">

            {/* Shipping Info */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm border border-[#F5F1E8]">
              <h2 className="text-lg md:text-xl font-serif mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-[#6B7F59]" />
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#6B6B6B] uppercase">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full p-3 rounded-xl border border-[#F5F1E8] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#6B7F59] transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#6B6B6B] uppercase">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full p-3 rounded-xl border border-[#F5F1E8] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#6B7F59] transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#6B6B6B] uppercase">Email Address</label>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full p-3 rounded-xl border border-[#F5F1E8] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#6B7F59] transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#6B6B6B] uppercase">Phone Number</label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full p-3 rounded-xl border border-[#F5F1E8] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#6B7F59] transition-all" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-[#6B6B6B] uppercase">Address</label>
                  <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full p-3 rounded-xl border border-[#F5F1E8] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#6B7F59] transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#6B6B6B] uppercase">City</label>
                  <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full p-3 rounded-xl border border-[#F5F1E8] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#6B7F59] transition-all" />
                </div>
                <div className="space-y-1 flex gap-4">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-bold text-[#6B6B6B] uppercase">State</label>
                    <input required name="state" value={formData.state} onChange={handleInputChange} type="text" className="w-full p-3 rounded-xl border border-[#F5F1E8] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#6B7F59] transition-all" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-bold text-[#6B6B6B] uppercase">ZIP</label>
                    <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} type="text" className="w-full p-3 rounded-xl border border-[#F5F1E8] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#6B7F59] transition-all" />
                  </div>
                </div>
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
                  <h4 className="font-bold text-xs md:text-sm">Direct Support</h4>
                  <p className="text-[10px] md:text-xs text-[#6B6B6B]">Chat directly with us on WhatsApp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Payment Button */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-[#F5F1E8] lg:sticky lg:top-32">
              <h2 className="text-lg md:text-xl font-serif mb-6 md:mb-8 flex items-center gap-2">
                <PackageCheck size={20} className="text-[#6B7F59]" />
                Order Summary
              </h2>

              <div className="divide-y divide-[#F5F1E8] mb-6 max-h-[300px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 first:pt-0">
                    <div className="w-16 h-16 bg-[#F5F1E8] rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <h3 className="font-serif text-sm truncate">{item.title}</h3>
                      <p className="text-xs text-[#6B6B6B] mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex flex-col justify-center items-end shrink-0">
                      <p className="font-bold text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 md:space-y-4 text-[#6B6B6B] text-sm md:text-base border-t border-[#F5F1E8] pt-6">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-[#2C2C2C] font-medium">₹{cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span>Shipping</span>
                  <span className="text-[#6B7F59] font-medium text-xs md:text-sm text-right">Calculated on WhatsApp</span>
                </div>
                <div className="pt-3 md:pt-4 border-t border-[#F5F1E8] flex justify-between items-center text-lg md:text-xl text-[#2C2C2C]">
                  <span className="font-serif">Grand Total</span>
                  <span className="font-bold text-base md:text-lg">₹{cartSubtotal.toFixed(2)} <span className="text-sm text-[#6B6B6B] font-normal">+ Shipping</span></span>
                </div>
              </div>

              <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                <button
                  type="submit"
                  className="w-full bg-[#25D366] text-white py-4 md:py-5 rounded-xl font-bold text-base md:text-lg hover:bg-[#20b858] transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl flex justify-center items-center gap-2"
                >
                  Order on WhatsApp <ArrowLeft size={18} className="rotate-180" />
                </button>
                <p className="text-center text-[10px] md:text-xs text-[#A1A1A1]">
                  By placing your order, you agree to Wooden Leaf's terms of service and privacy policy.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
