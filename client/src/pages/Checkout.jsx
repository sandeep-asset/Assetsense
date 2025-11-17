import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import toast from "react-hot-toast";
import { FaCheckCircle, FaStar, FaLock } from "react-icons/fa";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const office = location.state?.office;
  const [upsellServices, setUpsellServices] = useState([]);
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  if (!office) {
    return (
      <div className="max-w-lg mx-auto p-4 bg-white rounded-xl shadow-md text-center">
        <p className="text-gray-600">
          Loading checkout details... (no office data found)
        </p>
      </div>
    );
  }

  // 🧮 Price Calculation
  const {
    basePrice,
    discountedPrice,
    upsellTotal,
    gstAmount,
    total,
    totalSavings,
  } = useMemo(() => {
    let basePrice = 0;
    if (office?.type === "Virtual Office") {
      basePrice = Number(office?.pricing?.yearly) || 0;
    } else {
      basePrice = Number(office?.pricing?.monthly) || 0;
    }

    const discountPercent = Number(office?.pricing?.discount) || 0;
    let discountedPrice = discountPercent
      ? basePrice - (basePrice * discountPercent) / 100
      : basePrice;

    const upsellTotal = upsellServices.reduce(
      (sum, s) => sum + Number(s.assetsenseprice || 0),
      0
    );
    const upsellSavings = upsellServices.reduce(
      (sum, s) =>
        sum + (Number(s.regularprice || 0) - Number(s.assetsenseprice || 0)),
      0
    );

    const subtotal = discountedPrice + upsellTotal;
    const gstPercent = Number(office?.gstPercent) || 18;
    const gstAmount = (subtotal * gstPercent) / 100;
    const total = subtotal + gstAmount;
    const totalSavings = basePrice - discountedPrice + upsellSavings;

    return {
      basePrice: basePrice.toFixed(2),
      discountedPrice: discountedPrice.toFixed(2),
      upsellTotal: upsellTotal.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      total: total.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
    };
  }, [upsellServices, office]);

  // 🧾 Checkout Handler
  const handleCheckout = async () => {
    if (!user.name || !user.email || !user.phone) {
      toast.error("Please fill all user details before proceeding.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/create`,
        {
          officeId: office._id,
          selectedServices: upsellServices,
          user,
        }
      );

      const { paymentSessionId } = res.data;
      if (!paymentSessionId) {
        toast.error("Payment session not created. Try again!");
        return;
      }

      const cashfree = await load({ mode: "sandbox" });
      cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong during checkout!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-xl border border-gray-100 mt-8 mb-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Secure 2-Step Checkout
        </h1>
        <p className="text-green-600 text-sm font-medium">
          🔒 256-bit SSL Encrypted
        </p>
      </div>
      {/* Your Order */}
      <div className="border rounded-xl p-6 mb-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Order</h2>

        <div className="flex justify-between mb-3">
          <p className="text-gray-800 font-medium">
            {office.type} Plan ({office.location.city} Location)
          </p>
          <p className="font-semibold text-gray-900">₹{discountedPrice}</p>
        </div>

        {office?.upsellservices?.length > 0 && (
          <div className="mt-4 space-y-2">
            {office.upsellservices.map((s) => {
              const isSelected = upsellServices.some((x) => x.name === s.name);
              const savings =
                Number(s.regularprice || 0) - Number(s.assetsenseprice || 0);
              return (
                <label
                  key={s.name}
                  className={`flex items-center justify-between p-3 border rounded-lg transition cursor-pointer ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex text-xs items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) =>
                        setUpsellServices((prev) =>
                          e.target.checked
                            ? [...prev, s]
                            : prev.filter((x) => x.name !== s.name)
                        )
                      }
                      className="accent-blue-600"
                    />
                    <span className="text-gray-800  font-medium">{s.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-700 font-semibold text-xs ">
                      Regular Price : ₹<span className="line-through">{s.regularprice}</span>
                    </p>
                    <p className="text-blue-700 text-xs font-semibold">
                      Asset Sense Price : ₹{s.assetsenseprice}
                    </p>
                    {savings > 0 && (
                      <span className="text-xs text-green-600 font-medium">
                        Save ₹{savings}
                      </span>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>
      {/* Price Summary */}
      <div className="bg-gray-50 border rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Price Summary
        </h3>
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Base Price:</span>
            <span className="font-semibold text-gray-900">₹{basePrice}</span>
          </div>
          {Number(office?.pricing?.discount) > 0 && (
            <>
              <div className="flex justify-between text-green-700 font-medium">
                <span>Discount ({office.pricing.discount}%)</span>
                <span>-₹{(basePrice - discountedPrice).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discounted Price:</span>
                <span className="font-semibold">₹{discountedPrice}</span>
              </div>
            </>
          )}
          <div className="flex justify-between">
            <span>Upsell Services Total:</span>
            <span className="font-semibold">₹{upsellTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>GST ({office?.gstPercent || 18}%):</span>
            <span className="font-semibold">₹{gstAmount}</span>
          </div>
          <div className="border-t border-dashed pt-3 mt-3 flex justify-between text-lg font-bold text-gray-900">
            <span>Total Payable:</span>
            <span className="text-blue-700">₹{total}</span>
          </div>
          {Number(totalSavings) > 0 && (
            <p className="text-center mt-3 text-green-700 font-semibold bg-green-50 border border-green-200 py-2 rounded-lg">
              🎁 Total Savings: ₹{totalSavings}
            </p>
          )}
        </div>
      </div>
      {/* What You're Getting */}
      {office.services?.length > 0 && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-8">
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            What You’re Getting
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            {office.services.map((service, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <FaCheckCircle className="text-green-500 mt-0.5" />
                <span>{service.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Customer Info */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Customer Information
        </h3>
        <div className="space-y-3">
          <input
            placeholder="Full Name"
            className="border rounded-lg w-full p-3"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            placeholder="Email Address"
            className="border rounded-lg w-full p-3"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            placeholder="Phone Number"
            className="border rounded-lg w-full p-3"
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </div>
      </div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full py-4 text-lg font-semibold rounded-lg flex justify-center items-center gap-2 transition-all ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? (
          "Processing..."
        ) : (
          <>
            Toal Payable
            <span className="bg-blue-800 text-white text-sm font-semibold px-3 py-1 rounded-md shadow-sm">
              ₹{total}
            </span>
          </>
        )}
      </button>

      {/* Payment Methods */}
      <div className="text-center mb-6">
        <p className="text-gray-700 font-medium mb-3">Secure Payment Methods</p>
        <div className="flex justify-center  text-xs gap-2">
          <span className="px-2 py-2 border  rounded-md">VISA</span>
          <span className="px-2 py-2 border  rounded-md">Mastercard</span>
          <span className="px-2 py-2 border rounded-md">AMEX</span>
          <span className="px-2 py-2 border rounded-md">UPI</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Powered by Cashfree • PCI DSS Compliant
        </p>
      </div>
      {/* Pay Button */}

      {/* Testimonials */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
        <h3 className="text-center text-lg font-semibold text-gray-900 mb-5">
          Trusted by Businesses
        </h3>

        <div className="space-y-4">
          {/* Testimonial 1 */}
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-center mb-2 text-green-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-4 h-4" />
              ))}
            </div>
            <p className="text-gray-700 text-sm mb-2">
              "Asset Sense made our registration seamless. The virtual office
              service is professional and reliable. Highly recommend!"
            </p>
            <p className="text-xs text-gray-500">— R. Kumar, XYZ Solutions</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-center mb-2 text-green-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-4 h-4" />
              ))}
            </div>
            <p className="text-gray-700 text-sm mb-2">
              "Perfect solution for our startup. Professional address without
              the overhead costs. Worth every rupee!"
            </p>
            <p className="text-xs text-gray-500">
              — P. Sharma, Tech Innovations Pvt Ltd
            </p>
          </div>
        </div>
      </div>
      {/* Footer */}
      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-6">
        <p className="flex justify-center items-center gap-2">
          <FaLock className="text-yellow-500" />
          <span>30-day money-back guarantee • Cancel anytime</span>
        </p>
        <p className="mt-2 text-gray-400">
          © 2025 Asset Sense Workspaces • Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Checkout;
