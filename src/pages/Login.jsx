import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();

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
        toast("Welcome back!", { description: "Logged in successfully." });

        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });
      } else {
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

        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });
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
          className="hidden flex-1 items-center justify-center p-8 md:flex"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src={doctor} alt="Doctor" className="mx-auto w-full max-w-sm" />
        </motion.div>

        <motion.div
          className="flex flex-1 items-center justify-center p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="border-border/70 bg-card/20 w-full max-w-md shadow-lg backdrop-blur-lg">
            <CardContent className="space-y-6 p-8">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold">Login</h1>
                  <p className="text-muted-foreground text-sm">
                    Sign in to continue to your dashboard.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onChange}
                    autoComplete="current-password"
                  />
                </div>

                <Button
                  type="submit"
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
              </form>

              <Button
                onClick={onGoogle}
                className="w-full"
                variant="outline"
                disabled={loadingGoogle}
              >
                {loadingGoogle ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting…
                  </>
                ) : (
                  "Sign in with Google"
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
