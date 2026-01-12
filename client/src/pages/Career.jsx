import React from "react";

const Career = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sales Coordinator – Managed Office Vertical
          </h1>
          <p className="text-lg max-w-3xl opacity-90">
            Join Asset Sense and be part of a zero-to-one journey in building
            our Managed Office Solutions vertical across India.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Company Overview */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Company Overview</h2>
          <p className="leading-relaxed text-gray-700">
            <strong>Asset Sense (assetsense.in)</strong> is a leading prop-tech
            and workspace provider with presence in 15 locations across India.
            Having established expertise in Virtual Offices and Coworking, we
            are now launching our newest vertical —{" "}
            <strong>Managed Office Solutions</strong>.
          </p>
        </div>

        {/* Role Purpose */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Role Purpose</h2>
          <p className="leading-relaxed text-gray-700">
            As the first point of contact for the Managed Office vertical, you
            will manage the complete lifecycle of property inventory — from
            sourcing and marketing to client engagement and site visits. This is
            a high-growth role designed for future leadership.
          </p>
        </div>

        {/* Responsibilities */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Key Responsibilities</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                1. Inventory Sourcing & Management
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  Daily monitoring of property portals like 99acres,
                  MagicBricks, Housing.com
                </li>
                <li>
                  Build strong broker relationships for off-market inventory
                </li>
                <li>Upload and manage listings on the Asset Sense website</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                2. Marketing & Outreach
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>
                  Promote managed offices on LinkedIn, Instagram, and Facebook
                </li>
                <li>
                  Coordinate basic content like photos and videos for listings
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                3. Sales Support & Client Engagement
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Filter leads and handle initial client communication</li>
                <li>
                  Conduct physical site visits (20% field work) for high-intent
                  clients
                </li>
                <li>
                  Manage documentation, databases, and internal reporting (80%
                  office operations)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Required Skills & Qualifications
          </h2>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
            <li>✔ Strong communication skills in English & Hindi</li>
            <li>
              ✔ Familiarity with property portals and social media marketing
            </li>
            <li>✔ Startup mindset with adaptability and ownership</li>
            <li>✔ Basic negotiation and real estate understanding</li>
            <li>✔ Strong multitasking and follow-up skills</li>
            <li>✔ Tools: MS Excel, Google Sheets, Gemini, ChatGPT</li>
          </ul>
        </div>

        {/* Why Join */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Why Join the Managed Office Vertical?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Early mover advantage in a high-growth vertical</li>
            <li>Faster promotions and leadership opportunities</li>
            <li>Direct recognition for revenue contribution</li>
            <li>Opportunity to build and lead regional portfolios</li>
          </ul>
        </div>

        {/* Compensation */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Compensation & Growth Potential
          </h2>
          <ul className="text-gray-700 space-y-2">
            <li>
              💰 <strong>Fixed Salary:</strong> ₹20,000 per month
            </li>
            <li>
              🚀 <strong>Commission:</strong> 8% – 12% on total commission per
              managed office lease
            </li>
            <li>
              📈 <strong>Uncapped Earnings:</strong> High-performance rewards
              with no upper limit
            </li>
          </ul>
        </div>

        {/* Apply */}
        <div className="text-center bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
          <p className="mb-6">
            Send your resume and a short note on why you enjoy building things
            from zero to one.
          </p>
          <a
            href="mailto:sandeep@assetsense.co.in"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            Apply via Email On: sandeep@assetsense.co.in
          </a>
        </div>
      </section>
    </div>
  );
};

export default Career;
