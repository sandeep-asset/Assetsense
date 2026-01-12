import express from "express";
import { SitemapStream, streamToPromise } from "sitemap";
import Office from "../models/Office.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: "https://assetsense.in",
    });

    // -------- STATIC FRONTEND ROUTES --------
    const staticPages = [
      "/",
      "/search",
      "/gst-registration-checklist",
      "/our-services",
      "/about",
      "/career",
      "/contact",
      "/privacy-policy",
      "/refund-policy",
      "/terms-conditions",
      "/office/affordable-virtual-office-in-jaipur-rajasthan",
      "/office/best-value-virtual-office-in-new-delhi-safdarjung-enclave-pin-110029",
      "/office/premium-coworking-office-in-spaze-i-tech-park-sohna-road-gurgaon-122001-haryana",
      "/office/virtual-office-greater-noida-affordable-virtual-office-in-noida",
      "/office/virtual-office-haridwar-affordable-virtual-office-in-haridwar",
      "/office/affordable-virtual-office-in-surat-gujarat",
      "/office/coworking-space-surat-private-cabin-in-surat",
      "/office/affordable-virtual-office-in-neemuch-mp-pin-458441",
      "/office/affordable-virtual-office-in-nagpur-maharashtra-pin-441110-for-gst-mca-registration",
      "/office/virtual-office-guwahati-affordable-virtual-office-in-guwahati-assam-pin-781029",
      "/office/virtual-office-sangrur-affordable-virtual-office-in-sangrur-pin-148001",
      "/office/virtual-office-gurgaon-virtual-office-in-emaar-the-palm-square-golf-course-road-extn-rajesh-pilot-marg",
    ];

    staticPages.forEach((url) => {
      smStream.write({
        url,
        changefreq: "monthly",
        priority: url === "/" ? 1.0 : 0.7,
        lastmod: new Date().toISOString(), // ✅ safe addition
      });
    });

    // -------- DYNAMIC OFFICE DETAIL PAGES --------
    const offices = await Office.find().select("slug");

    offices.forEach((office) => {
      if (!office.slug) return;

      smStream.write({
        url: `/office/${office.slug}`, // ✅ IMPORTANT: backticks fixed
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(), // ✅ safe
      });
    });

    // -------- FINISH & SEND XML --------
    smStream.end();
    const sitemap = await streamToPromise(smStream);

    res.set({
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    });

    res.send(sitemap.toString());
  } catch (error) {
    console.error("Sitemap Error:", error);
    res.status(500).end();
  }
});

export default router;
