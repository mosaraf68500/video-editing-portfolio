import "./globals.css";

export const metadata = {
  title: "Sahadat Media",
  description:
    "A modern one-page portfolio for a video editor specializing in cinematic, high-retention content.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
