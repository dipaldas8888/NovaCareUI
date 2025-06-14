import { useState, useEffect } from "react";
import { appointmentAPI, doctorAPI, patientAPI } from "../services/api";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import React from "react";

const AppointmentForm = ({ appointment, onSubmit, onCancel }) => {
  const { doctors, patients } = useApp();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    doctorId: appointment?.doctor?.id || "",
    patientId: appointment?.patient?.id || "",
    appointmentDateTime: appointment?.appointmentDateTime
      ? new Date(appointment.appointmentDateTime).toISOString().slice(0, 16)
      : "",
    notes: appointment?.notes || "",
  });
  useEffect(() => {
    if (!user) {
      setError("Please log in to book appointments");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        doctorId: formData.doctorId,
        appointmentDateTime: new Date(
          formData.appointmentDateTime
        ).toISOString(),
        notes: formData.notes,
      };

      console.log("Submitting appointment data:", submitData);

      const response = await appointmentAPI.create(submitData);
      console.log("Appointment created successfully:", response.data);

      setFormData({
        doctorId: "",
        appointmentDateTime: "",
        notes: "",
      });

      onSubmit(response.data);
    } catch (error) {
      console.error("Error in form submission:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {appointment ? "Edit Appointment" : "Book New Appointment"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor *
              </label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>
            {user && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient
                </label>
                <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  {user.name || "Anonymous User"} ({user.email})
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Date & Time *
              </label>
              <input
                type="datetime-local"
                name="appointmentDateTime"
                value={formData.appointmentDateTime}
                onChange={handleChange}
                required
                min={new Date().toISOString().slice(0, 16)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter any additional notes or symptoms..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {appointment ? "Update" : "Book"} Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const AppointmentCard = ({ appointment, onEdit, onCancel }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Appointment #{appointment.id}
          </h3>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              appointment.status
            )}`}
          >
            {appointment.status}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(appointment)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            disabled={appointment.status === "Cancelled"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onCancel(appointment.id)}
            className="text-red-600 hover:text-red-800 transition-colors"
            disabled={appointment.status === "Cancelled"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <div>
            <p className="font-medium">Dr. {appointment.doctor?.name}</p>
            <p className="text-sm text-gray-500">
              {appointment.doctor?.specialization}
            </p>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <div>
            <p className="font-medium">{appointment.patient?.name}</p>
            <p className="text-sm text-gray-500">
              {appointment.patient?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z"
            />
          </svg>
          <span>{formatDateTime(appointment.appointmentDateTime)}</span>
        </div>

        {appointment.notes && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-700">Notes:</p>
            <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Appointments = () => {
  const {
    appointments,
    setAppointments,
    doctors,
    setDoctors,
    patients,
    setPatients,
    loading,
    setLoading,
    error,
    setError,
  } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [appointmentsRes, doctorsRes, patientsRes] = await Promise.all([
        appointmentAPI.getAll(),
        doctorAPI.getAll(),
        patientAPI.getAll(),
      ]);

      setAppointments(appointmentsRes.data);
      setDoctors(doctorsRes.data);
      setPatients(patientsRes.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      console.log("Submitting appointment data:", formData); // Add this log

      if (editingAppointment) {
        await appointmentAPI.update(editingAppointment.id, formData);
      } else {
        await appointmentAPI.create(formData);
      }
      await fetchData();
      setShowForm(false);
      setEditingAppointment(null);
    } catch (err) {
      setError("Failed to save appointment. Please try again.");
      console.error("Error saving appointment:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        setLoading(true);
        await appointmentAPI.cancel(appointmentId);
        await fetchData();
      } catch (err) {
        setError("Failed to cancel appointment. Please try again.");
        console.error("Error cancelling appointment:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus = !filterStatus || appointment.status === filterStatus;
    const matchesSearch =
      !searchTerm ||
      appointment.doctor?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.patient?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.patient?.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600 mt-2">
              Manage patient appointments and schedules
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Book Appointment
          </button>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by doctor or patient name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {!loading && (
          <>
            {filteredAppointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onEdit={handleEdit}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h3z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No appointments found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || filterStatus
                    ? "Try adjusting your search criteria."
                    : "Get started by booking your first appointment."}
                </p>
                {!searchTerm && !filterStatus && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Book Appointment
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {showForm && (
          <AppointmentForm
            appointment={editingAppointment}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingAppointment(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Appointments;
