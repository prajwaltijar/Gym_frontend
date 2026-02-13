import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ContactForm = () => {
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
        <motion.div
          variants={itemVariants}
          className="text-black flex flex-col justify-center"
        >
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
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-black shadow-sm"
        >
          <h3 className="text-2xl font-semibold mb-6">
            Send us a message
          </h3>

          <motion.form
            variants={containerVariants}
            className="grid gap-4"
          >
            {["Name", "Email", "Phone"].map((label, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <label className="text-sm text-gray-800">{label}</label>
                <input
                  type={
                    label === "Email"
                      ? "email"
                      : label === "Phone"
                      ? "tel"
                      : "text"
                  }
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-400 transition"
                  placeholder={`Your ${label.toLowerCase()}`}
                  required
                />
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <label className="text-sm text-gray-600">Message</label>
              <textarea
                rows="4"
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-400 transition"
                placeholder="Your message"
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
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
