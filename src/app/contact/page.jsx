"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import RestaurantHeader from "@/components/RestaurantHeader";
import RestaurantFooter from "@/components/restaurant/RestaurantFooter";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Placeholder for form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(
        language === "ar"
          ? "تم إرسال رسالتك بنجاح!"
          : "Your message has been sent successfully!",
      );
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      alert(language === "ar" ? "حدث خطأ" : "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <RestaurantHeader />

      <div className="pt-24 pb-20">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#C41E3A] to-[#FFA500] text-white py-16 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {language === "ar" ? "تواصل معنا" : "Contact Us"}
          </h1>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-[#C41E3A] mb-12">
                {language === "ar" ? "معلومات التواصل" : "Get In Touch"}
              </h2>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Phone size={32} className="text-[#FFA500]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {language === "ar" ? "الهاتف" : "Phone"}
                    </h3>
                    <p className="text-gray-600">+20 (100) 123-4567</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {language === "ar" ? "متاح 24/7" : "Available 24/7"}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Mail size={32} className="text-[#FFA500]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </h3>
                    <p className="text-gray-600">info@alsaada.com</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {language === "ar"
                        ? "سنرد عليك في أسرع وقت"
                        : "We'll respond ASAP"}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <MapPin size={32} className="text-[#FFA500]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {language === "ar" ? "العنوان" : "Location"}
                    </h3>
                    <p className="text-gray-600">Downtown Cairo, Egypt</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {language === "ar"
                        ? "في قلب القاهرة"
                        : "In the heart of Cairo"}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Clock size={32} className="text-[#FFA500]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {language === "ar" ? "ساعات العمل" : "Working Hours"}
                    </h3>
                    <p className="text-gray-600">
                      {language === "ar" ? "السبت - الخميس: " : "Sat - Thu: "}
                      12:00 PM - 11:00 PM
                    </p>
                    <p className="text-gray-600">
                      {language === "ar" ? "الجمعة: " : "Friday: "}
                      12:00 PM - 12:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#C41E3A] mb-8">
                {language === "ar" ? "أرسل لنا رسالة" : "Send us a Message"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "ar" ? "الاسم" : "Name"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "ar" ? "الهاتف" : "Phone"}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "ar" ? "الموضوع" : "Subject"}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {language === "ar" ? "الرسالة" : "Message"}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C41E3A] hover:bg-[#A01628] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading
                    ? language === "ar"
                      ? "جاري الإرسال..."
                      : "Sending..."
                    : language === "ar"
                      ? "أرسل الرسالة"
                      : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <RestaurantFooter />
    </div>
  );
}
