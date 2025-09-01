import { Link } from "react-router-dom";
import { blogs } from "@/services/blogs";
import { CalendarDays } from "lucide-react";

export default function BlogList() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-white">Blog</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 rounded-xl border border-zinc-800/50 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
                <CalendarDays className="w-4 h-4 text-emerald-400" />
                {blog.date}
              </p>

              <h2 className="text-xl font-semibold text-white mb-2">
                {blog.title}
              </h2>

              <p className="text-sm text-zinc-400 line-clamp-3">
                {blog.excerpt}
              </p>

              <div className="mt-4">
                <Link
                  to={`/blog/${blog.id}`}
                  className="inline-block w-full text-center bg-gradient-to-r from-[#2CEE91] to-[#00a86b] text-black font-semibold py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#2CEE91]/30 transition-all duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
