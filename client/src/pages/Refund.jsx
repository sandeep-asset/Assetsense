// src/components/RefundPolicy.jsx
import React from "react";

const RefundPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 mb-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">
        Asset Sense Workspaces Refund Policy
      </h1>

      <p className="mb-6">
        At Asset Sense Workspaces, we strive to deliver high–quality virtual
        office and business support services. Our refund policy is designed to
        ensure clarity and transparency regarding our pricing, documentation
        costs, and service guarantees.
      </p>

      {/* 1. Pricing and Plans */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Pricing and Plans</h2>
        <p className="mb-2">
          Unlike fixed-price packages, the cost of each Virtual Office varies
          based on the location and prestige of the specific address.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            The exact price for each virtual office is clearly mentioned on the
            respective property detail page on{" "}
            <a
              href="https://assetsense.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              assetsense.in
            </a>
            .
          </li>
          <li>
            Clients are advised to review all pricing details before making a
            payment.
          </li>
        </ul>
      </div>

      {/* 2. Documentation Charges */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          2. Non-Refundable Documentation & Setup Charges
        </h2>
        <p className="mb-2">
          Once a payment is made, the administrative and legal documentation
          process begins within 24 hours. This includes immediate third-party
          costs such as vendor payments, stamp paper procurement, notary,
          handling, and courier services.
        </p>
        <p className="mb-2">
          These costs are treated as <strong>“Availed Services”</strong> and are
          strictly non-refundable under any circumstances.
        </p>

        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Standard Deduction:</strong> Approximately ₹2,500 is
            deducted for most states and cities.
          </li>
          <li>
            <strong>Maharashtra Deduction:</strong> Approximately ₹6,000 is
            deducted due to mandatory registered lease agreements, biometric
            authentication, and higher statutory charges.
          </li>
        </ul>
      </div>

      {/* 3. Add-ons */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Add-on Services</h2>
        <p className="mb-2">
          Clients may opt for additional services along with their Virtual
          Office plan.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Any activated or utilized Add-on service is treated as an
            <strong> “Availed Service”</strong>.
          </li>
          <li>
            Charges for availed Add-on services are strictly non-refundable.
          </li>
        </ul>
      </div>

      {/* 4. GST Rejection */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          4. GST Rejection and Refund Process
        </h2>
        <p className="mb-2">
          Asset Sense Workspaces provides structured assistance for GST
          registration through a two-step process:
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>First Rejection:</strong> If the GST application is rejected
            initially, we will refile the application a second time without any
            additional documentation charges.
          </li>
          <li>
            <strong>Second Rejection:</strong> If the application is rejected
            again after the second attempt, the client becomes eligible for a
            refund.
          </li>
        </ul>

        <p className="mt-3 font-semibold">Refund Calculation:</p>
        <p className="bg-gray-100 p-3 rounded-md text-sm mt-2">
          Refund Amount = Total Amount Paid − (Non-Refundable Documentation
          Charges + Cost of Availed Add-on Services)
        </p>

        <p className="mt-2 text-sm">
          <strong>Note:</strong> If the GST application is approved, no refund
          claims will be entertained under any circumstance.
        </p>
      </div>

      {/* 5. General Conditions */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. General Conditions</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Refunds, where applicable, are processed only to the original
            payment source.
          </li>
          <li>
            Refund processing time is typically 15–20 business days after final
            rejection confirmation.
          </li>
          <li>
            Activation of services constitutes acceptance of this refund policy.
          </li>
          <li>
            Asset Sense Workspaces reserves the right to amend this policy with
            prior notice.
          </li>
        </ul>
      </div>

      {/* 6. Company Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          6. Company Information and Payments
        </h2>
        <p className="mb-2">
          Asset Sense Workspaces is a wholly owned subsidiary of Asset Sense Pvt
          Ltd. All payments are collected in the name of Asset Sense Pvt Ltd.
        </p>

        <ul className="list-disc list-inside space-y-1">
          <li>Company Name: Asset Sense Pvt Ltd</li>
          <li>CIN: U70101HR2012PTC046919</li>
          <li>GSTIN: 06AASCS0042F2ZH</li>
          <li>Headquarters: Gurgaon, Haryana (established 2012)</li>
        </ul>

        <p className="mt-2">
          A valid GST-compliant tax invoice will be issued for all purchases.
          Clients are advised to retain invoices for accounting and compliance
          purposes.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
