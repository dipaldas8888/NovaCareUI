import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SPECIALTIES } from "@/services/specialities";

export default function Specialties() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Our Specialties</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SPECIALTIES.map((s) => (
          <Card key={s.slug} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-4">
                <h3 className="text-lg font-semibold">{s.name}</h3>
              </div>

              <Button
                asChild
                className="mt-2 border border-emerald-500 hover:bg-emerald-700 bg-emerald-400 text-white "
              >
                <Link
                  to={`/doctors?specialization=${encodeURIComponent(s.name)}`}
                >
                  View Doctors
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
