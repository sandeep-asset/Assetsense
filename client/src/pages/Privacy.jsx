// src/components/PrivacyPolicy.jsx
import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-2">Asset Sense</h1>
      <h2 className="text-2xl font-semibold mb-6">Privacy Policy</h2>
      <p className="text-sm text-gray-500 mb-6">
        Effective Date: September 11, 2023
      </p>

      <p className="mb-6">
        At Asset Sense (“we,” “our,” or “us”), protecting your privacy and
        personal data is a top priority. This Privacy Policy explains how we
        collect, use, store, and protect your information when you use our
        virtual office and business services.
      </p>

      {/* 1. Information We Collect */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">
          1. Information We Collect
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Personal Identification Information:</strong> Name, email
            address, phone number, postal address, company name, and
            government-issued identification documents (for KYC/compliance).
          </li>
          <li>
            <strong>Business Information:</strong> Business registration
            details, GST number, MCA filings, and related documentation.
          </li>
          <li>
            <strong>Payment Information:</strong> Payment method details,
            transaction history, and billing information processed by Asset
            Sense Pvt Ltd.
          </li>
          <li>
            <strong>Usage Data:</strong> Interaction data such as website usage,
            service preferences, meeting room bookings, and communication
            records.
          </li>
          <li>
            <strong>Communication Data:</strong> Emails, phone calls, and
            messages between you and our support or account teams.
          </li>
        </ul>
      </div>

      {/* 2. How We Use Your Information */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">
          2. How We Use Your Information
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Deliver the requested virtual office and compliance services.</li>
          <li>
            Verify your identity and complete legal formalities as required by
            government regulations.
          </li>
          <li>Process payments and send invoices.</li>
          <li>
            Communicate important updates, service changes, and support
            information.
          </li>
          <li>Improve and customize our services and marketing efforts.</li>
          <li>Comply with applicable laws, audits, and government requests.</li>
        </ul>
      </div>

      {/* 3. Information Sharing */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">
          3. Information Sharing and Disclosure
        </h3>
        <p className="mb-2">
          We do not sell or rent your personal information to third parties. We
          may share your information:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            With government authorities for compliance and registration purposes
            (e.g., GST filings, MCA submissions).
          </li>
          <li>
            With service providers working on our behalf, such as payment
            processors and IT service providers, under strict confidentiality
            agreements.
          </li>
          <li>
            When required by law, regulation, legal process, or government
            request.
          </li>
        </ul>
      </div>

      {/* 4. Data Security */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">4. Data Security</h3>
        <p>
          We implement robust technical, administrative, and organizational
          measures to protect your information from unauthorized access,
          alteration, disclosure, or destruction. These include encryption,
          secure servers, access controls, and regular security audits.
        </p>
      </div>

      {/* 5. Data Retention */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">5. Data Retention</h3>
        <p>
          We retain your personal data only as long as necessary to provide
          services, comply with legal obligations, resolve disputes, and enforce
          our agreements. Once no longer required, your data is securely deleted
          or anonymized.
        </p>
      </div>

      {/* 6. Your Rights */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">6. Your Rights</h3>
        <p className="mb-2">
          Depending on applicable laws, you may have the right to:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Access and obtain a copy of your personal data.</li>
          <li>
            Request correction or update of inaccurate or incomplete data.
          </li>
          <li>Request deletion or restriction of your data processing.</li>
          <li>
            Object to certain processing activities (e.g., marketing
            communications).
          </li>
          <li>Withdraw consent where applicable.</li>
        </ul>
        <p className="mt-2">
          To exercise these rights, please contact our support team at the email
          provided below.
        </p>
      </div>

      {/* 7. Cookies */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">
          7. Cookies and Tracking Technologies
        </h3>
        <p>
          Our website may use cookies and similar tracking technologies to
          enhance user experience, analyze site traffic, and serve targeted
          marketing. You can control cookie preferences through your browser
          settings.
        </p>
      </div>

      {/* 8. Third-Party Links */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">8. Third-Party Links</h3>
        <p>
          Our services may contain links to third-party websites or resources.
          We are not responsible for the privacy practices or content of
          external sites. Please review their privacy policies directly.
        </p>
      </div>

      {/* 9. Changes */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">
          9. Changes to This Policy
        </h3>
        <p>
          We may update this Privacy Policy periodically to reflect changes in
          practices or legal requirements. We will notify clients through our
          website or direct communication about any significant changes.
        </p>
      </div>

      {/* 10. Contact Us */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">10. Contact Us</h3>
        <p>
          For questions, concerns, or to exercise your data rights, please
          contact:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            <strong>Email:</strong> info@assetsense.com
          </li>
          <li>
            <strong>Address:</strong> Asset Sense Pvt Ltd, 207, 2nd Floor, Emaar
            The Palm Square, Sector 66, Gold Course Road Extn., Gurgaon,
            Haryana, India - 122102
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Privacy;
