"use client";

import { useState } from "react";
import Link from "next/link";

const plans = [
    {
        name: "Free",
        price: "$0",
        features: ["3 AI Analyses / day", "Basic Trade Plans", "Community Access"],
        cta: "Stay Free",
        highlight: false
    },
    {
        name: "Pro",
        price: "$29",
        features: ["Unlimited AI Analyses", "Premium Entry/SL/Target levels", "Saved Analysis History", "Priority Support"],
        cta: "Go Pro",
        highlight: true
    }
];

export default function PricingPage() {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async (planName: string) => {
        if (planName === "Free") return;

        setLoading(true);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

            const { url } = await response.json();
            window.location.href = url;
        } catch (error: any) {
            console.error("Checkout Error:", error);
            alert("Checkout Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "white", padding: "6rem 0" }}>
            <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Simple, transparent pricing.</h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem", marginBottom: "4rem" }}>
                    Choose the plan that fits your trading style.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                    {plans.map((plan) => (
                        <div key={plan.name} style={{
                            padding: "3rem 2rem",
                            borderRadius: "16px",
                            border: plan.highlight ? "2px solid var(--primary)" : "1px solid var(--border)",
                            backgroundColor: "white",
                            boxShadow: plan.highlight ? "0 20px 40px rgba(98, 0, 234, 0.1)" : "none",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            {plan.highlight && (
                                <div style={{
                                    position: "absolute",
                                    top: "-12px",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    backgroundColor: "var(--primary)",
                                    color: "white",
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    textTransform: "uppercase"
                                }}>
                                    Most Popular
                                </div>
                            )}
                            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{plan.name}</h3>
                            <div style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "2rem" }}>
                                {plan.price}<span style={{ fontSize: "1rem", color: "var(--text-secondary)", fontWeight: 400 }}>/mo</span>
                            </div>

                            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 3rem 0", textAlign: "left", flex: 1 }}>
                                {plan.features.map((feature) => (
                                    <li key={feature} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "var(--text-secondary)" }}>
                                        <span style={{ color: "var(--primary)" }}>✓</span> {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleCheckout(plan.name)}
                                disabled={loading}
                                className={plan.highlight ? "btn-primary" : "btn-outline"}
                                style={{
                                    width: "100%",
                                    padding: "1rem",
                                    cursor: loading ? "not-allowed" : "pointer",
                                    opacity: loading ? 0.7 : 1
                                }}
                            >
                                {loading && plan.highlight ? "Redirecting..." : plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
