// src/components/TermsAndConditions.jsx
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-30 mb-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">
        Terms &amp; Conditions – Asset Sense / Asset Sense Workspaces
      </h1>

      <p className="mb-6">
        These Terms &amp; Conditions (“T&amp;C”) govern the use of services
        provided by Asset Sense Workspaces under the Starter, Professional, and
        Enterprise plans. By subscribing to any plan, the client agrees to abide
        by the following terms in addition to the Refund Policy.
      </p>

      {/* Service Activation */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Service Activation</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Services will be activated only after successful payment and
            submission of all mandatory KYC/legal documents as required by law.
          </li>
          <li>
            Any delay or rejection due to incomplete, false, or inaccurate
            documentation provided by the client will be the client’s sole
            responsibility.
          </li>
        </ul>
      </div>

      {/* Virtual Office Usage */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Virtual Office Usage</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            The virtual office address provided under any plan is for business
            registration, mailing, and official correspondence only.
          </li>
          <li>
            Clients are prohibited from using the address for unlawful,
            fraudulent, or prohibited activities.
          </li>
          <li>
            Asset Sense Workspaces reserves the right to terminate services
            immediately if the address is misused.
          </li>
        </ul>
      </div>

      {/* Compliance Responsibility */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          3. Compliance Responsibility
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            While Asset Sense Workspaces provides assistance with GST/MCA
            registration and related compliance, the final responsibility for
            approval lies solely with the respective government authorities.
          </li>
          <li>
            Clients must ensure timely cooperation during verification and site
            visits.
          </li>
          <li>
            Any direct payments, facilitation charges, or honorariums to
            government officials/inspectors are the sole responsibility of the
            client. Asset Sense Workspaces does not engage in such transactions.
          </li>
        </ul>
      </div>

      {/* Meeting Room and Facilities */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          4. Meeting Room and Facilities
        </h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Meeting room bookings are subject to availability and must be
            scheduled in advance.
          </li>
          <li>
            Enterprise clients with unlimited access must still comply with fair
            usage policies to avoid disruption of shared resources.
          </li>
        </ul>
      </div>

      {/* Limitation of Liability */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          5. Limitation of Liability
        </h2>
        <p className="mb-2">
          Asset Sense Workspaces shall not be liable for any losses arising due
          to:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Delays or rejections by government departments.</li>
          <li>
            Misrepresentation or misstatements made by the client in filings.
          </li>
          <li>
            Force majeure events (natural disasters, government restrictions,
            strikes, pandemics, etc.).
          </li>
        </ul>
        <p className="mt-2">
          The liability of Asset Sense Workspaces, in any case, shall be limited
          to the maximum of the subscription fee received for the concerned
          plan.
        </p>
      </div>

      {/* Client Obligations */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Client Obligations</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Clients must keep their contact details updated to ensure smooth
            communication.
          </li>
          <li>
            Mail and courier forwarding will only be done as per instructions
            provided at the time of registration, and additional forwarding
            charges may apply for bulk consignments.
          </li>
          <li>
            Clients shall not impersonate, share, or transfer their service plan
            to third parties without prior consent from Asset Sense Workspaces.
          </li>
        </ul>
      </div>

      {/* Termination of Services */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          7. Termination of Services
        </h2>
        <p className="mb-2">
          Asset Sense Workspaces reserves the right to suspend or terminate
          services without refund if:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            The client violates the T&amp;C or engages in fraudulent activity.
          </li>
          <li>
            The client fails to make additional payments due for services
            rendered (mail forwarding, meeting rooms, etc.).
          </li>
          <li>
            Government authorities revoke the business registration due to
            client’s misconduct.
          </li>
        </ul>
      </div>

      {/* Governing Law */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Governing Law</h2>
        <p>
          These Terms &amp; Conditions shall be governed by and interpreted in
          accordance with the laws of India. Any dispute arising shall be
          subject to the jurisdiction of the courts located in Delhi NCR, India.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
