import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Жавохира и Жасмины",
  description: "Приглашение на свадьбу 24 августа 2025",
  openGraph: {
    title: "Свадьба Жавохира и Жасмины",
    description: "Приглашение на свадьбу 24 августа 2025",
    images: [
      {
        url: "https://crm.uzjoylar.uz/img/e1d2e999-0cb3-412c-b178-b4e69dfed589.jpg", // Rasm URL
        width: 1200,
        height: 630,
        alt: "Приглашение на свадьбу",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Жавохира и Жасмины",
    description: "Приглашение на свадьбу 24 августа 2025",
    images: ["https://crm.uzjoylar.uz/img/e1d2e999-0cb3-412c-b178-b4e69dfed589.jpg"], // Xuddi shu rasm
  },
    generator: 'v0.app'
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
