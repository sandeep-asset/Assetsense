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
      "/contact",
      "/privacy-policy",
      "/refund-policy",
      "/terms-conditions",
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
