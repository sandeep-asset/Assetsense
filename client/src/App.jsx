import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import OfficeDetails from "./pages/OfficeDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import { Toaster } from "react-hot-toast";

import SearchOfficePage from "./pages/SearchOfficePage";
import AllUsers from "./components/AdminComponents/AllUser";
import AdminLayout from "./components/AdminComponents/AdminLayout";
import AdminOffices from "./components/AdminComponents/AdminOffices";
import AdminLeads from "./components/AdminComponents/AdminLeads";
import AdminDashboard from "./pages/AdminDashboard";
import Gurgaon from "./pages/Gurgaon";
import Footer from "./components/Footer";
import FooterNew from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTop";
import StickyWatsapp from "./components/stickyWatsapp";
import AdminOrders from "./components/AdminComponents/AdminOrders";
import Checkout from "./pages/Checkout";
import OrderDetails from "./components/AdminComponents/OrderDetails";
import PaymentStatus from "./components/Payment/PaymentStatus";
import Privacy from "./pages/Privacy";
import RefundPolicy from "./pages/Refund";
import TermsAndConditions from "./pages/Termandcondition";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurServices from "./pages/OurServices";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Toaster />
        <StickyWatsapp />
        <ScrollToTopButton />

        <main>
          <Routes>
            <Route path="/" element={<Gurgaon />} />

            <Route path="/search" element={<SearchOfficePage />} />
            <Route path="/office/:slug" element={<OfficeDetails />} />
            <Route path="/checkout/:slug" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/our-services" element={<OurServices />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              {/* Nested routes inside AdminLayout */}
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AllUsers />} />
              <Route path="offices" element={<AdminOffices />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="/admin/orders/:id" element={<OrderDetails />} />
            </Route>
          </Routes>

          <Footer />
          {/* <FooterNew /> */}
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
