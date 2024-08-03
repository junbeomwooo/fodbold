import type { Metadata } from "next";
import "../styles/global.css";
import Header from "../components/header/header";
import Providers from "../components/provider";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "FODBOLD",
  },
  description:
    "Football Website which can get information about football teams, players, matches and news",
  icons: {
    icon: "/img/ball.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/**JSX 문법에서는 자식 요소를 직접 컴포넌트의 태그 안에 넣기만 하면 자동으로 children prop으로 전달됩니다. 따라서 children을 명시적으로 전달할 필요가 없음 */}
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
