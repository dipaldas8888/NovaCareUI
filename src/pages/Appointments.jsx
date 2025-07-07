import { useState, useEffect } from "react";
import { appointmentAPI, doctorAPI } from "../services/api";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Calendar,
  Clock,
  Stethoscope,
  Shield,
  Users,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  CalendarCheck,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const AppointmentForm = () => {
  const { doctors, setDoctors } = useApp();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get pre-selected doctor from navigation state
  const selectedDoctor = location.state?.selectedDoctor;
  const preselectedDoctorId = location.state?.preselectedDoctorId;

  const [formData, setFormData] = useState({
    doctorId: preselectedDoctorId ? preselectedDoctorId.toString() : "",
    appointmentDateTime: "",
    notes: "",
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await doctorAPI.getAll();
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [setDoctors]);

  useEffect(() => {
    if (preselectedDoctorId) {
      setFormData((prev) => ({
        ...prev,
        doctorId: preselectedDoctorId.toString(),
      }));
    }
  }, [preselectedDoctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const submitData = {
        doctorId: Number.parseInt(formData.doctorId),
        appointmentDateTime: new Date(
          formData.appointmentDateTime
        ).toISOString(),
        notes: formData.notes,
      };

      const response = await appointmentAPI.create(submitData);
      console.log("Appointment created:", response.data);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 rounded-2xl p-8 text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Appointment Booked!
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Your appointment has been scheduled successfully. We'll send you a
          confirmation shortly and redirect you to the homepage.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 rounded-2xl max-w-md mx-auto">
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CalendarCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Appointment
          </h2>
          <p className="text-gray-600">
            Schedule a consultation with our expert medical professionals
          </p>
        </div>

        {selectedDoctor && (
          <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {selectedDoctor.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Dr. {selectedDoctor.name}
                </h3>
                <p className="text-indigo-600 text-sm">
                  {selectedDoctor.specialization}
                </p>
                <p className="text-gray-600 text-sm">{selectedDoctor.email}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Select Doctor *
            </label>
            <select
              value={formData.doctorId}
              onChange={(e) =>
                setFormData({ ...formData, doctorId: e.target.value })
              }
              required
              className="w-full h-12 px-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Appointment Date & Time *
            </label>
            <input
              type="datetime-local"
              value={formData.appointmentDateTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  appointmentDateTime: e.target.value,
                })
              }
              required
              min={new Date().toISOString().slice(0, 16)}
              className="w-full h-12 px-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Please describe your symptoms, concerns, or any specific requirements for your appointment..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 hover:from-blue-700 hover:via-purple-700 hover:to-teal-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Booking Appointment...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <CalendarCheck className="w-5 h-5" />
                <span>Book Appointment</span>
              </div>
            )}
          </button>
        </form>

        {/* Additional Information */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              Need help? Contact our support team
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>support@novacare.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Appointments = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          "url(/placeholder.svg?height=1080&width=1920&text=Modern+Medical+Facility+with+Professional+Healthcare+Team)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-teal-900/70"></div>

      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8">
              <Stethoscope className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">
                Professional Healthcare
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white mb-8">
              Schedule Your{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Appointment
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-12">
              Book a consultation with our world-class medical professionals.
              Experience personalized healthcare with cutting-edge technology
              and compassionate care.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl text-white mb-2">
                  Easy Scheduling
                </h3>
                <p className="text-blue-200">
                  Book appointments online 24/7 with instant confirmation
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl text-white mb-2">
                  Expert Doctors
                </h3>
                <p className="text-blue-200">
                  Access to specialized medical professionals across all fields
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl text-white mb-2">
                  Quality Care
                </h3>
                <p className="text-blue-200">
                  State-of-the-art facilities with personalized treatment plans
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  50K+
                </div>
                <div className="text-blue-200 text-sm font-medium">
                  Happy Patients
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  100+
                </div>
                <div className="text-blue-200 text-sm font-medium">
                  Expert Doctors
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  25+
                </div>
                <div className="text-blue-200 text-sm font-medium">
                  Specializations
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  24/7
                </div>
                <div className="text-blue-200 text-sm font-medium">
                  Emergency Care
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <AppointmentForm />
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <Phone className="w-6 h-6 text-blue-300" />
                <h3 className="text-xl font-bold text-white">Call Us</h3>
              </div>
              <p className="text-blue-100 mb-2">Emergency: +1 (555) 911-0000</p>
              <p className="text-blue-100">Appointments: +1 (555) 123-4567</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-300" />
                <h3 className="text-xl font-bold text-white">Visit Us</h3>
              </div>
              <p className="text-blue-100 mb-2">123 Healthcare Avenue</p>
              <p className="text-blue-100">Medical District, NY 10001</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-blue-300" />
                <h3 className="text-xl font-bold text-white">Hours</h3>
              </div>
              <p className="text-blue-100 mb-2">Mon-Fri: 8:00 AM - 8:00 PM</p>
              <p className="text-blue-100">Sat-Sun: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-teal-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>
    </div>
  );
};

export default Appointments;
