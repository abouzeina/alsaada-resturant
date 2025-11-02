"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function RestaurantFooter() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribeLoading, setSubscribeLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setSubscribeLoading(true);

    try {
      // Placeholder for newsletter subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(
        language === "ar" ? "تم الاشتراك بنجاح!" : "Subscribed successfully!",
      );
      setEmail("");
    } catch (error) {
      console.error(error);
      alert(language === "ar" ? "حدث خطأ" : "Error occurred");
    } finally {
      setSubscribeLoading(false);
    }
  };

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Restaurant Info */}
          <div>
            <h3 className="text-2xl font-bold text-[#FFA500] mb-4">
              {language === "ar" ? "مطعم السعادة" : "Al Saada"}
            </h3>
            <p className="text-gray-400 mb-6">
              {language === "ar"
                ? "مطعم مصري تقليدي يقدم أفضل الأطباق المصرية بجودة عالية"
                : "Traditional Egyptian restaurant serving the best Egyptian cuisine"}
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#FFA500] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#FFA500] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#FFA500] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-[#FFA500] mb-6">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="/#" className="hover:text-[#FFA500] transition-colors">
                  {language === "ar" ? "الرئيسية" : "Home"}
                </a>
              </li>
              <li>
                <a
                  href="/menu"
                  className="hover:text-[#FFA500] transition-colors"
                >
                  {language === "ar" ? "القائمة" : "Menu"}
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="hover:text-[#FFA500] transition-colors"
                >
                  {language === "ar" ? "الصور" : "Gallery"}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#FFA500] transition-colors"
                >
                  {language === "ar" ? "تواصل معنا" : "Contact"}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-[#FFA500] mb-6">
              {language === "ar" ? "اتصل بنا" : "Contact Info"}
            </h4>
            <div className="space-y-4 text-gray-400">
              <div className="flex gap-3 items-start">
                <Phone
                  size={20}
                  className="text-[#FFA500] flex-shrink-0 mt-1"
                />
                <div>
                  <p className="font-semibold text-white">+20 (100) 123-4567</p>
                  <p className="text-sm">Available 24/7</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin
                  size={20}
                  className="text-[#FFA500] flex-shrink-0 mt-1"
                />
                <div>
                  <p className="font-semibold text-white">Cairo, Egypt</p>
                  <p className="text-sm">Downtown Cairo</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Mail size={20} className="text-[#FFA500] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">info@alsaada.com</p>
                  <p className="text-sm">Email us anytime</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-[#FFA500] mb-6">
              {language === "ar" ? "النشرة البريدية" : "Newsletter"}
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              {language === "ar"
                ? "اشترك للحصول على آخر العروض والأخبار"
                : "Subscribe for latest offers and news"}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  language === "ar" ? "بريدك الإلكتروني" : "Your email"
                }
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
              />
              <button
                type="submit"
                disabled={subscribeLoading}
                className="w-full bg-[#FFA500] hover:bg-[#FF8C00] text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {subscribeLoading
                  ? language === "ar"
                    ? "جاري..."
                    : "Loading..."
                  : language === "ar"
                    ? "اشترك"
                    : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Hours */}
          <div className="mb-8 pb-8 border-b border-gray-700">
            <h4 className="text-lg font-bold text-[#FFA500] mb-4">
              {language === "ar" ? "ساعات العمل" : "Working Hours"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400 text-sm">
              <div>
                <p className="font-semibold text-white">
                  {language === "ar" ? "السبت - الخميس" : "Saturday - Thursday"}
                </p>
                <p>12:00 PM - 11:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-white">
                  {language === "ar" ? "الجمعة" : "Friday"}
                </p>
                <p>12:00 PM - 12:00 AM</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm">
            <p>
              &copy; 2024{" "}
              {language === "ar" ? "مطعم السعادة" : "Al Saada Restaurant"}.{" "}
              {language === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
