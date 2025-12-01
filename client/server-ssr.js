import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./src/App.jsx"; // your full app

const __dirname = path.resolve();
const app = express();

// serve static assets
app.use(express.static(path.join(__dirname, "dist")));

const SSR_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/refund-policy",
  "/terms-conditions",
];

app.get("*", (req, res) => {
  const url = req.url.split("?")[0];

  // ❌ Not SSR: skip dynamic routes
  if (!SSR_ROUTES.includes(url)) {
    const indexHtml = fs.readFileSync("dist/index.html", "utf8");
    return res.send(indexHtml);
  }

  // ✔ SSR for static SEO pages
  try {
    const appHtml = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    );

    let html = fs.readFileSync("dist/index.html", "utf8");
    html = html.replace(
      `<div id="root"></div>`,
      `<div id="root">${appHtml}</div>`
    );

    res.set("Content-Type", "text/html");
    res.send(html);
  } catch (e) {
    console.error("SSR error:", e);
    res.status(500).send("SSR Error");
  }
});

app.listen(3001, () => console.log("SSR running on :3001"));
