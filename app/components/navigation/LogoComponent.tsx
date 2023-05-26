import LogoSVG from "../../../assets/images/logo.svg";
import Link from "next/link";
import Image from "next/image";
export default function LogoComponent() {
  return (
    <Link href={"/"} className="flex items-center">
      <Image src={LogoSVG} alt="logo" width={40} />
      <span className="hidden text-xl xs:block xs:ml-1">StromApp</span>
    </Link>
  );
}
