// src/components/RefundPolicy.jsx
import React from "react";

const RefundPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-30 mb-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">
        Asset Sense Workspaces Refund Policy
      </h1>

      <p className="mb-6">
        At Asset Sense Workspaces, we strive to deliver high–quality virtual
        office and business support services. Our refund policy is designed to
        ensure clarity and transparency for all clients across our membership
        plans.
      </p>

      {/* Starter Plan */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          1. Starter Plan (₹7,499/year)
        </h2>
        <p className="mb-2">
          This plan includes a Virtual Office Address for GST/MCA Registration,
          Business Address Usage, Mail Handling & Forwarding, Courier Handling,
          and Email Support.
        </p>
        <p className="font-semibold">Refund Policy:</p>
        <p className="mb-2">
          Fees paid under the Starter Plan are non-refundable under any
          circumstances, once the service has been activated and the client is
          allotted an address.
        </p>
      </div>

      {/* Professional Plan */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          2. Professional Plan (₹9,499/year)
        </h2>
        <p className="mb-2">
          This plan includes all benefits of the Starter Plan plus Online
          Submission of GST Application, Legal Representation for Signing,
          Meeting Room Access (pay-per-use), Priority Support, and Business
          Registration Assistance.
        </p>
        <p className="font-semibold">Refund Policy:</p>
        <p className="mb-2">
          Fees paid under the Professional Plan are non-refundable under any
          circumstances. This is because legal filings and representations are
          time-bound and service-intensive in nature.
        </p>
      </div>

      {/* Enterprise Plan */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          3. Enterprise Plan (₹11,499/year)
        </h2>
        <p className="mb-2">
          This plan includes all benefits of the Professional Plan plus Multiple
          Location Address Options (PPOB/APOB), Unlimited Meeting Room Access,
          Dedicated Account Manager, Phone Support, Virtual Office in a Grade A
          Building, and Legal Compliance Consulting.
        </p>
        <p className="font-semibold">Refund Policy:</p>
        <ul className="list-disc list-inside mb-2 space-y-1">
          <li>
            Clients under the Enterprise Plan are eligible for a 100% refund
            only in the event of GST application rejection by authorities.
          </li>
          <li>
            The refund will be processed within 15–20 business days after
            official proof of rejection from the GST department is submitted.
          </li>
          <li>
            Refund eligibility applies exclusively to the ₹11,499 plan cost paid
            to Asset Sense Workspaces.
          </li>
          <li>
            Any external costs, such as facilitation fees, bribes, or honorarium
            amounts, are the client’s responsibility and not covered under this
            policy.
          </li>
          <li>
            Once the GST application is approved, no refund claims will be
            entertained under any circumstance.
          </li>
        </ul>
      </div>

      {/* Value Pack GST Assist */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          4. Value Pack GST Assist (₹14,499/year)
        </h2>
        <p className="mb-2">
          This plan is designed for new businesses and entrepreneurs whose
          primary goal is to secure GST registration and a business bank account
          quickly and affordably. It includes a compliant Virtual Office
          Address, Online Submission of GST Application, Representative for
          Physical Verification, Current Bank Account Assistance, and Basic Mail
          Handling.
        </p>
        <p className="font-semibold">Refund Policy:</p>
        <p className="mb-2">
          The fees for the Value Pack GST Assist are non-refundable once the GST
          application process has been initiated or a representative has been
          assigned. This is because the service involves direct government
          liaison and resource allocation that cannot be retracted.
        </p>
      </div>

      {/* Premium Business Registration */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          5. Premium Business Registration (₹19,499/year)
        </h2>
        <p className="mb-2">
          This elite plan is for businesses seeking to establish a prestigious
          corporate presence in India’s top commercial hubs. It includes all
          benefits of the Enterprise Plan plus a Prestigious Virtual Office
          Address, Dedicated Receptionist Service, Exclusive Business Lounge
          Access, and Concierge Services.
        </p>
        <p className="font-semibold">Refund Policy:</p>
        <p className="mb-2">
          Fees paid for the Premium Business Registration plan are strictly
          non-refundable. This is due to the significant upfront costs and
          commitments associated with securing premium real estate addresses and
          allocating dedicated receptionist resources.
        </p>
      </div>

      {/* General Conditions */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. General Conditions</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Refunds, wherever applicable, are made exclusively to the
            originating payment source (same bank account/card/wallet).
          </li>
          <li>
            Clients are advised to thoroughly review the plan inclusions before
            purchase, as activation of services constitutes acceptance of this
            refund policy.
          </li>
          <li>
            Asset Sense Workspaces reserves the right to amend this refund
            policy at any time, with prior notice published on our official
            communication channels.
          </li>
        </ul>
      </div>

      {/* Company Information */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          7. Company Information and Payments
        </h2>
        <p className="mb-2">
          Asset Sense Workspaces is a wholly owned subsidiary of Asset Sense Pvt
          Ltd. All client payments are collected and processed in the name of
          Asset Sense Pvt Ltd.
        </p>
        <p className="mb-2 font-semibold">Registered Company Details:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Company Name: Asset Sense Pvt Ltd</li>
          <li>CIN: U70101HR2012PTC046919</li>
          <li>GSTIN: 06AASCS0042F2ZH</li>
          <li>Headquarters: Gurgaon, Haryana (established 2012)</li>
        </ul>
        <p className="mt-2">
          All clients will receive a valid GST-compliant tax invoice from Asset
          Sense Pvt Ltd at the time of purchase. Clients are advised to retain
          invoices for accounting, tax return filings, and compliance purposes.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
