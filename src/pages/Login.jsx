import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import doctor from "../assets/doctor.png";

export default function Login() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast("Missing info", {
        description: "Please enter email and password.",
      });
      return;
    }
    try {
      setLoadingEmail(true);
      const res = await login({ email: form.email, password: form.password });
      if (res.success) {
        console.log("Login successful", res);
        toast("Welcome back!", { description: "Logged in successfully." });
        navigate("/");
      } else {
        console.log("Login failed");
        toast.error("Login failed", { description: res.error });
      }
    } finally {
      setLoadingEmail(false);
    }
  };

  const onGoogle = async () => {
    try {
      setLoadingGoogle(true);
      const res = await googleLogin();
      if (res.success) {
        toast("Welcome!", { description: "Signed in with Google." });
        navigate("/");
      } else {
        toast.error("Google sign-in failed", { description: res.error });
      }
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="rose-gradient bg-background relative min-h-screen overflow-hidden">
      <div className="relative z-10 grid min-h-screen grid-cols-1 md:grid-cols-2">
        <motion.div
          className="hidden flex-1 items-center justify-center space-y-8 p-8 text-center md:flex"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src={doctor}
              alt="Illustration"
              className="mx-auto h-auto w-full md:w-90"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-1 items-center justify-center p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="border-border/70 bg-card/20 w-full max-w-md shadow-[0_10px_26px_#e0e0e0a1] backdrop-blur-lg dark:shadow-none">
              <CardContent className="space-y-6 p-8">
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Header */}
                  <motion.div
                    className="space-y-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-2xl font-bold tracking-tight md:text-4xl">
                        Login
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Sign in to continue to your dashboard.
                    </p>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                  >
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      autoComplete="email"
                    />
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                  >
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      className="border-border border"
                      value={form.password}
                      onChange={onChange}
                      autoComplete="current-password"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit" // 🔑 important
                      className="w-full"
                      disabled={loadingEmail}
                    >
                      {loadingEmail ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in…
                        </>
                      ) : (
                        "Continue"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
