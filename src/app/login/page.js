"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/authContext";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token); // login via context
        toast.success("Logged in successfully");
        router.push("/playlists");
      } else {
        const data = await response.json();
        toast.error(data.message || "Invalid email or password");
      }
    } catch (err) {
      toast.error("An error occurred during login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white mx-auto mt-16 shadow-md"
    >
      <h1 className="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
      <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>

      {/* Email input */}
      <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" />
        </svg>
        <input
          type="email"
          placeholder="Email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
        />
      </div>

      {/* Password input */}
      <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" />
        </svg>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
        />
      </div>

      <div className="mt-5 text-left text-indigo-500">
        <a className="text-sm" href="#">Forgot password?</a>
      </div>

      <button
        type="submit"
        className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
      >
        Login
      </button>

      <p className="text-gray-500 text-sm mt-3 mb-11">
        Don’t have an account?{" "}
        <a className="text-indigo-500" href="/signup">
          Sign up
        </a>
      </p>
    </form>
  );
}
