"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { X } from "lucide-react";

export default function SpecialOfferPopup({ onClose }) {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden animate-scale-up">
        {/* Header with image */}
        <div className="relative h-40 bg-gradient-to-r from-[#C41E3A] to-[#FFA500]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-5xl mb-2">🍽️</div>
              <h2 className="text-2xl font-bold">
                {language === "ar" ? "عرض خاص" : "Special Offer"}
              </h2>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="mb-6">
            <p className="text-gray-600 mb-2 text-sm">
              {language === "ar" ? "احصل على" : "Get"}
            </p>
            <div className="text-4xl font-bold text-[#C41E3A] mb-2">
              20% OFF
            </div>
            <p className="text-gray-600">
              {language === "ar"
                ? "على جميع الأطباق الرئيسية اليوم فقط!"
                : "on all main dishes today only!"}
            </p>
          </div>

          {/* Promo Code */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              {language === "ar" ? "كود الخصم:" : "Promo Code:"}
            </p>
            <div className="font-bold text-2xl text-[#C41E3A] font-mono">
              SAADA20
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              className="w-full bg-[#C41E3A] hover:bg-[#A01628] text-white font-bold py-3 rounded-lg transition-colors"
              onClick={handleClose}
            >
              {language === "ar" ? "اطلب الآن" : "Order Now"}
            </button>
            <button
              onClick={handleClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-colors"
            >
              {language === "ar" ? "تجاهل" : "Dismiss"}
            </button>
          </div>

          {/* Footer text */}
          <p className="text-xs text-gray-500 mt-4">
            {language === "ar"
              ? "صالح حتى نهاية اليوم"
              : "Valid until end of day"}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleUp {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        .animate-scale-up {
          animation: scaleUp 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
