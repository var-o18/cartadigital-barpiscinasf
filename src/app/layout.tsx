import type { Metadata, Viewport } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Títulos, etiquetas y navegación: Josefin Sans (aire art déco, combina con el logo retro).
const josefin = Josefin_Sans({ variable: "--font-josefin", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Carta · Bar Piscina San Fulgencio",
  description: "Carta digital del Bar Piscina San Fulgencio: comidas, bocadillos, hamburguesas, granizados, cafés y bebidas.",
  openGraph: {
    title: "Carta · Bar Piscina San Fulgencio",
    description: "¡Disfruta, relájate y brinda! Consulta nuestra carta desde el móvil.",
    locale: "es_ES",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#111111",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} ${josefin.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
