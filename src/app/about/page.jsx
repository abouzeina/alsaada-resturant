"use client";

import { useLanguage } from "@/context/LanguageContext";
import RestaurantHeader from "@/components/RestaurantHeader";
import RestaurantFooter from "@/components/restaurant/RestaurantFooter";

export default function AboutPage() {
  const { language } = useLanguage();

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
            {language === "ar" ? "عن المطعم" : "About Us"}
          </h1>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16">
          {/* Story Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#C41E3A] mb-6">
              {language === "ar" ? "قصتنا" : "Our Story"}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {language === "ar"
                ? "مطعم السعادة هو مؤسسة عائلية تقليدية توفر أفضل الأطباق المصرية الأصلية. منذ تأسيسنا عام 2010، التزمنا بتقديم طعام طازج وشهي مع خدمة ممتازة. كل طبق يُعد بعناية واهتمام من قبل شيفاتنا الموهوبين."
                : "Al Saada Restaurant is a traditional family establishment serving the finest authentic Egyptian cuisine. Since our establishment in 2010, we have been committed to providing fresh, delicious food with excellent service. Every dish is carefully prepared by our talented chefs with passion and attention to detail."}
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              {language === "ar"
                ? "نؤمن أن السعادة الحقيقية تبدأ من أول لقمة، ولذلك نختار أفضل المكونات الطازجة يومياً من أسواق القاهرة. فريقنا المحترف يعمل بإخلاص لضمان تجربة طعام لا تُنسى لكل عميل."
                : "We believe that true happiness begins with the first bite, which is why we source only the freshest ingredients daily from Cairo's best markets. Our dedicated team works tirelessly to ensure an unforgettable dining experience for every guest."}
            </p>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#C41E3A] mb-12">
              {language === "ar" ? "قيمنا" : "Our Values"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quality */}
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {language === "ar" ? "الجودة" : "Quality"}
                </h3>
                <p className="text-gray-600">
                  {language === "ar"
                    ? "نستخدم أفضل المكونات والأساليب التقليدية"
                    : "We use only the best ingredients and traditional methods"}
                </p>
              </div>

              {/* Authenticity */}
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="text-5xl mb-4">🇪🇬</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {language === "ar" ? "الأصالة" : "Authenticity"}
                </h3>
                <p className="text-gray-600">
                  {language === "ar"
                    ? "نحافظ على الطعم الأصلي للمطبخ المصري"
                    : "We preserve the authentic taste of Egyptian cuisine"}
                </p>
              </div>

              {/* Service */}
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="text-5xl mb-4">❤️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {language === "ar" ? "الخدمة" : "Service"}
                </h3>
                <p className="text-gray-600">
                  {language === "ar"
                    ? "خدمة بقلب ودود مع الاهتمام بكل تفصيل"
                    : "Service with heart and attention to every detail"}
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h2 className="text-3xl font-bold text-[#C41E3A] mb-12">
              {language === "ar" ? "فريقنا" : "Our Team"}
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              {language === "ar"
                ? "يتكون فريقنا من طهاة متخصصين وموظفين ودودين مكرسين لتقديم أفضل تجربة طعام. كل عضو في فريقنا مدرب على أعلى معايير الخدمة والنظافة."
                : "Our team consists of specialized chefs and friendly staff dedicated to providing the best dining experience. Every member of our team is trained to the highest standards of service and hygiene."}
            </p>
          </div>
        </div>
      </div>

      <RestaurantFooter />
    </div>
  );
}
