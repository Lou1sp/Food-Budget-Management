"use client"

import { useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [agreeTermAndCondition, setAgreement] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setLoadingStatus] = useState(false);
  

  const handleSignUp = async () => {
    if(password != reEnterPassword){
      setError("Password Do Not Match");
      return;
    }

    if(!username || !email || !password || !reEnterPassword){
      setError("Please fill in all required field");
      return;
    }
    
    if(!agreeTermAndCondition){
      setError("Please accept Terms and Conditions to continue !")
    }

    setLoadingStatus(true);
    
    try{
      //make sure backend is running on this localhost
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      });

      const data = await res.json();

      if(!res.ok){
        setError(data.detail || "Sign up failed. Please try again !");
        setLoadingStatus(false);
        return;
      }

      // Log success
      console.log("✅ Sign up successful!");
      console.log("Response:", data);
    } catch (err) {
      console.error("Sign up error:", err);
      setError("An error occurred during sign up. Please try again.");
      setLoadingStatus(false);
  }
  }
  return (
    <div className="w-full max-w-xl p-8 rounded-lg">
      <form className="flex flex-col space-y-4 items-center" onSubmit={(e) => {
        e.preventDefault();
        handleSignUp();
      }}>
        <div className="flex gap-5">
          <div className="flex-col">
            <p className="text-blue-400 font-sans mb-1">Username</p>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-70 text-gray-500 border border-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex-col">
            <p className="text-blue-400 font-sans mb-1">Email</p>
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-70 text-gray-500 border border-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-70 text-gray-500 border border-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex-col">
            <p className="text-blue-400 font-sans mb-1">Re-Enter Password</p>
            <input
              type="password"
              placeholder="Re-enter Password"
              required
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
              className="w-70 text-gray-500 border border-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
        
        {error &&
        <div>
          <p className="text-red-500 mt-2">{error} !</p>
        </div>
        }

        <div className="flex gap-3 mt-5">
          <input
            type="checkbox"
            checked={agreeTermAndCondition}
            onChange={(e) => setAgreement(e.target.checked)}
            required
          />
          <p className="text-gray-500">I accept <b>Terms</b> and <b>Conditions</b></p>
        </div>
        <button
          type="submit"
          className="w-80 mt-5 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
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
