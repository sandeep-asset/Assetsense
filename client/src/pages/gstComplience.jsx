import React, { useState, Suspense } from "react";

// Lazy Loaded Components  
const HeroSection = React.lazy(() =>
  import("../components/GSTcompliance/HeroGST")
);

const DocumentChecklist = React.lazy(() =>
  import("../components/GSTcompliance/DocumentChecklist")
);

const AddressProofSection = React.lazy(() =>
  import("../components/GSTcompliance/AddressProofSection")
);

const CommonMistakesSection = React.lazy(() =>
  import("../components/GSTcompliance/CommonMistakesSection")
);

const StickySidebar = React.lazy(() =>
  import("../components/GSTcompliance/StickySidebar")
);

const LeadCaptureModal = React.lazy(() =>
  import("../components/GSTcompliance/LeadCaptureModal")
);

const Gstcta = React.lazy(() =>
  import("../components/GSTcompliance/Gstcta")
);

const GstComplience = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Suspense fallback={<div className="p-10 text-center">Loading ...</div>}>
      <div>
        <HeroSection />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
            {/* Main Content */}
            <main className="space-y-16">
              <DocumentChecklist />
              <AddressProofSection />
              <CommonMistakesSection />
            </main>

            {/* Sticky Sidebar */}
            <aside className="hidden lg:block">
              <StickySidebar onDownloadClick={() => setIsModalOpen(true)} />
            </aside>
          </div>
        </div>

        <Gstcta />
        <LeadCaptureModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
    </Suspense>
  );
};

export default GstComplience;
