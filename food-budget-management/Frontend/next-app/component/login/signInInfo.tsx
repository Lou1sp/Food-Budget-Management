"use client"
import { useState } from "react";
export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            email,
            password
          }
        )
      });

      if(!res.ok) {
        throw new Error("Login Failed!");
      }

      const data = await res.json();

      //Save token and user in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("Login successful, here is your token: ", data.token); //From now on, if you want to call API to get data of user, you have to put header with token in the API call
      //Redirect after logged in 
      window.location.href = "/dashboard"
    } catch {
      setError("Incorrect email or password");
    }
  }

  return (
    <div className="w-full max-w-xl p-8 rounded-lg">
      <form className="flex flex-col space-y-4 items-center" onSubmit={(e) => {
        e.preventDefault();
        handleSignIn();
      }}>
        <div className="flex gap-5">
          <div className="flex-col">
            <p className="text-blue-400 font-sans mb-1">Email</p>
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-100 text-gray-500 border border-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
         {error &&
        <div>
          <p className="text-red-500">{error} !</p>
        </div>
        }
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
