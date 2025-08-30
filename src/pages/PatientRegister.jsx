import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function RegisterDarkMotion() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      toast("Missing info", { description: "Please fill all fields." });
      return;
    }
    try {
      setLoading(true);
      await api.post("/api/auth/register", form);
      toast("Registered!", {
        description: "Patient account created successfully.",
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
    <div className="bg-neutral-950 text-neutral-100 flex h-[700px] w-full overflow-hidden">
      <motion.div
        className="hidden w-full md:inline-block"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="left side"
        />
      </motion.div>

      <motion.div
        className="flex w-full flex-col items-center justify-center"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.form
          onSubmit={onSubmit}
          className="w-80 md:w-96 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <motion.h2
            className="text-4xl font-medium text-neutral-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            Create account
          </motion.h2>
          <motion.p
            className="mt-3 text-sm text-neutral-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
          >
            Sign up to book appointments and consult doctors online
          </motion.p>

          <motion.button
            type="button"
            className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-neutral-800/70 transition-colors hover:bg-neutral-800"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="Google"
            />
          </motion.button>

          <motion.div
            className="my-5 flex w-full items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="w-full border-t border-neutral-800" />
            <p className="w-full text-nowrap text-sm text-neutral-400">
              or sign up with email
            </p>
            <div className="w-full border-t border-neutral-800" />
          </motion.div>

          <motion.div
            className="flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-neutral-800 bg-transparent pl-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Zm0 2c-3.866 0-7 2.239-7 5v1h14v-1c0-2.761-3.134-5-7-5Z"
                fill="#9CA3AF"
              />
            </svg>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="h-full w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-500 outline-none"
              value={form.username}
              onChange={onChange}
              required
            />
          </motion.div>

          <motion.div
            className="mt-4 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-neutral-800 bg-transparent pl-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
          >
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#9CA3AF"
              />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="h-full w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-500 outline-none"
              value={form.email}
              onChange={onChange}
              required
            />
          </motion.div>

          <motion.div
            className="mt-6 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-neutral-800 bg-transparent pl-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.35 }}
          >
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#9CA3AF"
              />
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="h-full w-full bg-transparent text-sm text-neutral-200 placeholder-neutral-500 outline-none"
              value={form.password}
              onChange={onChange}
              required
            />
          </motion.div>

          <motion.div
            className="mt-8 flex w-full items-center justify-between text-neutral-400"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <input
                className="h-5 w-5 accent-indigo-500"
                type="checkbox"
                id="checkbox"
              />
              <label className="text-sm" htmlFor="checkbox">
                Remember me
              </label>
            </div>
            <a className="text-sm underline hover:text-neutral-200" href="#">
              Forgot password?
            </a>
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="mt-8 flex h-11 w-full items-center justify-center rounded-full bg-indigo-500 text-white transition-opacity hover:opacity-90"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating…
              </>
            ) : (
              "Create account"
            )}
          </motion.button>

          <motion.p
            className="mt-4 text-sm text-neutral-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.45 }}
          >
            Already have an account?{" "}
            <Link className="text-indigo-400 hover:underline" to="/login">
              Sign in
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
}
