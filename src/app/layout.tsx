import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell"; // Import the new client component
import AmplitudeProvider from "@/components/AmplitudeProvider";
import { AuthProvider } from "@/components/AuthProvider";

// Now you can safely export metadata because this is a Server Component.
export const metadata: Metadata = {
  title: {
    default: "AllTier",   // fallback
    template: "%s | AllTier",  // lets pages inject titles dynamically
  },
  description: "%s | AllTier Page Description"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {/* Use the AppShell to wrap the children. */}
        {/* The shell provides the interactive background/navbar, */}
        {/* while the {children} can still be Server Components. */}
         <AuthProvider>
            <AmplitudeProvider>
              <AppShell>
                 <div className="mt-10">
                  {children}
                </div>
              </AppShell>
            </AmplitudeProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
