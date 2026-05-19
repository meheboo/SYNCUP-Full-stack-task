import "./globals.css";

export const metadata = {
  title: "SYNCUP Coaching Feed",
  description: "Realtime coaching feed assessment app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
