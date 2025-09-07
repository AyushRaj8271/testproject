import React, { useState } from "react";
import logo from "./assets/logo.png"; // put file in src/assets/logo.png

const LOCAL_API_URL = "http://localhost:8000";
const PROD_API_URL = "https://testprojectbackend.onrender.com"; // replace with your production backend URL
function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await fetch(`${PROD_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.access_token);
        localStorage.setItem("token", data.access_token);
      } else {
        const err = await res.json().catch(() => null);
        alert("Login failed: " + (err?.detail || res.status));
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1020] via-[#0c1330] to-[#16082f] relative overflow-hidden">
      {/* background subtle stars (pure CSS) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/2 to-transparent opacity-10" />
      </div>

      {/* small top-left logo */}
      <img
        src={logo}
        alt="logo"
        className="absolute top-8 left-8 w-12 h-12 opacity-90"
      />

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-96 p-8 rounded-2xl bg-white/6 border border-white/20 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
      >
        {/* neon glow strip behind inputs */}
        <div
          className="absolute -inset-0.5 rounded-2xl blur-xl opacity-30 bg-gradient-to-r from-[#00b4ff] via-[#6d28d9] to-[#ff5ca8]"
          style={{ filter: "blur(24px)" }}
        />

        <h2 className="relative text-center text-white text-2xl font-semibold mb-6">
          Login
        </h2>

        <div className="relative mb-4">
          <input
            aria-label="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // className="relative z-20 w-full px-4 py-3 rounded-xl bg-white/6 border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-[#00b4ff] transition"
            className="login-input"
          />

          <div className="absolute left-4 top-3 w-10 h-1 bg-gradient-to-r from-transparent via-[#00b4ff] to-transparent opacity-60" />
        </div>

        <div className="relative mb-6">
          <input
            aria-label="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <div className="absolute left-4 top-3 w-10 h-1 bg-gradient-to-r from-transparent via-[#6d28d9] to-transparent opacity-60" />
        </div>

        <button
          type="submit"
          className="relative z-20 w-full py-3 rounded-full text-white font-semibold bg-gradient-to-r from-[#00b4ff] to-[#8b5cf6] shadow-lg transform-gpu hover:scale-[1.02] active:scale-100 transition"
        >
          Login
        </button>

        <p className="relative z-20 mt-4 text-center text-white/60 text-sm underline cursor-pointer">
          Forgot Password?
        </p>

        {/* tiny sparkle decorations */}
        <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-tr from-white/60 to-transparent opacity-20 blur-2xl animate-pulse" />
        <div className="absolute bottom-4 left-6 w-2 h-2 bg-white/90 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      </form>
    </div>
  );
}

export default Login;
