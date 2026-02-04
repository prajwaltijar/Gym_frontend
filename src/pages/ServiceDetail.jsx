import { Link, useParams } from "react-router-dom";
import { getServiceBySlug } from "../data/services";

const ServiceDetail = () => {
  const { serviceSlug } = useParams();
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-extrabold">Service not found</h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            The service you are looking for does not exist or may have been moved.
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-2 rounded-full bg-red-600 hover:bg-red-500 text-sm font-semibold transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const { title, tagline, overview, approach, benefits, idealFor } = service;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-10 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-red-400 mb-2">
              Service Detail
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {title}
            </h1>
          </div>

          <Link
            to="/"
            className="hidden sm:inline-flex px-4 py-2 rounded-full border border-gray-700 text-xs font-semibold uppercase tracking-wide hover:border-red-500 hover:text-red-400 transition-colors"
          >
            ← Back
          </Link>
        </div>

        <section className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-8">
          {tagline && (
            <p className="text-red-300 text-xs md:text-sm font-semibold uppercase tracking-wide">
              {tagline}
            </p>
          )}

          <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed">
            {overview && <p>{overview}</p>}
            {approach && <p>{approach}</p>}
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {Array.isArray(benefits) && benefits.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3 text-white">
                  What you get
                </h2>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm md:text-base">
                  {benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(idealFor) && idealFor.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3 text-white">
                  Perfect for
                </h2>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm md:text-base">
                  {idealFor.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 text-sm text-gray-400 max-w-md">
            <p>
              Want to get started with this service? Our team will help you pick the right plan and schedule that fits your routine.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-sm font-semibold uppercase tracking-wide shadow-lg shadow-red-600/30 transition-colors"
          >
            Book this service
          </Link>
        </div>

        <div className="mt-6 sm:hidden">
          <Link
            to="/"
            className="inline-flex text-xs text-gray-400 hover:text-red-400 transition-colors"
          >
            ← Back to all services
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetail;
