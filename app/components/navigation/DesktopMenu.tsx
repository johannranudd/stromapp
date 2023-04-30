import Link from "next/link";
export default function DesktopMenu() {
  return (
    <div className="hidden md:inline md:space-x-3 md:ml-auto md:flex md:items-center mlg:space-x-6">
      <Link href={"/"} className="group flex flex-col items-center">
        Home
        <span className="h-[2px] w-0 group-hover:w-full duration-300 bg-thirdClrDark dark:bg-thirdClr"></span>
      </Link>
      <Link href={"/dashboard"} className="group flex flex-col items-center">
        Dashboard
        <span className="h-[2px] w-0 group-hover:w-full duration-300 bg-thirdClrDark dark:bg-thirdClr"></span>
      </Link>
      <Link href={"/profile"} className="group flex flex-col items-center">
        Profile
        <span className="h-[2px] w-0 group-hover:w-full duration-300 bg-thirdClrDark dark:bg-thirdClr"></span>
      </Link>
      <Link href={"/login"} className="group flex flex-col items-center">
        Login
        <span className="h-[2px] w-0 group-hover:w-full duration-300 bg-thirdClrDark dark:bg-thirdClr"></span>
      </Link>
    </div>
  );
}
