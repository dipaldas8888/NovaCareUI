import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";
import hospitalBuilding from "../assets/Hospital.jpg";
import doctorPatient from "../assets/hospitalImage.jpg";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]"></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Your Health, Our
                <span className="block text-blue-200">Priority</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Experience world-class healthcare with our state-of-the-art
                facilities and expert medical professionals. Book your
                appointment today and take the first step towards better health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/appointments"
                  className="group bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 text-center"
                >
                  Book Appointment
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  to="/doctors"
                  className="group border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 text-center"
                >
                  Find Doctors
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-blue-200">Specialists</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">1000+</div>
                  <div className="text-blue-200">Patients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-blue-200">Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-blue-200">Years</div>
                </div>
              </div>
            </div>

            {/* Image Grid */}
            <div className="hidden lg:block relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={hospitalBuilding}
                  alt="Medical Team"
                  className="rounded-lg shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                />
                <img
                  src={doctorPatient}
                  alt="Healthcare Service"
                  className="rounded-lg shadow-2xl transform translate-y-12 rotate-6 hover:rotate-0 transition-transform duration-500"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose NovaCare?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive healthcare services with a focus on
              patient care, advanced technology, and medical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Care
              </h3>
              <p className="text-gray-600">
                Our team of experienced doctors and specialists provide
                personalized care tailored to your specific needs.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                24/7 Service
              </h3>
              <p className="text-gray-600">
                Round-the-clock emergency services and support to ensure you get
                the care you need, when you need it.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Advanced Technology
              </h3>
              <p className="text-gray-600">
                State-of-the-art medical equipment and cutting-edge technology
                for accurate diagnosis and effective treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive healthcare services for all your medical needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Cardiology", icon: "❤️" },
              { name: "Neurology", icon: "🧠" },
              { name: "Orthopedics", icon: "🦴" },
              { name: "Pediatrics", icon: "👶" },
              { name: "Dermatology", icon: "🩺" },
              { name: "Oncology", icon: "🎗️" },
              { name: "Emergency Care", icon: "🚑" },
              { name: "Surgery", icon: "⚕️" },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {isAuthenticated
              ? "Book your appointment or manage your patient records today."
              : "Join thousands of satisfied patients. Register now to access our services."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Link
                  to="/appointments"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Book Appointment
                </Link>
                <Link
                  to="/patients"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Manage Patients
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Register Now
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
