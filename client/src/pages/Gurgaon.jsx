import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import Home from "./Home.jsx";
import HeroGurgaon from "../components/CityGurgaon/HeroGurgaon.jsx";
import FaqGurgaon from "../components/CityGurgaon/FaqGurgaon.jsx";
import Coworking from "../components/CityGurgaon/Coworking.jsx";
import Gallery from "../components/CityGurgaon/Gallery.jsx";
import ComparisonTable from "../components/CityGurgaon/ComperisionTable.jsx";
import WhyChooseUs from "../components/CityGurgaon/WhyChooseUs.jsx";
import Testimonials from "../components/CityGurgaon/TestimonialsGurgaon.jsx";
import { FaCommentDots, FaWhatsapp } from "react-icons/fa";
import PopupLeadForm from "../components/CityGurgaon/LeadForm.jsx";
import OfficeListingCTA from "../components/OfficeListingCTA.jsx";
import Virtual from "../components/CityGurgaon/Virtual.jsx";
import TargetAudience from "../components/TargetAudience.jsx";

const Gurgaon = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const scrollToForm = () => {
    document
      .getElementById("lead-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      {/* <HeroGurgaon /> */}

      <Home />
      <Coworking />
      <Virtual />
      <PopupLeadForm />
      <Gallery />
      {/* <OfficeListingCTA /> */}
      <ComparisonTable />
      <WhyChooseUs />
      <Testimonials />
      <TargetAudience />
      <FaqGurgaon />
    </div>
  );
};

export default Gurgaon;
