import Image from "next/image";
import BgPic from "../../public/signInBackground.png";

export default function SignInBackground() {
  return (
    <div className="h-full w-full relative">
      <Image
        src={BgPic}
        alt="Sign In Background"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
}
