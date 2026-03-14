import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="bg-pink-100 text-gray-800">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About us Lumora India
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Empowering women through comfort, confidence, and care. Our mission
            is to create innovative hygiene solutions that ensure protection,
            comfort, and wellbeing every day.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Journey!</h2>

            <p className="text-gray-600 leading-relaxed mb-4">
              Our journey began with a simple but powerful idea — to create
              sanitary products that provide exceptional protection while
              improving women’s health and confidence.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We focus on innovation, quality materials, and thoughtful design
              to ensure that every woman feels comfortable and secure during
              menstruation.
            </p>
          </div>

          <div>
            <Image
              src="/lumora.jpg"
              alt="about The lumoraindia"
              height={600}
              width={600}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

<section className="py-20 bg-pink-50">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Our Mission
      </h2>

      <p className="mt-6 text-gray-600 text-lg leading-relaxed">
        At <span className="font-semibold text-pink-500">Lumora India</span>,
        our mission is to provide women with safe, comfortable, and reliable
        menstrual care products. We are committed to designing sanitary
        napkins that offer superior protection, skin-friendly materials,
        and long-lasting comfort so women can live confidently every day.
      </p>

      <p className="mt-4 text-gray-600 text-lg leading-relaxed">
        We believe that every woman deserves access to hygienic and affordable
        feminine care. Through innovation, quality, and awareness, we strive
        to make menstrual health simple, safe, and empowering for women
        across India.
      </p>

    </div>

    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        What Drives Us
      </h3>

      <ul className="space-y-4 text-gray-600">

        <li className="flex items-start gap-3">
          <span className="text-pink-500 text-xl">✔</span>
          Safe and hygienic menstrual care products
        </li>

        <li className="flex items-start gap-3">
          <span className="text-pink-500 text-xl">✔</span>
          Comfortable protection for every woman
        </li>

        <li className="flex items-start gap-3">
          <span className="text-pink-500 text-xl">✔</span>
          Affordable feminine hygiene solutions
        </li>

        <li className="flex items-start gap-3">
          <span className="text-pink-500 text-xl">✔</span>
          Promoting awareness about menstrual health
        </li>

      </ul>
    </div>

  </div>
</section>

      {/* Products */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/product.jpeg"
              alt="lumoraindia products"
              height={150}
              width={150}
              className="rounded-xl h-full w-full shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Our Products</h2>

            <p className="text-gray-600 leading-relaxed">
              Designed with modern technology and premium materials, our
              sanitary pads provide superior absorbency, breathability, and
              protection. Every product is dermatologically tested and free from
              harmful chemicals.
            </p>
          </div>
        </div>
      </section>

      {/* why choose lumoraindia page */}

      <section className="py-16 bg-pink-50">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-900">
        Why Choose Lumora India?
      </h2>
      <p className="text-gray-600 mt-3">
        Designed for comfort, hygiene and all-day protection
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
        <div className="text-pink-500 text-3xl mb-3">🛡️</div>
        <h3 className="font-semibold text-lg">Leak Proof Protection</h3>
        <p className="text-gray-600 text-sm mt-2">
          Advanced absorbent layers keep you dry and protected during heavy flow.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
        <div className="text-pink-500 text-3xl mb-3">🌸</div>
        <h3 className="font-semibold text-lg">Ultra Soft Comfort</h3>
        <p className="text-gray-600 text-sm mt-2">
          Soft cotton surface ensures maximum comfort for sensitive skin.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
        <div className="text-pink-500 text-3xl mb-3">🦠</div>
        <h3 className="font-semibold text-lg">Anti-Bacterial Layer</h3>
        <p className="text-gray-600 text-sm mt-2">
          Helps prevent bacteria growth and reduces unwanted odour.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
        <div className="text-pink-500 text-3xl mb-3">💧</div>
        <h3 className="font-semibold text-lg">High Absorption</h3>
        <p className="text-gray-600 text-sm mt-2">
          Multiple absorbent layers quickly lock in fluid and prevent leakage.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
        <div className="text-pink-500 text-3xl mb-3">🌿</div>
        <h3 className="font-semibold text-lg">Skin Friendly</h3>
        <p className="text-gray-600 text-sm mt-2">
          Breathable materials keep skin irritation free and comfortable.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
        <div className="text-pink-500 text-3xl mb-3">📏</div>
        <h3 className="font-semibold text-lg">Extra Long Pads</h3>
        <p className="text-gray-600 text-sm mt-2">
          Extra coverage gives confidence and protection day and night.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* Sustainability */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Commitment to Sustainability
          </h2>

          <p className="text-gray-600">
            We are dedicated to reducing our environmental footprint through
            eco-friendly materials and sustainable packaging. Our goal is to
            create products that care for both women and the planet.
          </p>
        </div>
      </section>

      {/* Community */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Empowering Women</h2>

          <p className="text-gray-600">
            Through education, awareness campaigns, and partnerships, we work to
            break the stigma around menstruation and promote a supportive
            environment where women feel confident and empowered.
          </p>
        </div>
      </section>
    </div>
  );
};

export default page;
