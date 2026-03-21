"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-left" // ← tukaj nastavimo pod header na levi
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          top: "4rem", // ← premakne toast malo pod header (če je header npr. 64px)
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };