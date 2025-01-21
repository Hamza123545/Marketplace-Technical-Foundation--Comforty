// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Make sure this exists in the right location
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Topbar from "./components/Topbar";
import { CartProvider } from "@/app/context/CartContext"; // Import the CartProvider
import { WishlistProvider } from "./context/WishlistContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Figma Hackathon",
  description: "Done by Muhammad Hamza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Wrap the entire layout with the CartProvider to make context available throughout the app
    <CartProvider>
      <WishlistProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <Topbar />
          <Header />
          <Navbar />
          
          {/* Children components will now have access to CartContext */}
          {children}
          
          <Footer />
        </body>
      </html>
      </WishlistProvider>
    </CartProvider>
  );
}
