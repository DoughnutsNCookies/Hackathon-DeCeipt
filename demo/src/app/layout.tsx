import type { Metadata } from "next";
import "@/styles/global.css";
import templateConfig from "@/../template.config";

export const metadata: Metadata = {
  title: templateConfig.metadata.title,
  description: templateConfig.metadata.description,
  keywords: templateConfig.metadata.keywords,
  authors: templateConfig.metadata.authors,
  openGraph: {
    title: templateConfig.metadata.title,
    type: "website",
    url: templateConfig.metadata.url,
    siteName: templateConfig.metadata.siteName,
    description: templateConfig.metadata.description,
    images: [
      {
        url: templateConfig.metadata.metaTagImage,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: templateConfig.metadata.twitterHandle,
    creator: templateConfig.metadata.twitterCreator,
    images: templateConfig.metadata.metaTagImage,
  },
  alternates: {
    canonical: templateConfig.metadata.url,
  },
  publisher: templateConfig.metadata.siteName,
  icons: {
    icon: templateConfig.metadata.faviconImage,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-text">{children}</body>
    </html>
  );
}
