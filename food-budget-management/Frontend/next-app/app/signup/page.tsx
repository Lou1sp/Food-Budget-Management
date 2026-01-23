import SignUpBackground from "@/component/signup/signUpBackground";
import SignUpBanner from "@/component/signup/signUpBanner";
import SignupForm from "@/component/signup/signUpInfo";
export default function SignUp() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left: Background image */}
      <div className="md:w-1/3 w-full h-64 md:h-auto">
        <SignUpBackground />
      </div>

      {/* Right: Banner / Form */}
      <div className="md:w-2/3 w-full flex flex-col justify-center items-center bg-gray-50 p-8 md:p-16">
        <SignUpBanner />
        <SignupForm />
      </div>
    </div>
  );
}
