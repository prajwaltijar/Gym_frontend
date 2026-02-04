import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdminAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const ok = login(username, password);

    if (!ok) {
      setError("Invalid admin credentials. Try again.");
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
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-900/80 border border-gray-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-extrabold mb-2 text-center">Admin Login</h1>
        <p className="text-gray-400 text-sm mb-6 text-center">
          Use the admin credentials to access the dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              Admin Email
            </label>
            <input
              id="username"
              type="email"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-lg bg-black/40 border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/60"
              placeholder="admin@gym.com"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg bg-black/40 border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/60"
              placeholder="admin123"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-red-600 py-2.5 text-sm font-semibold uppercase tracking-wide hover:bg-red-500 transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="mt-4 text-[11px] text-gray-500 text-center">
          Demo credentials: <span className="text-gray-300">admin@gym.com</span> /
          <span className="text-gray-300"> admin123</span>
        </p>
      </div>
    </main>
  );
};

export default AdminLogin;
