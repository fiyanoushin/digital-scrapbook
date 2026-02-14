import { useState } from "react";
import { signIn } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signIn(form.email, form.password);
      navigate("/");
    } catch (err) {
      toast.error("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-amber-50 to-stone-100 px-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-10 space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome Home
            </h1>
            <p className="text-gray-500 text-sm">Family access only ❤️</p>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              className="border-2 border-gray-200 rounded-xl p-4 w-full focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300"
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="border-2 border-gray-200 rounded-xl p-4 w-full focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all duration-300"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold w-full py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mt-6">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}