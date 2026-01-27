export default function SignInBanner() {
  return (
    <div className="flex flex-col justify-center items-center space-y-6 text-center max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600 font-sans">
        Welcome back — let’s get you signed in
      </h1>
      <p className="text-gray-500 text-lg md:text-xl">
        Track your food spending, plan smarter meals, and stay within your budget every day.
      </p>
    </div>
  );
}
