import "./globals.css";
import { GlobalContextProvider } from "./context/context";
import ColorThemeProvider from "./context/colorThemeProvider";
import Navbar from "./components/navigation/Navbar";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative h-screen bg-primary text-secondary dark:bg-secondary dark:text-primary overflow-hidden">
        <GlobalContextProvider>
          <ColorThemeProvider>
            <div className="h-full flex flex-col">
              <Navbar />
              <div className="relative flex-grow overflow-y-scroll">
                {children}
              </div>
            </div>
          </ColorThemeProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
