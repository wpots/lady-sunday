import type { Metadata } from "next";
import "./globals.css";
import { ConfigProvider } from "antd";

export const metadata: Metadata = {
  title: "Lady Sunday",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeConfig = {
    token: {},
    components: {
      Layout: {
        headerColor: "white",
        siderBg: "green",
      },
      Typography: {
        titleMarginTop: "1rem",
      },
    },
  };
  // https://ant.design/components/layout#specification
  return (
    <html lang="en">
      <ConfigProvider theme={themeConfig}>
        <body>{children}</body>
      </ConfigProvider>
    </html>
  );
}
