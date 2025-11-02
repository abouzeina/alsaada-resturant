"use client";

import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function RestaurantHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t, isArabic } = useLanguage();

  const navItems = [
    { label_en: "Home", label_ar: "الرئيسية", href: "/" },
    { label_en: "About", label_ar: "عن المطعم", href: "/about" },
    { label_en: "Menu", label_ar: "القائمة", href: "/menu" },
    { label_en: "Gallery", label_ar: "الصور", href: "/gallery" },
    { label_en: "Reviews", label_ar: "التقييمات", href: "/reviews" },
    { label_en: "Contact", label_ar: "تواصل معنا", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex flex-col items-center gap-1">
            <h1
              className="text-2xl md:text-3xl font-bold text-[#C41E3A] hover:opacity-80 transition-opacity"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("restaurant", "مطعم السعادة", "Al Saada")}
            </h1>
            <span className="text-xs text-gray-600">
              {t("slogan", "طعامك السعادة", "Your Happiness Cuisine")}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 font-medium text-sm hover:text-[#C41E3A] transition-colors duration-200"
              >
                {language === "ar" ? item.label_ar : item.label_en}
              </a>
            ))}
          </nav>

          {/* Right Controls - Language Toggle & Hamburger */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-[#C41E3A] transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={18} className="text-gray-700" />
              <span className="text-sm font-medium text-gray-700 w-8">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 font-medium hover:text-[#C41E3A] transition-colors"
                >
                  {language === "ar" ? item.label_ar : item.label_en}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
