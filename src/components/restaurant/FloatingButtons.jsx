"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ShoppingCart, MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  const { language } = useLanguage();

  const handleWhatsApp = () => {
    const phoneNumber = "201001234567"; // Replace with actual number
    const message =
      language === "ar"
        ? "مرحباً، أود أن أطلب..."
        : "Hello, I would like to order...";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleOrderNow = () => {
    // Placeholder for order functionality
    alert(language === "ar" ? "خدمة الطلب قريباً" : "Order service coming soon");
  };

  return (
    <>
      {/* Order Now Button */}
      <button
        onClick={handleOrderNow}
        className="fixed bottom-8 left-8 z-30 bg-[#FFA500] hover:bg-[#FF8C00] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
        aria-label="Order now"
      >
        <ShoppingCart size={24} />
        <span className="hidden sm:inline font-bold">
          {language === "ar" ? "اطلب الآن" : "Order Now"}
        </span>
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-24 left-8 z-30 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
        <span className="hidden sm:inline font-bold">
          {language === "ar" ? "واتس" : "WhatsApp"}
        </span>
      </button>
    </>
  );
}
