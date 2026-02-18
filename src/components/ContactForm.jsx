import { motion } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/leads/createlead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Message sent successfully ✅");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (err) {
      console.error(err);
      alert("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white flex items-center justify-center px-4"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full grid md:grid-cols-2 gap-12"
      >
        {/* LEFT INFO */}
        <motion.div variants={itemVariants} className="text-black flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>

          <p className="text-gray-600 mb-6 max-w-md">
            Get in touch with us. We’re here to help you start your fitness journey.
          </p>

          <div className="space-y-3 text-gray-700 text-sm">
            <p>📧 powerfitgym@gmail.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 Chhatrapati Sambhajinagar, Maharashtra</p>
          </div>
        </motion.div>

        {/* FORM */}
        <motion.div variants={itemVariants} className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-black shadow-sm">
          <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>

          <motion.form variants={containerVariants} className="grid gap-4" onSubmit={handleSubmit}>

            <motion.div variants={itemVariants}>
              <label className="text-sm text-gray-800">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-400 transition"
                placeholder="Your name"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="text-sm text-gray-800">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-400 transition"
                placeholder="Your email"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="text-sm text-gray-800">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-400 transition"
                placeholder="Your phone"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="text-sm text-gray-600">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-400 transition"
                placeholder="Your message"
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>

          </motion.form>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ContactForm;
