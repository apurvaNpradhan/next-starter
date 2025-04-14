import type { ReactNode } from "react";
import { ThemeProvider } from "./theme";

export default function RootProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
    >{children}</ThemeProvider>
  );
}

