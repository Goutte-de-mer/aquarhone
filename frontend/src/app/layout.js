import "../globals.css";

export const metadata = {
  title: "Aquarhône",
  description: "Réserve une visite sur le rhône",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
