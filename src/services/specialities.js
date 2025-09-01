import {
  Heart,
  Brain,
  Stethoscope,
  Activity,
  Pill,
  Baby,
  Syringe,
  Ambulance,
  Bone,
} from "lucide-react";

export const SPECIALTIES = [
  { name: "Cardiology", slug: "cardiology", icon: Heart },
  { name: "Neurosciences", slug: "neurosciences", icon: Brain },
  { name: "Medicine", slug: "medicine", icon: Stethoscope },
  { name: "Pulmonology", slug: "pulmonology", icon: Activity }, // ❌ no Lung, so use Activity
  { name: "Critical Care", slug: "critical-care", icon: Activity },
  { name: "Internal Medicine", slug: "internal-medicine", icon: Pill },
  { name: "IVF and Infertility", slug: "ivf-infertility", icon: Baby },
  { name: "Anaesthesiology", slug: "anaesthesiology", icon: Syringe },
  {
    name: "Accident and Emergency Care",
    slug: "emergency-care",
    icon: Ambulance,
  },
  { name: "Bone and Joint", slug: "bone-and-joint", icon: Bone }, // ✅ "Bone" exists
];
