import express from "express";
import { SitemapStream, streamToPromise } from "sitemap";
import Office from "../models/Office.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: "https://assetsense.in",
    });

    // -------- STATIC FRONTEND ROUTES (PUBLIC PAGES ONLY) --------
    const staticPages = [
      "/",
      "/search",
      "/our-services",
      "/about",
      "/contact",
      "/login",
      "/register",
      "/privacy-policy",
      "/refund-policy",
      "/terms-conditions",
    ];

    staticPages.forEach((url) => {
      smStream.write({
        url,
        changefreq: "monthly",
        priority: url === "/" ? 1.0 : 0.7,
      });
    });

    // -------- DYNAMIC OFFICE DETAIL PAGES --------
    const offices = await Office.find().select("slug");

    offices.forEach((office) => {
      smStream.write({
        url: `/office/${office.slug}`,
        changefreq: "weekly",
        priority: 0.9,
      });

      // Checkout pages (if you want Google to index them)
    });

    // -------- FINISH & SEND XML --------
    smStream.end();
    const sitemap = await streamToPromise(smStream);

    res.header("Content-Type", "application/xml");
    res.send(sitemap.toString());
  } catch (error) {
    console.error("Sitemap Error:", error);
    res.status(500).end();
  }
});

export default router;
