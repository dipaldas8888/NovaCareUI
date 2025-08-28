import { Badge } from "@/components/ui/badge";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import banner from "../assets/banner2.png"; // or put it in /public and use src="/banner2.png"
import Features from "../components/Features";
import { testimonials } from "../services/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function Homes() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge
                variant="outline"
                className="bg-emerald-700/30 border-emerald-700/30 text-emerald-500 font-medium"
              >
                Healthcare made simple
              </Badge>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Connect with Doctors
                <span className="block py-2 mx-1 text-emerald-500">
                  anytime, anywhere 24/7
                </span>
              </h1>

              <div className="mt-6 flex gap-4 items-center mx-1">
                <Link to="/login">
                  <Button className="bg-emerald-500 hover:bg-emerald-800 md:h-10">
                    Get Started
                  </Button>
                </Link>
                <Link to="/get-started">
                  <Button variant="outline" className="md:h-10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src={banner}
                alt="Online doctor consultation"
                className="w-full h-auto  object-cover aspect-[4/3] sm:aspect-[3/2] lg:aspect-[5/4] overflow-hidden"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>
      <Features />
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4"
            >
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from patients and doctors who use our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-emerald-900/20 hover:border-emerald-800/40 transition-all"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center mr-4">
                      <span className="text-emerald-400 font-bold">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homes;
