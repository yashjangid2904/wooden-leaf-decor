import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "../Button";

export function ContactPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#F5F1E8] pt-24 pb-20 md:pt-32 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Get in Touch</h1>
          <p className="text-xl text-[#6B6B6B] max-w-2xl mx-auto">
            Have a question or custom order request? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-3xl font-serif mb-6">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-[#6B6B6B]">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-6 py-3 rounded-xl bg-[#F5F1E8] border border-transparent focus:border-[#6B7F59] focus:outline-none focus:ring-2 focus:ring-[#6B7F59]/20"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block mb-2 text-[#6B6B6B]">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-6 py-3 rounded-xl bg-[#F5F1E8] border border-transparent focus:border-[#6B7F59] focus:outline-none focus:ring-2 focus:ring-[#6B7F59]/20"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block mb-2 text-[#6B6B6B]">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="w-full px-6 py-3 rounded-xl bg-[#F5F1E8] border border-transparent focus:border-[#6B7F59] focus:outline-none focus:ring-2 focus:ring-[#6B7F59]/20"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="custom">Custom Order</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-[#6B6B6B]">Message</label>
                <textarea
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  required
                  className="w-full px-6 py-3 rounded-xl bg-[#F5F1E8] border border-transparent focus:border-[#6B7F59] focus:outline-none focus:ring-2 focus:ring-[#6B7F59]/20 resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-serif mb-6">Contact Information</h2>

              <div className="space-y-6">
                <Info
                  icon={<Mail />}
                  title="Email"
                  text={["hello@woodenleaf.com", "support@woodenleaf.com"]}
                />

                <Info
                  icon={<Phone />}
                  title="Phone"
                  text={["+1 (555) 123-4567", "Mon-Fri, 9am–5pm PST"]}
                />

                <Info
                  icon={<MapPin />}
                  title="Address"
                  text={[
                    "123 Forest Lane",
                    "Portland, OR 97201",
                    "United States",
                  ]}
                />

                <Info
                  icon={<Clock />}
                  title="Business Hours"
                  text={[
                    "Mon–Fri: 9:00 AM – 5:00 PM",
                    "Saturday: 10:00 AM – 3:00 PM",
                    "Sunday: Closed",
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Small helper component */
function Info({ icon, title, text }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-[#F5F1E8] rounded-full flex items-center justify-center text-[#6B7F59]">
        {icon}
      </div>
      <div>
        <h3 className="font-serif mb-1">{title}</h3>
        {text.map((t, i) => (
          <p key={i} className="text-[#6B6B6B]">
            {t}
          </p>
        ))}
      </div>
    </div>
  );
}
