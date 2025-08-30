import { useState } from "react";
import { api } from "@/services/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const DEFAULT_SECRET = import.meta.env.VITE_DOCTOR_SECRET || "doctorsecret123";

export default function DoctorRegister() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    secret: DEFAULT_SECRET,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.secret) {
      toast("Missing info", { description: "Please fill all fields." });
      return;
    }
    try {
      setLoading(true);
      await api.post(
        `/api/auth/register-doctor?secret=${encodeURIComponent(form.secret)}`,
        {
          username: form.username,
          email: form.email,
          password: form.password,
        }
      );
      toast("Registered!", {
        description: "Doctor account created successfully.",
      });
      navigate("/login");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Registration failed";
      toast.error("Error", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Doctor Sign up</CardTitle>
          <CardDescription>
            Register as a doctor using your secret
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={form.username}
                onChange={onChange}
                placeholder="doctor2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="doctor2@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secret">Doctor Secret</Label>
              <Input
                id="secret"
                name="secret"
                value={form.secret}
                onChange={onChange}
                placeholder="doctorsecret123"
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating…
                </>
              ) : (
                "Create doctor account"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between text-sm">
          <span>Are you a patient?</span>
          <Link className="underline" to="/register">
            Register as Patient
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
