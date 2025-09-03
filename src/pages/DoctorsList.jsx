import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "@/services/api";
import { Loader2, Mail, Stethoscope } from "lucide-react";
export default function DoctorsList() {
  const [sp] = useSearchParams();
  const specialization = sp.get("specialization") || "";
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!specialization) return;

    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get(
          `/api/doctors/specialization/${encodeURIComponent(specialization)}`
        );
        setDoctors(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [specialization]);

  return (
    <div className="bg-neutral-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-white">
          Doctors in {specialization}
        </h1>

        {loading ? (
          <div className="grid place-items-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
          </div>
        ) : doctors.length === 0 ? (
          <p className="text-zinc-400">No doctors found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d) => (
              <div
                key={d.id}
                className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 rounded-xl border border-zinc-800/50 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={d.imageUrl || "/placeholder.svg"}
                    alt={d.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {d.name}
                  </h3>
                  <p className="text-emerald-400 flex items-center gap-2 mb-2">
                    <Stethoscope className="w-4 h-4" />
                    {d.specialization}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span className="truncate">{d.email}</span>
                  </div>

                  <div className="mt-4">
                    <Link
                      to={`/doctors/${d.id}`}
                      className="inline-block w-full text-center bg-gradient-to-r from-[#2CEE91] to-[#00a86b] text-black font-semibold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#2CEE91]/30 transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
