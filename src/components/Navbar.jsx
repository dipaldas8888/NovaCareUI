import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";
import logo from "@/assets/logo.svg";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();

  const drawerLinks = [
    { label: "About Us", to: "/about" },
    { label: "Our Doctors", to: "/specialties" },
    { label: "Blogs", to: "/blogs" },
  ];

  return (
    <nav className="bg-neutral-900 text-white shadow-md border-b border-neutral-800 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="hover:opacity-90 transition">
          <img src={logo} alt="Novacare Logo" className="h-10 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-emerald-400 transition">
            Home
          </Link>
          <Link to="/specialties" className="hover:text-emerald-400 transition">
            Our Specialties
          </Link>
          <Link to="/blogs" className="hover:text-emerald-400 transition">
            Blogs
          </Link>
          <Link to="/about" className="hover:text-emerald-400 transition">
            About Us
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Button
                asChild
                variant="outline"
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 transition rounded-lg"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-lg font-semibold shadow-md"
                asChild
              >
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          ) : (
            <Button
              onClick={logout}
              variant="destructive"
              className="rounded-lg"
            >
              Logout
            </Button>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="p-2 rounded-md hover:bg-neutral-800 transition"
            >
              <Menu className="h-6 w-6 text-emerald-400" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-neutral-950 text-white p-6 w-80 sm:w-96 border-l border-neutral-800"
          >
            <SheetHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-emerald-400">Menu</h2>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-2 hover:bg-neutral-800 rounded-md transition"
                ></button>
              </div>
            </SheetHeader>

            <ul className="mt-8 space-y-5 font-medium text-lg">
              <li>
                <Link
                  to="/"
                  className="block hover:text-emerald-400 transition"
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </li>

              {drawerLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="block hover:text-emerald-400 transition"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4">
              {!isAuthenticated ? (
                <>
                  <Button
                    asChild
                    className="border border-emerald-500 text-emerald-400 bg-transparent hover:bg-emerald-500/10 rounded-lg"
                  >
                    <Link to="/login" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 rounded-lg font-semibold shadow-md"
                    asChild
                  >
                    <Link to="/register" onClick={() => setOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  variant="destructive"
                  className="rounded-lg"
                >
                  Logout
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
