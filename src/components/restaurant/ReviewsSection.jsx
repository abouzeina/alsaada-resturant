"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Star } from "lucide-react";

export default function ReviewsSection() {
  const { language } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-[#C41E3A] mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {language === "ar" ? "تقييمات عملائنا" : "What Our Guests Say"}
          </h2>

          {/* Average Rating */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-4xl font-bold text-[#FFA500]">
              {averageRating}
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={28}
                  className={
                    i < Math.floor(averageRating)
                      ? "fill-[#FFA500] text-[#FFA500]"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <div className="text-gray-600">
              {language === "ar"
                ? `${reviews.length} تقييم`
                : `${reviews.length} Reviews`}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="text-center text-gray-500">
            {language === "ar" ? "جاري التحميل..." : "Loading..."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {reviews.slice(0, 6).map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-lg p-8 border border-gray-200 hover:border-[#C41E3A] transition-colors"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? "fill-[#FFA500] text-[#FFA500]"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-6 line-clamp-4">
                  "{review.comment}"
                </p>

                {/* Author */}
                <div className="text-sm font-semibold text-gray-800">
                  {review.author_name}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Review Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#C41E3A] hover:bg-[#A01628] text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            {language === "ar" ? "أضف تقييماً" : "Add Your Review"}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <ReviewForm language={language} onSubmit={() => setShowForm(false)} />
        )}
      </div>
    </section>
  );
}

function ReviewForm({ language, onSubmit }) {
  const [formData, setFormData] = useState({
    author_name: "",
    rating: "5",
    comment: "",
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
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      alert(
        language === "ar" ? "شكراً على تقييمك!" : "Thank you for your review!",
      );
      onSubmit();
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
    <div className="bg-gray-100 rounded-lg p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        {language === "ar" ? "شارك تقييمك" : "Share Your Review"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {language === "ar" ? "الاسم" : "Name"}
          </label>
          <input
            type="text"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {language === "ar" ? "التقييم" : "Rating"}
          </label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} {language === "ar" ? "نجوم" : "Stars"}
              </option>
            ))}
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {language === "ar" ? "التعليق" : "Comment"}
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
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
              : "Submitting..."
            : language === "ar"
              ? "أرسل التقييم"
              : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
