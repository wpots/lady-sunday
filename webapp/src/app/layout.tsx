import type { Metadata } from "next";
import "./_assets/theme.css";
import "./globals.css";
import StyledComponentsRegistry from "./_lib/AntdRegistry";

export const metadata: Metadata = {
  title: "Lady Sunday",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
