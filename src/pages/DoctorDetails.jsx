import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/services/api";
import { Loader2, Mail, Phone, Clock, Stethoscope, Users } from "lucide-react";

export default function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/doctors/${id}`);
        console.log("Doctor details:", data);
        setDoctor(data);
      } catch (err) {
        console.error("Error fetching doctor details", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="grid place-items-center h-60">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <p className="text-center text-red-500 font-medium">Doctor not found.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 rounded-xl p-8 mb-8 border border-zinc-800/50">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full md:w-64 h-64 rounded-xl overflow-hidden border border-zinc-800/50">
                <img
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  src={doctor.imageUrl}
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {doctor.name}
                </h1>
                <p className="text-lg text-zinc-300 mb-3">
                  {doctor.specialization}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#2CEE91] text-black text-xs font-medium rounded-full">
                    Available
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                <Stethoscope className="w-4 h-4 text-[#2CEE91]" />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">
                    Specialization
                  </p>
                  <p className="text-sm text-white font-medium">
                    {doctor.specialization}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                <Clock className="w-4 h-4 text-[#2CEE91]" />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">
                    Experience
                  </p>
                  <p className="text-sm text-white font-medium">
                    {doctor.experience}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                <Users className="w-4 h-4 text-[#2CEE91]" />
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">
                    Qualification
                  </p>
                  <p className="text-sm text-white font-medium">
                    {doctor.qualification}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-80 flex flex-col gap-4">
            <div className="bg-zinc-800/30 rounded-lg p-6 text-center border border-zinc-700/50">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-[#2CEE91]" />
                <span className="text-sm text-zinc-400 uppercase tracking-wide">
                  Email
                </span>
              </div>
              <p className="text-white font-medium">{doctor.email}</p>
            </div>

            <Link
              to={`/doctors/${doctor.id}/book`}
              className="bg-gradient-to-r from-[#2CEE91] to-[#00a86b] text-black font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-[#2CEE91]/25 transition-all duration-300"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 rounded-xl p-8 border border-zinc-800/50">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-[#2CEE91] to-[#00a86b] rounded-full"></div>
          About Doctor
        </h2>
        <p className="text-zinc-400">{doctor.profileInfo}</p>
      </div>
    </div>
  );
}
