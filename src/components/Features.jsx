// src/components/HowItWorks.jsx
import { features } from "../services/data.jsx";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Features() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform makes healthcare accessible with just a few clicks
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
