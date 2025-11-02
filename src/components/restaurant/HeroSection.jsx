"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { language, t, isArabic } = useLanguage();
  const [showReservation, setShowReservation] = useState(false);

  return (
    <section className="relative h-screen min-h-[600px] bg-gradient-to-r from-[#8B0000] to-[#DC143C] flex items-center justify-center overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35] opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFA500] opacity-20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        {/* Restaurant Name */}
        <h1
          className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {language === "ar" ? "مطعم السعادة" : "Al Saada"}
        </h1>

        {/* Slogan */}
        <p
          className="text-xl md:text-2xl mb-12 font-light opacity-95"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {language === "ar"
            ? "طعامك السعادة تبدأ من أول لقمة!"
            : "Your happiness begins with every bite!"}
        </p>

        {/* CTA Button */}
        <button
          onClick={() => setShowReservation(true)}
          className="bg-[#FFA500] hover:bg-[#FF8C00] text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {language === "ar" ? "احجز طاولة" : "Book a Table"}
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Reservation Modal */}
      {showReservation && (
        <ReservationModal onClose={() => setShowReservation(false)} />
      )}
    </section>
  );
}

function ReservationModal({ onClose }) {
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reservation_date: "",
    reservation_time: "",
    guests_count: "2",
    special_requests: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }

      alert(
        language === "ar" ? "تم حجز الطاولة بنجاح!" : "Reservation successful!",
      );
      onClose();
    } catch (error) {
      console.error(error);
      alert(
        language === "ar"
          ? "حدث خطأ، حاول مرة أخرى"
          : "Error occurred, please try again",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-[#C41E3A] text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {language === "ar" ? "احجز طاولة" : "Make a Reservation"}
          </h2>
          <button onClick={onClose} className="text-2xl hover:opacity-80">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === "ar" ? "رقم الهاتف" : "Phone"}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === "ar" ? "عدد الأشخاص" : "Number of Guests"}
              </label>
              <select
                name="guests_count"
                value={formData.guests_count}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n} {language === "ar" ? "أشخاص" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === "ar" ? "التاريخ" : "Date"}
              </label>
              <input
                type="date"
                name="reservation_date"
                value={formData.reservation_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {language === "ar" ? "الوقت" : "Time"}
              </label>
              <input
                type="time"
                name="reservation_time"
                value={formData.reservation_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {language === "ar" ? "طلبات خاصة" : "Special Requests"}
            </label>
            <textarea
              name="special_requests"
              value={formData.special_requests}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#C41E3A] hover:bg-[#A01628] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading
                ? language === "ar"
                  ? "جاري التحميل..."
                  : "Loading..."
                : language === "ar"
                  ? "تأكيد الحجز"
                  : "Confirm Reservation"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-colors"
            >
              {language === "ar" ? "إلغاء" : "Cancel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
