"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Copy, CheckCircle } from "lucide-react";

export default function page() {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const email = "aman.code.clips@gmail.com";
  const upiLink =
    "upi://pay?pa=aman8486@ybl&pn=Aman%20Kumar%20Prasad&am=10.00&cu=INR&tn=Donation";

  useEffect(() => {
    setVisible(true);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10 bg-background text-foreground">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Profile section */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/dp.jpg"
            alt="Your profile picture"
            width={160}
            height={160}
            className="rounded-full border shadow-md"
          />
          <h1
            className={`text-4xl font-bold mt-6 transition-opacity duration-700 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            About Me
          </h1>
          <p
            className={`text-muted-foreground mt-3 text-lg max-w-xl transition-opacity duration-700 delay-300 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            Welcome to my music app! I'm passionate about building clean and
            enjoyable web experiences for everyone.
          </p>
        </div>

        {/* Feedback section */}
        <div className="bg-card p-6 rounded-2xl shadow-md space-y-4">
          <h2 className="text-2xl font-semibold">Feedback & Suggestions</h2>
          <p className="text-muted-foreground">
            I'd love to hear your thoughts! Feel free to reach out via email:
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-base font-medium">{email}</span>
            <button
              onClick={copyEmail}
              className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        {/* Support section */}
        <div className="bg-card p-6 rounded-2xl shadow-md flex flex-col items-center text-center space-y-4">
          <h2 className="text-2xl font-semibold">Support My Work</h2>
          <p className="text-muted-foreground">
            If you enjoy this app, consider a small donation to help keep it
            growing!
          </p>
          <p className="font-medium">Donate ₹10 — Scan QR code</p>
          <Image
            src="/qr.png"
            alt="UPI QR Code"
            width={120}
            height={120}
            className="rounded-md border shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
