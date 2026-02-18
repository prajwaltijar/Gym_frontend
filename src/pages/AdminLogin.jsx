import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdminAuth();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const ok = await login(email, password);

  if (!ok) {
    setError("Invalid admin credentials");
    return;
  }

  navigate("/admin", { replace: true });
};



  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

 return (
  <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 shadow-2xl rounded-2xl p-8 space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold tracking-wide">Admin Panel</h1>
        <p className="text-zinc-400 text-sm">
          Login to manage gym dashboard
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Email Address</label>
        <input
          type="email"
          placeholder="admin@gym.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/70 border border-zinc-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40 outline-none transition"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/70 border border-zinc-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/40 outline-none transition"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/30 py-2 rounded-lg">
          {error}
        </p>
      )}

      {/* Button */}
      <button
        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition duration-200 active:scale-95 shadow-lg shadow-yellow-500/20"
      >
        Login
      </button>

      {/* Footer */}
      <p className="text-center text-xs text-zinc-500 pt-2">
        Authorized personnel only
      </p>
    </form>
  </main>
);

};

export default AdminLogin;
