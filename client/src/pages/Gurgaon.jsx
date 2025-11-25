import React, { useState, Suspense } from "react";
const Home = React.lazy(() => import("./Home.jsx"));

// Lazy loaded components
const Coworking = React.lazy(() =>
  import("../components/CityGurgaon/Coworking.jsx")
);
const Virtual = React.lazy(() =>
  import("../components/CityGurgaon/Virtual.jsx")
);
const PopupLeadForm = React.lazy(() =>
  import("../components/CityGurgaon/LeadForm.jsx")
);
const Gallery = React.lazy(() =>
  import("../components/CityGurgaon/Gallery.jsx")
);
const ComparisonTable = React.lazy(() =>
  import("../components/CityGurgaon/ComperisionTable.jsx")
);
const WhyChooseUs = React.lazy(() =>
  import("../components/CityGurgaon/WhyChooseUs.jsx")
);
const Testimonials = React.lazy(() =>
  import("../components/CityGurgaon/TestimonialsGurgaon.jsx")
);
const TargetAudience = React.lazy(() =>
  import("../components/TargetAudience.jsx")
);
const FaqGurgaon = React.lazy(() =>
  import("../components/CityGurgaon/FaqGurgaon.jsx")
);

const Gurgaon = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const scrollToForm = () => {
    document
      .getElementById("lead-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Suspense
        fallback={
          <div className="w-full h-screen text-white flex justify-center bg-gray-700 text-3xl">
            Loading...
          </div>
        }
      >
        <Home />
        <Coworking />
        <Virtual />
        <PopupLeadForm />
        <Gallery />
        <ComparisonTable />
        <WhyChooseUs />
        <Testimonials />
        <TargetAudience />
        <FaqGurgaon />
      </Suspense>
    </div>
  );
};

export default Gurgaon;
