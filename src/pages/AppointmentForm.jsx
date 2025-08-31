import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function AppointmentForm() {
  const { id } = useParams(); // doctorId from URL (e.g., /doctors/5/book)
  const [form, setForm] = useState({
    appointmentDateTime: "",
    notes: "",
    type: "Normal",
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
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await api.post("/api/appointments", {
        doctorId: parseInt(id),
        appointmentDateTime: form.appointmentDateTime,
        notes: form.notes,
        type: form.type,
      });
      setSuccess("Appointment booked successfully!");
      setForm({ appointmentDateTime: "", notes: "", type: "Normal" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 rounded-xl border border-zinc-800/50">
      <h2 className="text-2xl font-bold text-white mb-6">Book Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="appointmentDateTime" className="text-white">
            Appointment Date & Time
          </Label>
          <Input
            id="appointmentDateTime"
            name="appointmentDateTime"
            type="datetime-local"
            value={form.appointmentDateTime}
            onChange={handleChange}
            required
            className="bg-zinc-800/50 border-zinc-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" className="text-white">
            Appointment Type
          </Label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full rounded-md bg-zinc-800/50 border border-zinc-700 text-white p-2"
          >
            <option value="Normal">Normal</option>
            <option value="Video">Video</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-white">
            Notes
          </Label>
          <Textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any specific concern?"
            className="bg-zinc-800/50 border-zinc-700 text-white"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-[#2CEE91] to-[#00a86b] text-black font-semibold"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Booking...
            </>
          ) : (
            "Book Appointment"
          )}
        </Button>
      </form>

      {success && (
        <p className="mt-4 text-green-400 font-medium text-center">{success}</p>
      )}
      {error && (
        <p className="mt-4 text-red-400 font-medium text-center">{error}</p>
      )}
    </div>
  );
}
