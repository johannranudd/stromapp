import Link from "next/link";

interface BtnCtaProps {
  props: string;
}

export default function BtnCta({ props }: BtnCtaProps) {
  return (
    <div className={`${props}`}>
      <Link href={`/login`} className="text-xl font-bold btnCta">
        Test Selv
      </Link>
    </div>
  );
}
