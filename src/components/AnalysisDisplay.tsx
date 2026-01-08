"use client";

import { AnalysisResult } from "@/app/actions";

interface AnalysisDisplayProps {
    loading: boolean;
    analysis: AnalysisResult | { error: string } | null;
}

export default function AnalysisDisplay({ loading, analysis }: AnalysisDisplayProps) {
    if (loading) {
        return (
            <div style={{
                padding: "3rem",
                textAlign: "center",
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                marginTop: "2rem",
                border: "1px solid var(--border)"
            }}>
                <div className="spinner" style={{
                    border: "4px solid var(--surface)",
                    borderTop: "4px solid var(--primary)",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    margin: "0 auto 1.5rem",
                    animation: "spin 1s linear infinite"
                }}></div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)" }}>Analyzing Chart Pattern...</h3>
                <p style={{ color: "var(--text-secondary)" }}>Identifying signals and key levels</p>
                <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    if (!analysis) return null;

    if ('error' in analysis) {
        return (
            <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#fef2f2", color: "var(--danger)", borderRadius: "var(--radius)" }}>
                {analysis.error}
            </div>
        );
    }

    const isBuy = analysis.signal === "BUY";
    const signalColor = isBuy ? "var(--success)" : "var(--danger)";
    const signalBg = isBuy ? "#ecfdf5" : "#fef2f2";

    return (
        <div style={{
            marginTop: "2rem",
            backgroundColor: "white",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
        }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
                <div>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{analysis.title}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{
                            backgroundColor: signalBg,
                            color: signalColor,
                            padding: "0.25rem 0.75rem",
                            borderRadius: "6px",
                            fontWeight: 700,
                            fontSize: "0.875rem"
                        }}>
                            {analysis.signal} SIGNAL
                        </span>
                        <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                            • {analysis.reasoning.split('.')[0]}.
                        </span>
                    </div>
                </div>

                <div style={{
                    backgroundColor: "#eff6ff",
                    color: "var(--primary)",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontWeight: 600,
                    fontSize: "1rem"
                }}>
                    {analysis.confidence}% Confidence
                </div>
            </div>

            {/* Grid Layout */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>

                {/* Reasoning */}
                <div>
                    <h4 style={{ marginBottom: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>Analysis</h4>
                    <p style={{ lineHeight: "1.6", color: "var(--text-primary)" }}>{analysis.reasoning}</p>
                </div>

                {/* Key Levels */}
                <div style={{ backgroundColor: "var(--surface)", padding: "1.5rem", borderRadius: "8px" }}>
                    <h4 style={{ marginBottom: "1rem", color: "var(--text-secondary)", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" }}>Trade Plan</h4>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ color: "var(--text-secondary)" }}>Entry</span>
                        <span style={{ fontWeight: 600 }}>{analysis.key_levels.entry}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ color: "var(--text-secondary)" }}>Stop Loss</span>
                        <span style={{ fontWeight: 600, color: "var(--danger)" }}>{analysis.key_levels.stop_loss}</span>
                    </div>

                    <div style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px dashed var(--border)" }}>
                        {analysis.key_levels.targets.map((target, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                                <span style={{ color: "var(--text-secondary)" }}>Target {i + 1}</span>
                                <span style={{ fontWeight: 600, color: "var(--success)" }}>{target}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
