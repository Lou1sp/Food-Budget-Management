import SignInBackground from '@/component/login/signInBackground';
import SignInBanner from '@/component/login/signInBanner';
import SigninForm from '@/component/login/signInInfo';
export default function SignUp() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* Left: Form */}
      <div className="md:w-2/3 w-full flex flex-col justify-center items-center bg-gray-50 p-8 md:p-16">
        <SignInBanner />
        <SigninForm />
      </div>

      {/* Right: Background image */}
      <div className="md:w-1/3 w-full h-64 md:h-auto">
        <SignInBackground />
      </div>

     
    </div>
  );
}
