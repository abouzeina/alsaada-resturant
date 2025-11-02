"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function FeaturedMenu() {
  const { language } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/api/menu?category=Appetizers");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setItems(data.slice(0, 6));
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#C41E3A] mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {language === "ar" ? "الأطباق المميزة" : "Featured Dishes"}
          </h2>
          <p className="text-gray-600 text-lg">
            {language === "ar"
              ? "جرب أشهر الأطباق المصرية من مطبخنا الفريد"
              : "Try our most popular Egyptian dishes"}
          </p>
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="text-center text-gray-500">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img
                    src={item.image_url}
                    alt={language === "ar" ? item.name_ar : item.name_en}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {language === "ar" ? item.name_ar : item.name_en}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {language === "ar"
                      ? item.description_ar
                      : item.description_en}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#C41E3A]">
                      {item.price} {language === "ar" ? "ج.م" : "EGP"}
                    </span>
                    <button className="bg-[#C41E3A] hover:bg-[#A01628] text-white px-4 py-2 rounded-lg transition-colors">
                      {language === "ar" ? "طلب" : "Order"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Menu Button */}
        <div className="text-center mt-12">
          <a
            href="/menu"
            className="inline-block bg-[#FFA500] hover:bg-[#FF8C00] text-white font-bold py-3 px-8 rounded-full transition-colors text-lg"
          >
            {language === "ar" ? "عرض القائمة كاملة" : "View Full Menu"}
          </a>
        </div>
      </div>
    </section>
  );
}
