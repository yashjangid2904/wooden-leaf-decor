import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Edit2, Save, Upload, Search, Package, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

const CATEGORIES = [
  { id: "home-decor", name: "Home Decor" },
  { id: "decorative-accents", name: "Decorative Accents" },
  { id: "wall-decor", name: "Wall Decor" },
  { id: "shelves-hooks", name: "Shelves & Hooks" },
  { id: "tabletop-accents", name: "Tabletop Accents" },
  { id: "furniture", name: "Furniture" },
  { id: "kitchen-dining", name: "Kitchen & Dining" },
  { id: "planters-stands", name: "Planters & Stands" },
  { id: "lighting", name: "Lighting" },
  { id: "gift-sets", name: "Gift Sets" },
  { id: "pouffes", name: "Pouffes" },
];

const BADGES = ["None", "New", "Popular", "Trending", "Best Seller", "Premium", "Art", "Eco Choice"];

export function AdminPanel({ isOpen, onClose }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "home-decor",
    badge: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching products:', error);
    else setProducts(data || []);
    setLoading(false);
  }

  const handleOpenForm = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        price: product.price,
        category: product.category,
        badge: product.badge || "",
        description: product.description,
        image: product.image
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: "",
        price: "",
        category: "home-decor",
        badge: "",
        description: "",
        image: ""
      });
    }
    setIsFormOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    setFormData(prev => ({ ...prev, image: publicUrl }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      badge: formData.badge === "None" ? null : formData.badge
    };

    let error;
    if (editingProduct) {
      const { error: updateError } = await supabase
        .from('products')
        .update(payload)
        .eq('id', editingProduct.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('products')
        .insert([payload]);
      error = insertError;
    }

    if (error) {
      console.error('Error saving product:', error);
    } else {
      setIsFormOpen(false);
      fetchProducts();
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) console.error('Error deleting product:', error);
    else fetchProducts();
    setLoading(false);
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-[#FAF8F5] w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 py-6 bg-[#F4EFE9] border-b border-[#E6E1D6] flex items-center justify-between">
              <div>
                <h2 className="font-playfair text-2xl text-[#5D4037]">Product Management</h2>
                <p className="text-sm text-[#8B847C]">Manage your handcrafted collection</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[#E6E1D6] rounded-full transition-colors text-[#5D4037]"
              >
                <X size={24} />
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
              {/* Left Side: Product List */}
              <div className="flex-1 flex flex-col border-r border-[#E6E1D6] overflow-hidden">
                <div className="p-6 space-y-4 border-b border-[#E6E1D6] bg-white/50">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B847C]" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xl text-sm focus:outline-none focus:border-[#6B7F59] transition-colors"
                      />
                    </div>
                    <button 
                      onClick={() => handleOpenForm()}
                      className="bg-[#6B7F59] text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-[#5A6C4A] transition-colors shadow-md"
                    >
                      <Plus size={18} /> Add New
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-3">
                  {loading && products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[#8B847C]">
                      <Loader2 className="animate-spin mb-2" />
                      <p>Loading products...</p>
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[#8B847C]">
                      <Package size={48} className="opacity-20 mb-4" />
                      <p>No products found</p>
                    </div>
                  ) : (
                    filteredProducts.map(product => (
                      <div 
                        key={product.id}
                        className="bg-white border border-[#E6E1D6] p-3 rounded-2xl flex items-center gap-4 group hover:shadow-md transition-shadow"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F4EFE9] flex-shrink-0">
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-[#2C2C2C] truncate">{product.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-[#8B847C]">
                            <span className="bg-[#FAF8F5] px-2 py-0.5 rounded-full border border-[#E6E1D6]">{product.category}</span>
                            <span>₹{product.price}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleOpenForm(product)}
                            className="p-2 text-[#6B7F59] hover:bg-[#6B7F59]/10 rounded-lg"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right Side: Form (Desktop Modal or Sidebar) */}
              <AnimatePresence>
                {isFormOpen && (
                  <motion.div 
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    className="w-full md:w-96 bg-white overflow-y-auto"
                  >
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-playfair text-xl text-[#5D4037]">
                          {editingProduct ? "Edit Product" : "New Product"}
                        </h3>
                        <button type="button" onClick={() => setIsFormOpen(false)} className="text-[#8B847C]">
                          <X size={20} />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B847C] mb-1.5 block">Product Name</label>
                          <input 
                            required
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xl focus:outline-none focus:border-[#6B7F59]"
                            placeholder="e.g. Sculpted Ceramic Vase"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B847C] mb-1.5 block">Price (₹)</label>
                            <input 
                              required
                              type="number"
                              value={formData.price}
                              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                              className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xl focus:outline-none focus:border-[#6B7F59]"
                              placeholder="0.00"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B847C] mb-1.5 block">Badge</label>
                            <select 
                              value={formData.badge}
                              onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                              className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xl focus:outline-none focus:border-[#6B7F59]"
                            >
                              {BADGES.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B847C] mb-1.5 block">Category</label>
                          <select 
                            value={formData.category}
                            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xl focus:outline-none focus:border-[#6B7F59]"
                          >
                            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B847C] mb-1.5 block">Description</label>
                          <textarea 
                            required
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E6E1D6] rounded-xl focus:outline-none focus:border-[#6B7F59] resize-none"
                            placeholder="Tell the story of this piece..."
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B847C] mb-1.5 block">Product Image</label>
                          <div className="space-y-3">
                            {formData.image ? (
                              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#E6E1D6]">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                <button 
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur rounded-full text-red-500 shadow-sm"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center aspect-[4/5] border-2 border-dashed border-[#E6E1D6] rounded-2xl bg-[#FAF8F5] cursor-pointer hover:border-[#6B7F59] transition-colors group">
                                {uploading ? (
                                  <Loader2 className="animate-spin text-[#6B7F59]" />
                                ) : (
                                  <>
                                    <Upload className="text-[#8B847C] group-hover:text-[#6B7F59] transition-colors mb-2" size={24} />
                                    <span className="text-xs text-[#8B847C]">Upload Product Image</span>
                                  </>
                                )}
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                              </label>
                            )}
                          </div>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full bg-[#5D4037] text-white py-4 rounded-2xl font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-2 hover:bg-[#4A332C] transition-all shadow-lg disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        {editingProduct ? "Update Product" : "Publish Product"}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
