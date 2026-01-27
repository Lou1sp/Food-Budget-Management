"use client"

export default function SigninForm() {
  return (
    <div className="w-full max-w-xl p-8 rounded-lg">
      <form className="flex flex-col space-y-4 items-center">
        <div className="flex gap-5">
          <div className="flex-col">
            <p className="text-blue-400 font-sans mb-1">Email</p>
            <input
              type="text"
              placeholder="Email"
              required
              className="w-100 text-gray-500 border border-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex-col">
            <p className="text-blue-400 font-sans mb-1">Password</p>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-100 text-gray-500 border border-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

        </div>
        
        <a href="" className="text-blue-500 mt-2 flex hover:underline">Forgot your password ?</a>

        <button
          type="submit"
          className="w-80 mt-2 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
            Sign In
        </button>

        <div className="flex gap-2">
          <p className="text-gray-500">Do not have an account ?</p>
          <a className="text-blue-400" href="/signup">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
