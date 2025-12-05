import { FaLightbulb, FaHome, FaKey } from "react-icons/fa";

const AddressProofSection =()=> {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold sm:text-3xl text-gray-900">
          The "Secret" to Approval
        </h2>
        <p className="mt-2 text-gray-600">
          Valid Proof of Address — This is where most applications fail
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border-2 border-blue-600/20 bg-blue-600/5">
        {/* Header */}
        <div className="border-b border-blue-600/10 bg-blue-600/10 px-6 py-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-800">
            <FaLightbulb className="h-5 w-5" />
            Crucial Information
          </h3>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="mb-6 text-gray-800">
            You need <span className="font-semibold">ONE</span> of the
            following:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Owned Property */}
            <div className="rounded-lg border bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10">
                  <FaHome className="h-4 w-4 text-blue-800" />
                </div>
                <h4 className="font-semibold text-gray-900">Owned Property</h4>
              </div>

              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Property Tax Receipt
                </li>

                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Electricity Bill
                </li>
              </ul>
            </div>

            {/* Rented Property */}
            <div className="rounded-lg border bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10">
                  <FaKey className="h-4 w-4 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Rented Property</h4>
              </div>

              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Rent Agreement
                </li>

                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  NOC (No Objection Certificate)
                </li>

                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                  Electricity Bill of Owner
                </li>
              </ul>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="mt-6 flex items-start gap-3 rounded-lg bg-yellow-300/10 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-700">
              <FaLightbulb className="h-4 w-4 text-white" />
            </div>

            <div>
              <p className="font-semibold text-gray-900">Pro Tip</p>
              <p className="text-sm text-gray-600">
                If using a Virtual Office, ensure you get a proper NOC and
                Utility Bill from the provider.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AddressProofSection;
