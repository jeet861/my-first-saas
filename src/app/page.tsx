"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import UploadZone from "@/components/UploadZone";
import AnalysisDisplay from "@/components/AnalysisDisplay";
import { analyzeChartAction } from "./actions";
import Image from "next/image";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    // Smooth scroll to analysis section
    setTimeout(() => {
      document.getElementById("analysis-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleImageSelected = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setAnalysis(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const result = await analyzeChartAction(formData);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      setAnalysis("Error analyzing chart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section style={{ padding: "6rem 0" }}>
          <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

            {/* Left Column: Text */}
            <div>
              <h1 style={{ fontSize: "4rem", lineHeight: "1.1", marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
                Trade like a pro,<br />
                without the guru.
              </h1>
              <p style={{ fontSize: "1.25rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "2.5rem", maxWidth: "500px" }}>
                AI-powered chart analysis that delivers actionable trade plans based on proven patterns, not personalities.
              </p>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={handleStartAnalysis}
                  className="btn-primary"
                  style={{ fontSize: "1.125rem", padding: "1rem 2rem" }}
                >
                  Analyze a Chart
                </button>
                <button className="btn-outline" style={{ fontSize: "1.125rem", padding: "1rem 2rem" }}>
                  View Pricing
                </button>
              </div>
            </div>

            {/* Right Column: Visual Mockup */}
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              padding: "2rem",
              border: "1px solid var(--border)"
            }}>
              <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: '#f9fafb', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                {/* Placeholder for a chart graph if no image */}
                <svg width="100%" height="80%" viewBox="0 0 400 200" style={{ overflow: 'visible' }}>
                  <path d="M 0 150 C 50 140, 100 160, 150 110 S 250 140, 300 80 S 350 40, 400 20" fill="none" stroke="#6200ea" strokeWidth="3" />
                  <line x1="300" y1="20" x2="300" y2="180" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>SPY Daily Chart</div>
                  <div style={{ color: 'var(--success)', fontWeight: 700 }}>Buy Signal Detected</div>
                </div>
                <div style={{ backgroundColor: '#eff6ff', color: '#6200ea', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 600 }}>
                  87% Confidence
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Analysis/Upload Section (Conditionally revealed or scrolled to) */}
        <section id="analysis-section" style={{ padding: "4rem 0", backgroundColor: "var(--surface)" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Analyze Your Chart</h2>
              <p style={{ color: "var(--text-secondary)" }}>Upload a screenshot to get started.</p>
            </div>

            <UploadZone
              onImageSelected={handleImageSelected}
              selectedImage={previewUrl}
            />

            {selectedFile && !loading && !analysis && (
              <button
                onClick={handleAnalyze}
                className="btn-primary"
                style={{
                  marginTop: "1.5rem",
                  width: "100%",
                  padding: "1rem",
                  fontSize: "1.1rem"
                }}
              >
                Run Analysis
              </button>
            )}

            <AnalysisDisplay loading={loading} analysis={analysis} />
          </div>
        </section>
      </main>

      <footer style={{ marginTop: 'auto', padding: '3rem 0', textAlign: 'center', color: 'var(--text-secondary)', borderTop: "1px solid var(--border)" }}>
        <p>© {new Date().getFullYear()} SnapTrader AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
