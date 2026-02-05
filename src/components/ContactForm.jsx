const ContactForm = () => {
  return (
    <section className="min-h-screen bg-[#4F4775] flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        
        <div className="text-white flex flex-col justify-center px-4">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-200 mb-6 max-w-md">
            Feel free to contact us and we will get back to you as soon as possible.
          </p>

          <div className="space-y-3 text-gray-200">
            <p>📧 powerfitgym@gmail.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 Chhatrapati Sambhajinagar, Maharashtra</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            We'd love to hear from you!
          </h3>

          <form className="grid gap-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                type="tel"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your phone number"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Message</label>
              <textarea
                rows="4"
                className="w-full border text-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your message"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#4F4775] hover:bg-[#403868] text-white py-2 rounded-md font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
