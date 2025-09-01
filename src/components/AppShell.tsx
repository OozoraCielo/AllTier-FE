"use client"; 
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";

const colors = [
  "#AE5050",
  "#AE7F50",
  "#AEA450",
  "#64AE50",
  "#50AEAC",
  "#5077AE",
  "#6E50AE",
];

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const currentColor = colors[currentColorIndex];

  return (
    <Background color={currentColor}>
      <Navbar color={currentColor} />
      <main className="p-8">
        {children}
      </main>
    </Background>
  );
}
