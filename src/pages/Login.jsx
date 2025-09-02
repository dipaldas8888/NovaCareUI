import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

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
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      setLoadingEmail(true);
      const res = await login({ email: form.email, password: form.password });

      if (res.success) {
        toast.success("Welcome back!", {
          description: "Logged in successfully.",
        });

        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });
      } else {
        toast.error("Login failed", {
          description: res.error || "Invalid credentials.",
        });
      }
    } catch (err) {
      console.error("[LOGIN ERROR]", err);

      const msg =
        err?.response?.data?.message ||
        err?.code ||
        err?.message ||
        "Login failed.";
      toast.error("Login failed", { description: msg });
    } finally {
      setLoadingEmail(false);
    }
  };

  const onGoogle = async () => {
    try {
      setLoadingGoogle(true);
      // Simulate Google login
      setTimeout(() => {
        alert("Google sign-in successful!");
        setLoadingGoogle(false);
      }, 1500);
    } catch (error) {
      alert("Google sign-in failed");
      setLoadingGoogle(false);
    }
  };

  const onSignupClick = () => {
    alert("Redirecting to signup page...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/5 to-transparent rounded-full"></div>
      </div>

      <div className="relative z-10 grid min-h-screen grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex flex-1 items-center justify-center p-8 relative">
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl"></div>
            <div className="relative mx-auto w-full max-w-sm h-80 bg-gradient-to-b from-emerald-400/20 to-teal-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <div className="w-32 h-32 bg-emerald-500/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-emerald-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-emerald-200 text-xl font-semibold">
                  Healthcare Portal
                </h3>
                <p className="text-emerald-300/70 text-sm mt-2">
                  Secure access to NovaCare
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center p-8">
          <Card className="w-full max-w-md backdrop-blur-xl bg-slate-900/40 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
            <CardContent className="p-8">
              <form onSubmit={onSubmit} className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-3">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                    Welcome Back
                  </h1>
                  <p className="text-slate-400 text-sm">
                    Sign in to continue to your dashboard
                  </p>
                </div>

                {/* Login Form */}
                <div className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-slate-200 font-medium"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        autoComplete="email"
                        className="pl-10 bg-slate-800/50 border-emerald-500/30 focus:border-emerald-400 text-white placeholder:text-slate-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="password"
                      className="text-slate-200 font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onChange}
                        autoComplete="current-password"
                        className="pl-10 bg-slate-800/50 border-emerald-500/30 focus:border-emerald-400 text-white placeholder:text-slate-500"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-emerald-500/25"
                    disabled={loadingEmail}
                  >
                    {loadingEmail ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in…
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-900/40 text-slate-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-slate-400 text-sm">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200 hover:underline cursor-pointer"
                    >
                      Create one now
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
