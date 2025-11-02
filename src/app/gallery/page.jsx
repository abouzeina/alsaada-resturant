"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import RestaurantHeader from "@/components/RestaurantHeader";
import RestaurantFooter from "@/components/restaurant/RestaurantFooter";
import { X } from "lucide-react";

export default function GalleryPage() {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
      alt: "Delicious Egyptian feast",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
      alt: "Restaurant interior",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
      alt: "Traditional Egyptian dish",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1485195222519-40ecee44ade6?w=600&h=400&fit=crop",
      alt: "Grilled meat platter",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
      alt: "Restaurant ambiance",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop",
      alt: "Fresh salad",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
      alt: "Happy customers",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1555939594-58d7cb561404?w=600&h=400&fit=crop",
      alt: "Dessert showcase",
    },
  ];

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
            {language === "ar" ? "الصور" : "Gallery"}
          </h1>
          <p className="text-lg mt-4 opacity-90">
            {language === "ar"
              ? "استمتع برؤية أطباقنا اللذيذة وأجواء المطعم الرائعة"
              : "Enjoy our delicious dishes and restaurant ambiance"}
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="relative overflow-hidden rounded-lg cursor-pointer group h-64 bg-gray-200"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl">🔍</div>
                    <p className="mt-2 text-sm font-semibold">
                      {language === "ar" ? "اضغط للتكبير" : "Click to view"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      <RestaurantFooter />
    </div>
  );
}
