"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav style={{
            borderBottom: "1px solid var(--border)",
            padding: "1rem 0",
            backgroundColor: "white",
            position: "sticky",
            top: 0,
            zIndex: 50
        }}>
            <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "var(--text-primary)",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white"
                    }}>
                        📈
                    </div>
                    <span style={{ fontSize: "1.125rem", fontWeight: "700", color: "var(--primary)" }}>SnapTrader AI</span>
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "2rem", color: "var(--text-secondary)", fontSize: "0.95rem", fontWeight: 500 }}>
                    <Link href="#" style={{ transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>Pricing</Link>
                    <Link href="#" style={{ transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>FAQ</Link>
                    <Link href="#" style={{ transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>Login</Link>
                </div>

                {/* CTA */}
                <button style={{
                    backgroundColor: "var(--primary)",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1.25rem",
                    borderRadius: "6px",
                    fontWeight: 600,
                    fontSize: "0.9rem"
                }}>
                    Sign Up
                </button>
            </div>
        </nav>
    );
}
