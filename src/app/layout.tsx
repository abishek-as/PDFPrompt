import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { cn, constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";
import "./globals.css";

const font = Fira_Sans({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="light">
            <Providers>
                <body
                    className={cn(
                        "min-h-screen font-sans antialiased grainy",
                        font.className
                    )}
                >
                    <Toaster />
                    <Navbar />
                    {children}
                </body>
            </Providers>
        </html>
    );
}
