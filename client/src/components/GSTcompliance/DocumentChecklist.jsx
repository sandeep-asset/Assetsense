import { useState, useEffect } from "react";
import {
  FaUser,
  FaUsers,
  FaBuilding,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const businessTypes = [
  {
    id: "proprietorship",
    label: "Proprietorship",
    sublabel: "Individual",
    icon: FaUser,
    items: [
      {
        id: "pan",
        label: "Owner's PAN Card",
        note: "Must be linked to Aadhaar",
      },
      {
        id: "aadhaar",
        label: "Owner's Aadhaar Card",
        note: "Mobile number active for OTP",
      },
      { id: "photo", label: "Passport Size Photo", note: "JPEG, clear face" },
      {
        id: "bank",
        label: "Bank Account Details",
        note: "Passbook or Cancelled Cheque",
      },
      {
        id: "address",
        label: "Proof of Business Address",
        note: "Electric bill / Rent agreement",
      },
    ],
  },
  {
    id: "partnership",
    label: "Partnerships & LLPs",
    sublabel: "Multiple Partners",
    icon: FaUsers,
    items: [
      { id: "firm-pan", label: "PAN Card of Firm/LLP" },
      { id: "partners-pan", label: "PAN & Aadhaar of ALL Partners" },
      { id: "photos", label: "Photos of ALL Partners" },
      { id: "deed", label: "Partnership Deed/LLP Agreement" },
      { id: "auth-letter", label: "Authorization Letter" },
      { id: "address", label: "Proof of Business Address" },
    ],
  },
  {
    id: "pvt-ltd",
    label: "Pvt Ltd Company",
    sublabel: "Corporate Entity",
    icon: FaBuilding,
    items: [
      { id: "company-pan", label: "Company PAN Card" },
      { id: "coi", label: "Certificate of Incorporation (COI)" },
      { id: "aoa-moa", label: "AOA & MOA" },
      { id: "directors-pan", label: "PAN & Aadhaar of Directors" },
      { id: "dsc", label: "Digital Signature Certificate (DSC)" },
      { id: "board-resolution", label: "Board Resolution" },
    ],
  },
];

export default function DocumentChecklist() {
  const [activeTab, setActiveTab] = useState("proprietorship");
  const [openMobileTab, setOpenMobileTab] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  const toggleItem = (tab, item) => {
    const key = `${tab}-${item}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getProgress = (tabId) => {
    const type = businessTypes.find((t) => t.id === tabId);
    const checked = type.items.filter(
      (i) => checkedItems[`${tabId}-${i.id}`]
    ).length;
    return { checked, total: type.items.length };
  };

  const activeType = businessTypes.find((t) => t.id === activeTab);

  return (
    <section id="quiz" className="mb-10">
      <h2 className="text-2xl font-bold sm:text-3xl">Required Documents</h2>
      <p className="mt-1 text-gray-600">
        Select your business type and track your document readiness
      </p>

      {/* -------------------------
          DESKTOP TABS
      ---------------------------- */}
      {!isMobile && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {businessTypes.map((type) => {
            const Icon = type.icon;
            const progress = getProgress(type.id);
            const complete = progress.checked === progress.total;

            return (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  activeTab === type.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      activeTab === type.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {complete && (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                      <FaCheckCircle /> Complete
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-semibold">{type.label}</h3>
                <p className="text-sm text-gray-500">{type.sublabel}</p>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all"
                      style={{
                        width: `${(progress.checked / progress.total) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    {progress.checked}/{progress.total} complete
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* -------------------------
          MOBILE DROPDOWN ACCORDION
      ---------------------------- */}
      {isMobile && (
        <div className="mt-6 space-y-4">
          {businessTypes.map((type) => {
            const Icon = type.icon;
            const isOpen = openMobileTab === type.id;
            const progress = getProgress(type.id);
            const complete = progress.checked === progress.total;

            return (
              <div key={type.id} className="border rounded-xl">
                <button
                  onClick={() => setOpenMobileTab(isOpen ? "" : type.id)}
                  className="w-full flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white h-10 w-10 rounded-lg flex items-center justify-center">
                      <Icon />
                    </div>
                    <div>
                      <p className="font-semibold">{type.label}</p>
                      <p className="text-sm text-gray-500">{type.sublabel}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-xs ${
                        complete
                          ? "text-green-600 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {progress.checked}/{progress.total} complete
                    </span>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </button>

                {isOpen && (
                  <div className="bg-white p-4 space-y-3">
                    {/* Progress Bar inside mobile accordion */}
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all"
                        style={{
                          width: `${
                            (progress.checked / progress.total) * 100
                          }%`,
                        }}
                      />
                    </div>
                    {type.items.map((item) => {
                      const key = `${type.id}-${item.id}`;
                      const isChecked = checkedItems[key];

                      return (
                        <label
                          key={item.id}
                          className={`flex gap-3 p-3 border rounded-lg ${
                            isChecked
                              ? "bg-green-100 border-green-400"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleItem(type.id, item.id)}
                          />
                          <div>
                            <p className="font-medium">{item.label}</p>
                            {item.note && (
                              <p className="text-sm text-gray-500">
                                {item.note}
                              </p>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* -------------------------
          DESKTOP CHECKLIST
      ---------------------------- */}
      {!isMobile && activeType && (
        <div className="mt-6 rounded-xl border p-6 bg-white">
          <div className="space-y-3">
            {activeType.items.map((item) => {
              const key = `${activeTab}-${item.id}`;
              const isChecked = checkedItems[key];

              return (
                <label
                  key={item.id}
                  className={`flex gap-3 p-3 border rounded-lg cursor-pointer ${
                    isChecked ? "bg-green-100 border-green-400" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleItem(activeTab, item.id)}
                  />
                  <div>
                    <p className="font-medium">{item.label}</p>
                    {item.note && (
                      <p className="text-sm text-gray-500">{item.note}</p>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
