import Image from "next/image";
import BgPic from "../../public/signUpBackground.png";

export default function SignUpBackground() {
  return (
    <div className="h-full w-full relative">
      <Image
        src={BgPic}
        alt="Sign Up Background"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
}
