import type { Metadata } from "next";
import { hindVadodara } from './fonts';
import "./globals.css";
import { LanguageProvider } from './context/LanguageContext';

export const metadata: Metadata = {
  title: "ગુજરાત રિન્યુએબલ્સ | સોલાર લેન્ડ એગ્રિગેટર",
  description: "ગુજરાતમાં સોલાર પ્રોજેક્ટ્સ માટે તમારી જમીન ભાડે આપો અથવા વેચો.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="gu" className={hindVadodara.variable}>
      <body className={`font-sans ${hindVadodara.className}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
