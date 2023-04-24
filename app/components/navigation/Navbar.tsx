import MenuIcon from "./MenuIcon";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import BtnColorMode from "../ui/BtnColorMode";
import LogoComponent from "./LogoComponent";

export default function Navbar() {
  return (
    <header className="relative h-16">
      <nav className="fixed w-full  z-40 bg-secondary text-primary dark:bg-primary dark:text-secondary">
        <div className="w-[95%] max-w-screen-xl mx-auto grid z-50 grid-cols-3 items-center  h-16">
          <LogoComponent />
          <BtnColorMode />
          <MenuIcon />
          <DesktopMenu />
        </div>
      </nav>
      <MobileMenu />
    </header>
  );
}
