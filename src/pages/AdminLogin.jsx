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
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>

        <input
  type="email"
  placeholder="admin@gym.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>


        <input
          type="password"
          placeholder="admin123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-black border"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button className="w-full bg-red-600 py-2 rounded mt-3">
          Login
        </button>
      </form>
    </main>
  );
};

export default AdminLogin;
