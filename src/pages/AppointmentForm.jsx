import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/services/api";

import {
  Loader2,
  Calendar,
  User,
  Phone,
  FileText,
  Stethoscope,
  Clock,
  CheckCircle,
  Heart,
  Activity,
  Shield,
} from "lucide-react";

export default function AppointmentForm() {
  const { id } = useParams();
  const [form, setForm] = useState({
    appointmentDateTime: "",
    notes: "",
    type: "Normal",
    patientName: "",
    patientMobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/api/appointments", {
        doctorId: parseInt(id),
        appointmentDateTime: new Date(form.appointmentDateTime)
          .toISOString()
          .slice(0, 19),
        notes: form.notes,
        type: form.type,
        patientName: form.patientName,
        patientMobile: form.patientMobile,
      });
      setSuccess("Appointment booked successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to book appointment. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-4 md:p-8 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="hidden lg:block space-y-6">
            <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-zinc-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Premium Healthcare
                </h3>
              </div>
              <p className="text-zinc-400">
                Book your appointment with our experienced doctors and get the
                best medical care.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white">
                <Heart className="w-8 h-8 mb-3" />
                <h4 className="font-semibold mb-1">Expert Care</h4>
                <p className="text-sm opacity-90">Trusted by thousands</p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <Activity className="w-8 h-8 mb-3" />
                <h4 className="font-semibold mb-1">24/7 Support</h4>
                <p className="text-sm opacity-90">Always here for you</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/20">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">
                  Safe & Secure
                </span>
              </div>
              <p className="text-zinc-300 text-sm">
                Your health information is protected with enterprise-grade
                security.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-zinc-800 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Book Appointment
                  </h2>
                  <p className="text-white/80 text-sm">
                    Schedule your visit in just a few steps
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-zinc-300 font-medium flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-zinc-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.patientName}
                  onChange={(e) =>
                    setForm({ ...form, patientName: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-zinc-300 font-medium flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={form.patientMobile}
                  onChange={(e) =>
                    setForm({ ...form, patientMobile: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                  placeholder="Enter your mobile number"
                />
              </div>

              <div className="space-y-2">
                <label className="text-zinc-300 font-medium flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  Appointment Date & Time
                </label>
                <input
                  name="appointmentDateTime"
                  type="datetime-local"
                  value={form.appointmentDateTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-zinc-300 font-medium flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-zinc-400" />
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any specific concerns or symptoms?"
                  className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/40 outline-none min-h-[100px]"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Booking...
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Appointment
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-6 pt-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Secure
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Instant Confirmation
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified Doctors
                </span>
              </div>

              {success && (
                <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                  <p className="font-medium">{success}</p>
                </div>
              )}
              {error && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                  <p className="font-medium">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
