export default function SignupForm() {
  return (
    <div className="w-full max-w-xl p-8 rounded-lg">
      <form className="flex flex-col space-y-4 items-center">
        <div className="flex gap-5">
          <div className="flex-col">
            <p className="text-blue-400 font-sans mb-1">Username</p>
            <input
              type="text"
              placeholder="Username"
              required
              className="w-70 text-gray-500 border border-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-col">
            <p className="text-blue-400 font-sans mb-1">Email</p>
            <input
              type="text"
              placeholder="Email"
              required
              className="w-70 text-gray-500 border border-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex-col">
            <p className="text-blue-400 font-sans mb-1">Password</p>
            <input
              type="text"
              placeholder="Password"
              required
              className="w-70 text-gray-500 border border-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex-col">
            <p className="text-blue-400 font-sans mb-1">Re-Enter Password</p>
            <input
              type="text"
              placeholder="Re-enter Password"
              required
              className="w-70 text-gray-500 border border-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <input
            type="checkbox"
            required
          />
          <p className="text-gray-500">I accept <b>Terms</b> and <b>Conditions</b></p>
        </div>
        <button
          type="submit"
          className="w-80 mt-5 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>

        <div className="flex gap-2">
          <p className="text-gray-500">Already have an account ?</p>
          <a className="text-blue-400" href="/login">
            Log In
          </a>
        </div>
      </form>
    </div>
  );
}
