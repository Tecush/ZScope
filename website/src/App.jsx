import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import PageNotFound from "@/lib/PageNotFound";
import ScrollToTop from "@/components/ScrollToTop";
import SiteLayout from "@/components/zscope/SiteLayout";
import Home from "@/pages/Home";
import Features from "@/pages/Features";
import VerificationPage from "@/pages/VerificationPage";
import DownloadPage from "@/pages/DownloadPage";
import CitationPage from "@/pages/CitationPage";

const TITLES = {
  "/": "ZScope — Electrochemical Impedance Analysis, from Spectra to Quantities",
  "/features": "Features — ZScope",
  "/verification": "Verification — ZScope",
  "/download": "Download — ZScope",
  "/citation": "Citation — ZScope",
};

// Keeps the browser tab title in step with client-side navigation.
function TitleSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const key = pathname.replace(/\/+$/, "") || "/";
    document.title = TITLES[key] ?? "Page not found — ZScope";
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <TitleSync />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/citation" element={<CitationPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
