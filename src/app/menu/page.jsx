"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import RestaurantHeader from "@/components/RestaurantHeader";
import RestaurantFooter from "@/components/restaurant/RestaurantFooter";
import { Star } from "lucide-react";

export default function MenuPage() {
  const { language } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Appetizers", "Main Dishes", "Desserts", "Drinks"];
  const categoriesAr = [
    "الكل",
    "المقبلات",
    "الأطباق الرئيسية",
    "الحلويات",
    "المشروبات",
  ];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/api/menu");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

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
            {language === "ar" ? "القائمة" : "Our Menu"}
          </h1>
          <p className="text-lg mt-4 opacity-90">
            {language === "ar"
              ? "استكشف أشهر الأطباق المصرية"
              : "Explore our delicious Egyptian dishes"}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category, idx) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#C41E3A] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {language === "ar" ? categoriesAr[idx] : category}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          {loading ? (
            <div className="text-center text-gray-500 py-12">
              {language === "ar" ? "جاري التحميل..." : "Loading..."}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="h-64 overflow-hidden bg-gray-200">
                    <img
                      src={item.image_url}
                      alt={language === "ar" ? item.name_ar : item.name_en}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold text-gray-800 flex-1">
                        {language === "ar" ? item.name_ar : item.name_en}
                      </h3>
                      <span className="text-xs font-semibold text-[#FFA500] bg-orange-100 px-3 py-1 rounded-full whitespace-nowrap ml-2">
                        {language === "ar"
                          ? categoriesAr[categories.indexOf(item.category)]
                          : item.category}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {language === "ar"
                        ? item.description_ar
                        : item.description_en}
                    </p>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-3xl font-bold text-[#C41E3A]">
                          {item.price}
                        </span>
                        <span className="text-gray-600 ml-2">
                          {language === "ar" ? "ج.م" : "EGP"}
                        </span>
                      </div>
                      <button className="bg-[#C41E3A] hover:bg-[#A01628] text-white px-6 py-2 rounded-lg transition-colors font-semibold">
                        {language === "ar" ? "طلب" : "Order"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredItems.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">
                {language === "ar"
                  ? "لا توجد أطباق في هذه الفئة"
                  : "No items in this category"}
              </p>
            </div>
          )}
        </div>
      </div>

      <RestaurantFooter />
    </div>
  );
}
