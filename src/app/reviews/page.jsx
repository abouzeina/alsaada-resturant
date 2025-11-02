"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import RestaurantHeader from "@/components/RestaurantHeader";
import RestaurantFooter from "@/components/restaurant/RestaurantFooter";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  const { language } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    author_name: "",
    rating: "5",
    comment: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      const newReview = await response.json();
      setReviews([newReview, ...reviews]);
      setFormData({ author_name: "", rating: "5", comment: "" });
      setShowForm(false);
      alert(
        language === "ar" ? "شكراً على تقييمك!" : "Thank you for your review!",
      );
    } catch (error) {
      console.error(error);
      alert(
        language === "ar"
          ? "حدث خطأ، حاول مرة أخرى"
          : "Error occurred, please try again",
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

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
            {language === "ar" ? "التقييمات" : "Reviews"}
          </h1>
          <p className="text-lg mt-4 opacity-90">
            {language === "ar"
              ? "اقرأ آراء عملائنا الكرام"
              : "Read what our guests say about us"}
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16">
          {/* Average Rating */}
          <div className="text-center mb-16">
            <div className="bg-gray-50 rounded-lg p-12 inline-block">
              <div className="text-5xl font-bold text-[#FFA500] mb-4">
                {averageRating}
              </div>
              <div className="flex gap-2 justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={32}
                    className={
                      i < Math.floor(averageRating)
                        ? "fill-[#FFA500] text-[#FFA500]"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-600 text-lg">
                {language === "ar"
                  ? `${reviews.length} تقييم`
                  : `${reviews.length} Reviews`}
              </p>
            </div>
          </div>

          {/* Add Review Button */}
          <div className="text-center mb-16">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#C41E3A] hover:bg-[#A01628] text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
            >
              {language === "ar" ? "أضف تقييماً" : "Add Your Review"}
            </button>
          </div>

          {/* Review Form */}
          {showForm && (
            <div className="bg-gray-50 rounded-lg p-8 mb-16 max-w-2xl mx-auto">
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
                  <div className="flex gap-4">
                    {[5, 4, 3, 2, 1].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            rating: n.toString(),
                          }))
                        }
                        className={`text-4xl transition-transform hover:scale-110 ${
                          parseInt(formData.rating) >= n
                            ? "text-[#FFA500]"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
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

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="flex-1 bg-[#C41E3A] hover:bg-[#A01628] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {submitLoading
                      ? language === "ar"
                        ? "جاري الإرسال..."
                        : "Submitting..."
                      : language === "ar"
                        ? "أرسل التقييم"
                        : "Submit Review"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-colors"
                  >
                    {language === "ar" ? "إلغاء" : "Cancel"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          {loading ? (
            <div className="text-center text-gray-500 py-12">
              {language === "ar" ? "جاري التحميل..." : "Loading..."}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p>
                {language === "ar" ? "لا توجد تقييمات حالياً" : "No reviews yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 rounded-lg p-8"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < review.rating
                            ? "fill-[#FFA500] text-[#FFA500]"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                    "{review.comment}"
                  </p>

                  {/* Author */}
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-gray-800">
                      {review.author_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString(
                        language === "ar" ? "ar-EG" : "en-US",
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <RestaurantFooter />
    </div>
  );
}
