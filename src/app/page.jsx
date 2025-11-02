"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import RestaurantHeader from "@/components/RestaurantHeader";
import HeroSection from "@/components/restaurant/HeroSection";
import FeaturedMenu from "@/components/restaurant/FeaturedMenu";
import ReviewsSection from "@/components/restaurant/ReviewsSection";
import ChatWidget from "@/components/restaurant/ChatWidget";
import RestaurantFooter from "@/components/restaurant/RestaurantFooter";
import FloatingButtons from "@/components/restaurant/FloatingButtons";
import SpecialOfferPopup from "@/components/restaurant/SpecialOfferPopup";

export default function RestaurantHomePage() {
  const { t } = useLanguage();
  const [showSpecialOffer, setShowSpecialOffer] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      <RestaurantHeader />

      {/* Main content with padding for fixed header */}
      <div className="pt-24">
        <HeroSection />
        <FeaturedMenu />
        <ReviewsSection />
      </div>

      {/* Floating elements */}
      <FloatingButtons />
      <ChatWidget />

      {/* Special offer popup */}
      {showSpecialOffer && (
        <SpecialOfferPopup onClose={() => setShowSpecialOffer(false)} />
      )}

      <RestaurantFooter />
    </div>
  );
}
