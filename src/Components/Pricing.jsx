import React from 'react';

const packages = [
  {
    name: 'Silver Package',
    price: '$0',
    description: 'Get started with essential tools for daily mental wellness.',
    features: [
      'Access to intelligent chatbot therapist (standard version)',
      'Guided self-journaling space',
      'Weekly mental wellness tips',
      'Access to community support groups',
      'Explore licensed therapist directory',
    ],
  },
  {
    name: 'Gold Package',
    price: '$199',
    description: 'Unlock premium support and personalized care.',
    features: [
      'All Silver Package features',
      'Personalized chatbot therapist with tailored responses',
      'AI-powered therapist recommendations',
      'Monthly one-on-one live sessions with therapists',
      'Personalized wellness plan & tracking',
      'Access to exclusive expert webinars & meditation sessions',
      'Priority support & therapist match assistance',
    ],
  },
];

const Pricing = () => {
  const handleScrollToContact = () => {
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="pricing" className="bg-[#f7f8fc] pt-32">
      <div className="container mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-secondary mb-3">
            Invest in Your Well-Being – Flexible Plans Tailored to Your Needs.
          </h2>
          <p className="text-lg mb-12 md:w-2/3 mx-auto">
            Discover the perfect plan tailored to your needs. Whether you’re starting with our free version, offering
            AI-powered chatbot support, or opting for our premium plan with personalized sessions from a licensed therapist,
            we have options that cater to your journey. Experience the flexibility.
          </p>
        </div>

        <div className="flex flex-wrap justify-between gap-8 pb-12">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white rounded-lg p-6 flex-1 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">{pkg.name}</h3>
              <hr className="w-24 border text-primary border-primary" />
              <p className="text-3xl font-bold mb-4">
                {pkg.price} <span className="text-lg font-normal">/month</span>
              </p>
              <p className="text-lg mb-4">{pkg.description}</p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button
                onClick={handleScrollToContact}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
