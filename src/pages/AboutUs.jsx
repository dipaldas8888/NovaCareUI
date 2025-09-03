import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Heart,
  Stethoscope,
  ShieldCheck,
  Smartphone,
  Clock,
  Users,
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br bg-neutral-900 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            About NovaCare
          </h1>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            NovaCare connects patients with trusted doctors, offering secure
            appointment booking and health management at your fingertips.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border-zinc-700">
            <CardHeader>
              <Stethoscope className="h-10 w-10 text-emerald-400 mb-4" />
              <CardTitle className="text-emerald-400">Our Mission</CardTitle>
              <CardDescription className="text-zinc-400">
                Making healthcare more accessible, reliable, and convenient by
                empowering patients to connect with verified doctors anytime,
                anywhere.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border-zinc-700">
            <CardHeader>
              <ShieldCheck className="h-10 w-10 text-emerald-400 mb-4" />
              <CardTitle className="text-emerald-400">Our Vision</CardTitle>
              <CardDescription className="text-zinc-400">
                To become the most trusted healthcare platform where patients
                and doctors collaborate seamlessly for better health outcomes.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Core Values */}
        <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          Our Core Values
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border-zinc-700">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Compassion</h3>
              <p className="text-zinc-400 text-sm">
                We put patients first, ensuring empathy and care in every
                interaction.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border-zinc-700">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Collaboration</h3>
              <p className="text-zinc-400 text-sm">
                Doctors, patients, and technology working hand-in-hand for
                better healthcare delivery.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border-zinc-700">
            <CardContent className="p-6 text-center">
              <Smartphone className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Innovation</h3>
              <p className="text-zinc-400 text-sm">
                Leveraging modern technology to simplify healthcare access, from
                booking to video consultations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border-zinc-700">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Accessibility</h3>
              <p className="text-zinc-400 text-sm">
                Reducing waiting times with real-time availability and instant
                booking.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
