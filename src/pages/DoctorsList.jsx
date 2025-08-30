import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Doctors in {specialization}</h1>

      {loading ? (
        <div className="grid place-items-center h-40">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : doctors.length === 0 ? (
        <p className="text-muted-foreground">No doctors found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => (
            <Card key={d.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-6 space-y-2">
                <img
                  src={d.imageUrl}
                  alt={d.name}
                  className=" w-full rounded-lg object-cover aspect-ratio-4/3"
                />
                <h3 className="text-lg font-semibold">{d.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {d.specialization}
                </p>

                <p className="text-sm">📧 {d.email}</p>

                <Button
                  asChild
                  className="mt-2 w-full  border border-emerald-500 hover:bg-emerald-700 bg-emerald-400 text-white "
                >
                  <Link to={`/doctors/${d.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
