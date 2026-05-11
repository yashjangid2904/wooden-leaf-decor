import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const SECRET_CODE = "woodenleaf@admin";

export function AdminAuthModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError(false);
      setLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (loading) return;

    if (password === SECRET_CODE) {
      setLoading(true);
      setError(false);
      // Simulate verification delay for premium feel
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1200);
    } else {
      setError(true);
      // Shake animation effect handled by framer-motion
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#2C2C2C]/60 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              x: error ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ 
              duration: 0.4,
              x: { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
            }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#FAF8F5] w-full max-w-sm rounded-[32px] shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="relative p-8 flex flex-col items-center text-center">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-[#F4EFE9] rounded-full transition-colors text-[#8B847C]"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-[#6B7F59]/10 rounded-2xl flex items-center justify-center mb-6 text-[#6B7F59]">
                <Lock size={32} />
              </div>

              <h2 className="font-playfair text-2xl text-[#3E3832] mb-2">Secret Access</h2>
              <p className="text-[#8B847C] text-sm mb-8 italic">Enter artisan admin access code</p>

              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="relative group">
                  <input 
                    autoFocus
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`
                      w-full px-6 py-4 bg-white border-2 rounded-2xl text-center text-lg tracking-widest
                      transition-all duration-300 focus:outline-none
                      ${error 
                        ? "border-red-400 bg-red-50" 
                        : "border-[#E6E1D6] focus:border-[#6B7F59] focus:shadow-[0_0_20px_rgba(107,127,89,0.1)]"
                      }
                    `}
                  />
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 left-0 right-0 flex items-center justify-center gap-1 text-red-500 text-[10px] font-bold uppercase tracking-tighter"
                    >
                      <AlertCircle size={12} />
                      Invalid access code
                    </motion.div>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={loading || !password}
                  className="w-full bg-[#3E3832] text-white py-4 rounded-2xl font-bold tracking-[0.2em] uppercase text-[10px] flex items-center justify-center gap-3 hover:bg-[#2C2C2C] transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Verifying access...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
