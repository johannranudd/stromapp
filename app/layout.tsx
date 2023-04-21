import "./globals.css";
import { GlobalContextProvider } from "./context/context";
import ColorThemeProvider from "./context/colorThemeProvider";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // dark:bg-secondary dark:text-primary

  return (
    <html lang="en">
      <body className="relative min-h-screen bg-primary text-secondary dark:bg-secondary dark:text-primary">
        <GlobalContextProvider>
          <ColorThemeProvider>
            <Navbar />
            <div>{children}</div>
            <Footer />
          </ColorThemeProvider>
        </GlobalContextProvider>
      </body>
    </html>
  );
}

// export const metadata = {
//   title: "stromapp",
//   description: "Generated by create next app",
// };

// const RootLayout = ({ children }: any) => (
//   <html lang="en">
//     <body className="relative min-h-screen bg-primary text-secondary dark:bg-secondary dark:text-primary">
//       <GlobalContextProvider>
//         <div>{children}</div>
//       </GlobalContextProvider>
//     </body>
//   </html>
// );

// export default RootLayout;
