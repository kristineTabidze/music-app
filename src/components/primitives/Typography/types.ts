import React from "react";

export  interface ITypographyProps {
    children: React.ReactNode;
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "caption" | "p";
    className?: string;
}