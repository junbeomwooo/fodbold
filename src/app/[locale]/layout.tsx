import type { Metadata } from "next";
import "../../styles/global.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Providers from "./provider";
import StoreProvider from "./StoreProvider";
import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

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

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/**JSX 문법에서는 자식 요소를 직접 컴포넌트의 태그 안에 넣기만 하면 자동으로 children prop으로 전달됩니다. 따라서 children을 명시적으로 전달할 필요가 없음 */}
          <StoreProvider>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
