import { useState, useEffect } from "react";
import { appointmentAPI, doctorAPI } from "../services/api";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const { doctors, setDoctors } = useApp();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    doctorId: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const submitData = {
        doctorId: parseInt(formData.doctorId),
        appointmentDateTime: new Date(
          formData.appointmentDateTime
        ).toISOString(),
        notes: formData.notes,
      };

      const response = await appointmentAPI.create(submitData);
      console.log("Appointment created:", response.data);
      alert("Appointment booked successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
        <h2 className="text-2xl font-bold text-white mb-6">Book Appointment</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Select Doctor *
            </label>
            <select
              value={formData.doctorId}
              onChange={(e) =>
                setFormData({ ...formData, doctorId: e.target.value })
              }
              required
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
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
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
              className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
              placeholder="Any additional notes or symptoms..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-6 py-2 font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Appointments = () => {
  return <AppointmentForm />;
};

export default Appointments;
