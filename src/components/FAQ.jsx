import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.15, ease: "easeOut" }}
      className={cn(
        "group border-border/10 rounded-lg border",
        "transition-all duration-200 ease-in-out",
        isOpen ? "bg-card/30 shadow-sm" : "hover:bg-card/50"
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4"
      >
        <h3
          className={cn(
            "text-left text-base font-medium transition-colors duration-200",
            "text-foreground/80",
            isOpen && "text-foreground"
          )}
        >
          {question}
        </h3>

        {/* Rotate the chevron when open */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "shrink-0 rounded-full p-0.5",
            isOpen ? "text-primary" : "text-muted-foreground"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      {/* AnimatePresence lets us animate the collapse/expand */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            // Collapsible: animate height from 0 -> auto and fade
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.25, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.25 },
              },
            }}
          >
            <div className="border-border/40 border-t px-6 pt-2 pb-4">
              {/* Subtle inner slide for the text */}
              <motion.p
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-muted-foreground text-sm leading-relaxed"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      question: "How do I book a doctor’s appointment?",
      answer:
        "Simply sign up or log in, browse our list of doctors by specialty, and choose a time slot that works for you. You’ll get instant confirmation once your booking is complete.",
    },
    {
      question: "Can I consult with doctors online?",
      answer:
        "Yes! Our platform supports secure video consultations. Once you book, you’ll receive a video call link to connect with your doctor at the scheduled time.",
    },
    {
      question: "Are my medical records safe on this platform?",
      answer:
        "Absolutely. We use end-to-end encryption and follow healthcare data privacy standards to ensure your records and consultations remain confidential.",
    },
    {
      question: "What if I need to cancel or reschedule?",
      answer:
        "You can easily cancel or reschedule your appointment from your dashboard. Cancellation policies may vary depending on the doctor, but most allow changes up to 24 hours before your appointment.",
    },
    {
      question: "Do I need to pay before the consultation?",
      answer:
        "Yes, payment is collected at the time of booking to confirm your slot. We support multiple payment methods, and in case of cancellations, refunds are processed according to the doctor’s policy.",
    },
  ];

  return (
    <section className="bg-background relative w-full overflow-hidden pt-8 pb-16">
      {/* Decorative blurred dots */}
      <div className="bg-primary/5 absolute top-20 -left-20 h-64 w-64 rounded-full blur-3xl" />
      <div className="bg-primary/5 absolute -right-20 bottom-20 h-64 w-64 rounded-full blur-3xl" />

      <div className="relative container mx-auto max-w-6xl px-4">
        {/* Heading fade-up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <Badge
            variant="outline"
            className="border-emerald-600 mb-4 px-3 py-1 text-xs font-medium tracking-wider uppercase"
          >
            FAQs
          </Badge>
          <h2 className="from-primary mb-3 text-emerald-500 bg-gradient-to-r to-rose-400 bg-clip-text text-3xl font-bold t">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm">
            Everything you need to know about our services
          </p>
        </motion.div>

        {/* List with per-item stagger using index in FAQItem */}
        <div className="mx-auto max-w-2xl space-y-2">
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} index={i} />
          ))}
        </div>

        {/* CTA card fade-up */}
      </div>
    </section>
  );
}
