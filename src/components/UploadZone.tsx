"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface UploadZoneProps {
    onImageSelected: (file: File) => void;
    selectedImage: string | null;
}

export default function UploadZone({ onImageSelected, selectedImage }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onImageSelected(e.dataTransfer.files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageSelected(e.target.files[0]);
        }
    };

    return (
        <div
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                border: `2px dashed ${isDragging ? "var(--primary)" : "var(--border)"}`,
                borderRadius: "var(--radius)",
                padding: "2rem",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: isDragging ? "rgba(59, 130, 246, 0.1)" : "var(--surface)",
                transition: "all 0.2s ease",
                width: "100%",
                minHeight: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
            }}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                accept="image/*"
                style={{ display: "none" }}
            />

            {selectedImage ? (
                <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "300px" }}>
                    <Image
                        src={selectedImage}
                        alt="Chart Preview"
                        fill
                        style={{ objectFit: "contain" }}
                    />
                </div>
            ) : (
                <>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📈</div>
                    <h3 style={{ marginBottom: "0.5rem" }}>Upload Chart Image</h3>
                    <p style={{ color: "var(--text-secondary)" }}>
                        Drag & drop or click to select
                    </p>
                </>
            )}
        </div>
    );
}
