import type { Metadata } from "next";
import "../styles/global.css";
import Header from "../components/header/header";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "LiveFootball",
  },
  description:
    "Football Website which can get information about football teams, players, matches and news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
