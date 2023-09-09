"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "tahsin131@gmail.com",
    password: "tahsin131",
  });

  const formHandler = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.email.length === 0) {
      alert("Email Required");
    } else if (formValues.password.length === 0) {
      alert("Password Required");
    } else {
      const config = { method: "POST", body: JSON.stringify(formValues) };
      const response = await fetch("/api/login", config);
      const json = await response.json();
      if (json["status"] === true) {
        router.replace("/dashboard");
      } else {
        alert(json["msg"]);
      }
    }
  };
  return (
    <div className="flex items-center justify-center text-center bg-gray-900 text-gray-100 h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg text-gray-100"
      >
        <label for="email" className="self-start text-xs font-semibold">
          Email
        </label>
        <input
          onChange={(e) => formHandler("email", e.target.value)}
          id="email"
          type="email"
          name="email"
          value={formValues.email}
          className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ri text-gray-900 focus:border-rose-500 focus:ri"
        />
        <label for="password" className="self-start mt-3 text-xs font-semibold">
          Password
        </label>
        <input
          onChange={(e) => formHandler("password", e.target.value)}
          id="password"
          type="password"
          name="password"
          value={formValues.password}
          className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ri text-gray-900 focus:border-rose-500 focus:ri"
        />
        <button
          type="submit"
          className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded bg-rose-500 text-gray-900"
        >
          Login
        </button>
        <div className="flex justify-center mt-6 space-x-2 text-xs">
          <Link href="/signup" className="text-gray-400">
            Forgot Password?
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/signup" className="text-gray-400">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
