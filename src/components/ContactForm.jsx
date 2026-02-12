import { motion } from "framer-motion";

const containerVariants = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: { staggerChildren: 0.25 },
},
};

const itemVariants = {
hidden: { opacity: 0, y: 30 },
visible: {
opacity: 1,
y: 0,
transition: { duration: 0.7, ease: "easeOut" },
},
};

const ContactForm = () => {
return (
<motion.section
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.8 }}
className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] flex items-center justify-center px-4"
>
<motion.div
variants={containerVariants}
initial="hidden"
animate="visible"
className="max-w-6xl w-full grid md:grid-cols-2 gap-8"
>

    {/* LEFT INFO */}
    <motion.div
      variants={itemVariants}
      className="text-gray-100 flex flex-col justify-center px-4"
    >
      <motion.h2
        variants={itemVariants}
        whileHover={{ letterSpacing: "0.12em" }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
      >
        Contact Us
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-gray-400 mb-6 max-w-md"
      >
        Feel free to contact us and we will get back to you as soon as possible.
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="space-y-3 text-gray-300"
      >
        <motion.p whileHover={{ x: 6 }}>📧 powerfitgym@gmail.com</motion.p>
        <motion.p whileHover={{ x: 6 }}>📞 +91 98765 43210</motion.p>
        <motion.p whileHover={{ x: 6 }}>📍 Chhatrapati Sambhajinagar, Maharashtra</motion.p>
      </motion.div>
    </motion.div>

    {/* FORM */}
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(124,58,237,0.25)] p-8 text-gray-100"
    >
      <motion.h3
        variants={itemVariants}
        className="text-2xl font-semibold mb-6"
      >
        We'd love to hear from you!
      </motion.h3>

      <motion.form
        variants={containerVariants}
        className="grid gap-4"
      >
        {["Name", "Email", "Phone"].map((label, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <label className="text-sm text-gray-300">{label}</label>
            <motion.input
              type={label === "Email" ? "email" : label === "Phone" ? "tel" : "text"}
              whileFocus={{ scale: 1.03 }}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-400 placeholder-gray-400 transition-all duration-300"
              placeholder={`Your ${label.toLowerCase()}`}
              required
            />
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <label className="text-sm text-gray-300">Message</label>
          <motion.textarea
            rows="4"
            whileFocus={{ scale: 1.03 }}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-400 placeholder-gray-400 transition-all duration-300"
            placeholder="Your message"
            required
          />
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 25px rgba(139,92,246,0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-2 rounded-lg font-semibold tracking-wide transition-all duration-300"
        >
          Send Message
        </motion.button>
      </motion.form>
    </motion.div>
  </motion.div>
</motion.section>


);
};

export default ContactForm;
