const ApartmentLocationSection = () => {
  return (
    <section className="py-16 px-6 bg-base-100 text-base-content">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-8">
          Apartment Location
        </h2>

        <p className="text-lg mb-12">
          Find us easily. Here’s the exact location of our apartments and how to
          get there.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Map */}
          <div className="rounded-xl shadow-lg overflow-hidden bg-base-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.6116524179542!2d90.3135145164918!3d23.866686574422644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1f7ed5f4193%3A0x8159af0d71ff7374!2sEastern%20University!5e0!3m2!1sen!2sbd!4v1737115466348!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Directions */}
          <div className="p-8 rounded-xl shadow-xl bg-base-200 text-left">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              How to Get There
            </h3>
            <ul className="text-lg space-y-2">
              <li>Take a left turn at the Eastern University gate.</li>
              <li>Walk straight for 100 meters.</li>
              <li>
                Located next to the main university campus building.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApartmentLocationSection;
