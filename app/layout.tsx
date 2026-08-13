import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  return {
    title: "ספיר וילונות | תפירה והתקנה בהתאמה אישית",
    description: "וילונות בעבודת יד — מדידה, תפירה והתקנה אישית עד הבית.",
    openGraph: { title: "ספיר וילונות | בדיוק במידה", description: "מדידה, תפירה והתקנה אישית עד הבית.", images: [image], locale: "he_IL", type: "website" },
    twitter: { card: "summary_large_image", title: "ספיר וילונות | בדיוק במידה", description: "מדידה, תפירה והתקנה אישית עד הבית.", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="he" dir="rtl"><body>{children}</body></html>;
}
