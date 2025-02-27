import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
    setFormData({ name: "", email: "" }); // Reset form on toggle
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:7000/user/add", formData);
      if (response.data.user._id) {
        sessionStorage.setItem("userId", response.data.user._id);
        navigate("/home");
      } else {
        alert("Error in authentication");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                {showSignUp ? "Student Sign Up" : "Student Sign In"}
              </h1>
              <p className="text-[12px] text-gray-500">
                {showSignUp ? "Enter details to create your account" : "Enter your email to sign in"}
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form className="mx-auto max-w-xs flex flex-col gap-4" onSubmit={handleSubmit}>
                {showSignUp && (
                  <input
                    className="w-full px-5 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                )}
                <input
                  className="w-full px-5 py-3 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <span className="ml-3">{showSignUp ? "Sign Up" : "Sign In"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-5 text-gray-500 text-xs">
        <p>
          {showSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className="text-blue-900 font-semibold" onClick={toggleForm}>
            {showSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signin;
