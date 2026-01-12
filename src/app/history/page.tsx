"use client";

import { useEffect, useState } from "react";
import { fetchHistoryAction } from "../actions";
import AnalysisDisplay from "@/components/AnalysisDisplay";
import Link from "next/link";

export default function HistoryPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
            const data = await fetchHistoryAction();
            if (Array.isArray(data)) {
                setHistory(data);
            }
            setLoading(false);
        };
        loadHistory();
    }, []);

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "var(--surface)", padding: "4rem 0" }}>
            <div className="container" style={{ maxWidth: "1000px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
                    <div>
                        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Trade History</h1>
                        <p style={{ color: "var(--text-secondary)" }}>Your previous AI chart analyses</p>
                    </div>
                    <Link href="/" className="btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                        ← Back to Home
                    </Link>
                </div>

                {loading ? (
                    <div style={{ textAlign: "center", padding: "4rem" }}>
                        <div className="spinner" style={{
                            border: "4px solid white",
                            borderTop: "4px solid var(--primary)",
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            margin: "0 auto",
                            animation: "spin 1s linear infinite"
                        }}></div>
                        <style jsx>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                    </div>
                ) : history.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "6rem 2rem", backgroundColor: "white", borderRadius: "16px", border: "1px solid var(--border)" }}>
                        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
                        <h3>No history found</h3>
                        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>You haven't analyzed any charts yet.</p>
                        <Link href="/" className="btn-primary" style={{ padding: "0.75rem 2rem" }}>
                            Analyze Your First Chart
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        {history.map((item) => (
                            <div key={item.id}>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.5rem", marginLeft: "1rem" }}>
                                    {new Date(item.created_at).toLocaleDateString(undefined, {
                                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                </div>
                                <AnalysisDisplay loading={false} analysis={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
