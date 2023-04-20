import {
  TiSocialTwitter,
  TiSocialFacebookCircular,
  TiSocialLinkedin,
} from "react-icons/ti";
import LogoComponent from "./LogoComponent";
export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 py-4 rounded-t-md border-t bg-secondary text-primary dark:bg-primary dark:text-secondary">
      <div className="w-[95%] max-w-screen-xl mx-auto space-y-3 grid justify-items-center items-center xs:grid-cols-3 xs:space-y-0">
        <div className="xs:justify-self-start">
          <LogoComponent />
        </div>
        <div className="flex items-center text-[1.5rem] space-x-3">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fourthClrDark hover:dark:text-fourthClr"
          >
            <TiSocialTwitter />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fourthClrDark hover:dark:text-fourthClr"
          >
            <TiSocialFacebookCircular />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fourthClrDark hover:dark:text-fourthClr"
          >
            <TiSocialLinkedin />
          </a>
        </div>
        <p className="hover:text-fourthClrDark hover:dark:text-fourthClr xs:justify-self-end">
          <a href="mailto:example@example.com">example@example.com</a>
        </p>
      </div>
    </footer>
  );
}
