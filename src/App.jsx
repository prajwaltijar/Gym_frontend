import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";
import Plans from "./pages/Plans";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
         <Route path="/admin/login" element={<AdminLogin />} />
         <Route
           path="/admin"
           element={
             <AdminRoute>
               <AdminDashboard />
             </AdminRoute>
           }
         />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
