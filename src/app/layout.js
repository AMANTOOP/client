import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import Navbar from "./_components/Navbar";
import { Toaster } from "react-hot-toast";
import GlobalPlayer from "./_components/globalPlayer";
import { PlayerProvider } from "@/hooks/usePlayer";
import { PlaylistProvider } from "@/context/playlistProvider";
import { RecommendationsProvider } from "@/context/recommendationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "iodify",
  description: "World's no. 1 music player",
  icons: {
    icon: "/favicon.svg", // Default favicon
    shortcut: "/favicon.ico",
    other: {
      rel: "android-chrome",
      url: "/favicon.svg",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PlayerProvider>
        <PlaylistProvider>
        <RecommendationsProvider>
        <AuthProvider>
        <Navbar />
        <Toaster />
        {children}

        <GlobalPlayer />
        
        </AuthProvider>
        </RecommendationsProvider>
        </PlaylistProvider>
        </PlayerProvider>
      </body>
    </html>
  );
}
