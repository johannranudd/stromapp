import LogoSVG from "../../../assets/images/logo.svg";
import Link from "next/link";
import Image from "next/image";
export default function LogoComponent() {
  return (
    <Link href={"/"} className="flex items-end">
      <Image src={LogoSVG} alt="logo" width={40} />
      <span className="hidden text-xl xs:block">StromPrisApp</span>
    </Link>
  );
}
