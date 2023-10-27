import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const font = Fira_Sans({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "PDFPrompt",
    description:
        "Unlock PDFs with AI: Summarize and Question, Instant Answers.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="light">
            <body
                className={cn(
                    "min-h-screen font-sans antialiased grainy",
                    font.className
                )}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
}
