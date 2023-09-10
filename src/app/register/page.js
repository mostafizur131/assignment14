"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleForm = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.email.length === 0) {
      alert("Email Required");
    } else if (formData.password.length === 0) {
      alert("Password Required");
    } else {
      // Send registration data to your server for processing and email verification
      const config = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/register", config);
      const json = await response.json();
      console.log(json);
      if (json["status"] === true) {
        alert("Registration successful! Check your email for verification.");
        router.replace("/dashboard");
      } else {
        alert(json["msg"]);
      }
    }
  };

  return (
    <div className="flex items-center justify-center text-center h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-900 text-gray-100 ">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Register</h1>
          <p className="text-sm text-gray-400">Register to access </p>
        </div>
        <form onSubmit={handleRegister} className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                onChange={(e) => handleForm("email", e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
              </div>
              <input
                onChange={(e) => handleForm("password", e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md border-gray-700 bg-gray-900 text-gray-100"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-violet-400 text-gray-900"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
