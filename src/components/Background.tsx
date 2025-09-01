"use client";

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

interface BackgroundProps {
  children: React.ReactNode;
  color: string;
}

export default function Background({ children, color }: BackgroundProps) {
  const currentColorRgb = hexToRgb(color);
  const glowStyle = currentColorRgb
    ? {
        backgroundColor: `rgba(${currentColorRgb.r}, ${currentColorRgb.g}, ${currentColorRgb.b}, 0.3)`,
        transition: "background-color 5s ease-in-out",
      }
    : {};

  return (

    <div className="min-h-screen w-full bg-[#1D1D1D] relative overflow-hidden">

      <div
        className="fixed -bottom-20 -left-20 -right-20 h-20 z-0"
        style={{
          ...glowStyle,
          filter: 'blur(50px)'
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
