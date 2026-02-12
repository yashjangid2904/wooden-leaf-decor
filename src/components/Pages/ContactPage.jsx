import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from "lucide-react";

export function ContactPage() {
  // --- Existing form state (Preserved) ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // --- Form submit handler (Preserved) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  // --- Leaf Divider Component ---
  const LeafDivider = ({ align = "center" }) => (
    <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : "justify-start"}`}>
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9BBA8]"></div>
      <svg className="w-4 h-4 text-[#8B6E4E] opacity-50" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 0 C4 6 4 14 10 20 C16 14 16 6 10 0 Z" />
      </svg>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9BBA8]"></div>
    </div>
  );

  // --- Shared input styling ---
  const inputClass = "w-full px-5 py-3.5 rounded-xl bg-[#FAF8F5] border-2 border-[#C9BBA8] focus:border-[#6B7F59] focus:outline-none focus:ring-2 focus:ring-[#6B7F59]/20 font-inter text-[#3E2E1E] placeholder-[#A49B8C] transition-colors duration-300";

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative overflow-hidden">

      {/* --- Background Texture (Global) --- */}
      <div className="fixed inset-0 opacity-[0.4] pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        {/* Warm Background Band */}
        <div className="absolute inset-0 bg-[#F4EFE9]"></div>
        <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

        {/* Warm Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8B6E4E]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          {/* Badge */}
          <div className="inline-block mb-5 px-5 py-1.5 rounded-full border border-[#C9BBA8] bg-white/40 backdrop-blur-sm">
            <span className="text-[#8B6E4E] font-bold uppercase tracking-[0.2em] text-[10px]">
              We'd Love To Hear From You
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-playfair text-[#3E2E1E] mb-4 leading-tight">
            Get in <span className="italic text-[#6B7F59]">Touch</span>
          </h1>
          <LeafDivider />
          <p className="text-lg text-[#6B6B6B] font-inter max-w-2xl mx-auto mt-4 leading-relaxed">
            Have a question or custom order request? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* ==================== CONTACT FORM & INFO ==================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* --- Contact Form (3 columns) --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 bg-[#F4EFE9] p-8 md:p-10 rounded-[2rem] border-2 border-[#C9BBA8] relative overflow-hidden"
          >
            {/* Wood Texture */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-playfair text-[#3E2E1E] mb-1">Send Us a Message</h2>
              <LeafDivider align="left" />

              <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-inter font-medium text-[#6B6B6B]">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-inter font-medium text-[#6B6B6B]">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block mb-2 text-sm font-inter font-medium text-[#6B6B6B]">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                    className={inputClass}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="custom">Custom Order</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block mb-2 text-sm font-inter font-medium text-[#6B6B6B]">Message</label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    required
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#3E2E1E] text-[#F4EFE9] rounded-full font-bold tracking-wide transition-all duration-300 hover:bg-[#6B7F59] hover:scale-[1.02] shadow-lg shadow-[#3E2E1E]/15"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F4EFE9] via-[#C9BBA8] to-[#F4EFE9]"></div>
          </motion.div>

          {/* --- Contact Info (2 columns) --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Header */}
            <div className="mb-2">
              <h2 className="text-2xl md:text-3xl font-playfair text-[#3E2E1E] mb-1">Contact Information</h2>
              <LeafDivider align="left" />
            </div>

            {/* Info Cards */}
            <InfoCard
              icon={<Mail className="w-5 h-5" />}
              title="Email"
              text={["hello@woodenleaf.com", "support@woodenleaf.com"]}
            />

            <InfoCard
              icon={<Phone className="w-5 h-5" />}
              title="Phone"
              text={["+1 (555) 123-4567", "Mon-Fri, 9am–5pm PST"]}
            />

            <InfoCard
              icon={<MapPin className="w-5 h-5" />}
              title="Address"
              text={[
                "123 Forest Lane",
                "Portland, OR 97201",
                "United States",
              ]}
            />

            <InfoCard
              icon={<Clock className="w-5 h-5" />}
              title="Business Hours"
              text={[
                "Mon–Fri: 9:00 AM – 5:00 PM",
                "Saturday: 10:00 AM – 3:00 PM",
                "Sunday: Closed",
              ]}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* --- Themed Info Card Helper Component --- */
function InfoCard({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4 bg-[#F4EFE9] rounded-[1.2rem] border-2 border-[#C9BBA8] p-5 hover:shadow-md hover:border-[#6B7F59]/40 transition-all duration-300 relative overflow-hidden group">
      {/* Wood Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

      {/* Icon */}
      <div className="relative z-10 flex-shrink-0 w-11 h-11 bg-[#FAF8F5] border border-[#C9BBA8] rounded-full flex items-center justify-center text-[#6B7F59] group-hover:bg-[#6B7F59] group-hover:text-white transition-all duration-300">
        {icon}
      </div>

      {/* Text */}
      <div className="relative z-10">
        <h3 className="font-playfair text-lg text-[#3E2E1E] mb-1">{title}</h3>
        {text.map((t, i) => (
          <p key={i} className="text-[#6B6B6B] font-inter text-sm leading-relaxed">
            {t}
          </p>
        ))}
      </div>
    </div>
  );
}
