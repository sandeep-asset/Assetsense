import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import "./index.css";

// Lazy load common components also
import Navbar from "./components/Navbar";
import ScrollToTopButton from "./components/ScrollToTop";
import StickyWatsapp from "./components/stickyWatsapp";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import useGTM from "./useGTM";
import DocumentGenerator from "./components/AdminComponents/DocumentGenerator";
import StickyChat from "./pages/StickyChat";


// Lazy pages
const Gurgaon = React.lazy(() => import("./pages/Gurgaon"));
const SearchOfficePage = React.lazy(() => import("./pages/SearchOfficePage"));
const OfficeDetails = React.lazy(() => import("./pages/OfficeDetails"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const PaymentStatus = React.lazy(() =>
  import("./components/Payment/PaymentStatus")
);
const Privacy = React.lazy(() => import("./pages/Privacy"));
const RefundPolicy = React.lazy(() => import("./pages/Refund"));
const TermsAndConditions = React.lazy(() => import("./pages/Termandcondition"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const OurServices = React.lazy(() => import("./pages/OurServices"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const GstComplience = React.lazy(() => import("./pages/gstComplience"));

// Admin lazy
const AdminLayout = React.lazy(() =>
  import("./components/AdminComponents/AdminLayout")
);
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const AllUsers = React.lazy(() =>
  import("./components/AdminComponents/AllUser")
);
const AdminOffices = React.lazy(() =>
  import("./components/AdminComponents/AdminOffices")
);
const AdminLeads = React.lazy(() =>
  import("./components/AdminComponents/AdminLeads")
);
const AdminOrders = React.lazy(() =>
  import("./components/AdminComponents/AdminOrders")
);
const OrderDetails = React.lazy(() =>
  import("./components/AdminComponents/OrderDetails")
);

function App() {
  useGTM();
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <StickyWatsapp />
        <StickyChat />
       
        <ScrollToTopButton />

        <Toaster />

        <main>
          <Suspense
            fallback={
              <div className="w-full h-screen text-white flex justify-center bg-gray-700 text-3xl">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Gurgaon />} />

              <Route path="/search" element={<SearchOfficePage />} />
              <Route path="/office/:slug" element={<OfficeDetails />} />
              <Route path="/checkout/:slug" element={<Checkout />} />
              <Route
                path="/compliance/gst-registration-checklist"
                element={<GstComplience />}
              />
              <Route
                path="/compliance/documentGenerator"
                element={<DocumentGenerator />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment-status" element={<PaymentStatus />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route
                path="/terms-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/our-services" element={<OurServices />} />

              <Route path="*" element={<NotFound />} />

              {/* ADMIN ROUTES */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AllUsers />} />
                <Route path="offices" element={<AdminOffices />} />
                <Route path="leads" element={<AdminLeads />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="/admin/orders/:id" element={<OrderDetails />} />
              </Route>
            </Routes>
          </Suspense>
          <Footer />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
