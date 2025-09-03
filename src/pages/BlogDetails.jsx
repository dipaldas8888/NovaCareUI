import { useParams, Link } from "react-router-dom";
import { blogs } from "@/services/blogs";

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="bg-neutral-900 min-h-screen flex items-center justify-center">
        <p className="text-center text-red-500 text-lg font-semibold">
          Blog not found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 min-h-screen">
      <div className="mx-auto bg-neutral-900 px-4 py-10 max-w-3xl rounded-lg shadow-lg">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link to="/" className="text-emerald-500 hover:underline">
            Home
          </Link>{" "}
          <span className="mx-2">›</span>
          <Link to="/blogs" className="text-emerald-500 hover:underline">
            Blog
          </Link>{" "}
          <span className="mx-2">›</span>
          <span className="text-gray-300">{blog.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-white">{blog.title}</h1>
        <p className="text-gray-400 mb-6">{blog.date}</p>

        {/* Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-lg mb-6"
        />

        {/* Blog Content */}
        <div
          className="prose prose-lg prose-invert max-w-none text-gray-200 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
