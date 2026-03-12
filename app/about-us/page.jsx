import React from "react";

const page = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="py-20 bg-linear-to-r from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Lumora India
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
            <h2 className="text-3xl font-bold mb-6">
              Our Journey!
            </h2>

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
            <img
              src="/lumora.jpg"
              alt="about The lumoraindia"
              className="rounded-xl shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-6">
            Our Mission
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto">
            Our mission is to revolutionize menstrual care by offering
            high-quality, reliable, comfortable and affordable sanitary pads
            that meet the diverse needs of women.
          </p>

        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <img
              src="/product.jpg"
              alt="lumoraindia products"
              className="rounded-xl shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Our Products
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Designed with modern technology and premium materials, our
              sanitary pads provide superior absorbency, breathability, and
              protection. Every product is dermatologically tested and free
              from harmful chemicals.
            </p>
          </div>

        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-gray-50">
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

          <h2 className="text-3xl font-bold mb-6">
            Empowering Women
          </h2>

          <p className="text-gray-600">
            Through education, awareness campaigns, and partnerships, we work
            to break the stigma around menstruation and promote a supportive
            environment where women feel confident and empowered.
          </p>

        </div>
      </section>

    </div>
  );
};

export default page;