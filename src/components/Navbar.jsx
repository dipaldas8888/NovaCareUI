import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();

  const drawerLinks = [
    { label: "About Us", to: "/about" },
    { label: "Our Doctors", to: "/specialties" },
    { label: "Careers", to: "/careers" },
    { label: "Blogs", to: "/blogs" },
  ];

  return (
    <nav className="bg-neutral-900 text-emerald-500 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Novacare
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <Link to="/" className="hover:text-pink-400">
            Home
          </Link>
          <Link to="/specialties" className="hover:text-pink-400">
            Our Specialties
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <Button
                asChild
                variant="outline"
                className="border-neutral-600 text-white"
              >
                <Link to="/login">Login</Link>
              </Button>
            ) : (
              <Button onClick={logout} variant="destructive">
                Logout
              </Button>
            )}
            <Button className="bg-pink-600 hover:bg-pink-700" asChild>
              <Link to="/appointment">Book Online Appointment</Link>
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu">
                <Menu className="h-7 w-7" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-neutral-900 text-white p-6 w-80 sm:w-96"
            >
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>

              <div className="mt-4 mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold">Menu</h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                ></button>
              </div>

              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="block hover:text-pink-400"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specialties"
                    className="block hover:text-pink-400"
                    onClick={() => setOpen(false)}
                  >
                    Our Specialties
                  </Link>
                </li>
                {drawerLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="block hover:text-pink-400"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                {!isAuthenticated ? (
                  <Button
                    asChild
                    className="border-emerald-400 text-emerald-600"
                  >
                    <Link to="/login" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    variant="destructive"
                  >
                    Logout
                  </Button>
                )}

                <Button className="bg-pink-600 hover:bg-pink-700" asChild>
                  <Link to="/appointment" onClick={() => setOpen(false)}>
                    Book Online Appointment
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
