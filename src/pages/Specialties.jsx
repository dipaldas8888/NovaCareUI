import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SPECIALTIES } from "@/services/specialities";

export default function Specialties() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-white">Our Specialties</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SPECIALTIES.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.slug}
              className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800/50 hover:shadow-lg hover:shadow-emerald-500/20 transition"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Icon className="w-8 h-8 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-white">{s.name}</h3>
                </div>

                <Button
                  asChild
                  className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
                >
                  <Link
                    to={`/doctors?specialization=${encodeURIComponent(s.name)}`}
                  >
                    View Doctors
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
