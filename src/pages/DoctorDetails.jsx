import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/doctors/${id}`);
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
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!doctor) {
    return <p className="text-center text-red-500">Doctor not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 space-y-4">
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-full max-h-80 rounded-lg object-contain"
          />

          <h2 className="text-2xl font-bold">{doctor.name}</h2>
          <p className="text-lg text-muted-foreground">
            {doctor.specialization}
          </p>
          <p className="text-sm">📧 {doctor.email}</p>
          <p className="text-sm">📞 {doctor.contactNumber}</p>
          <p className="text-sm">🕒 {doctor.schedule}</p>
          <p className="text-sm">
            Max Patients / Day: {doctor.maxPatientsPerDay}
          </p>

          <Button className="w-full bg-emerald-500 hover:bg-emerald-700 text-white">
            Book Appointment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
